/**
 * Sound Supply — Phase 2 Catalog & Architecture Verification Test Suite
 * 
 * Verifies relational seed data integrity, currency/paise math,
 * product filtering, search multi-field indexing, and cart security.
 */

import { paiseToRupees, rupeesToPaise, formatInr, calculateSavings } from "../src/lib/currency";
import { productService } from "../src/services/productService";
import { categoryService } from "../src/services/categoryService";
import { brandService } from "../src/services/brandService";
import { searchService } from "../src/services/searchService";
import { cartService } from "../src/services/cartService";
import { SEED_PRODUCTS } from "../src/data/seedData";
import { BRANDS } from "../src/data/brands";
import { CATEGORIES } from "../src/data/categories";

let failedTests = 0;
let passedTests = 0;

function assert(condition: boolean, testName: string, details?: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${testName}${details ? ` -> ${details}` : ""}`);
    failedTests++;
  }
}

async function runTestSuite() {
  console.log("=================================================================");
  console.log("SOUND SUPPLY — PHASE 2 DATA ARCHITECTURE VERIFICATION");
  console.log("=================================================================\n");

  // ---------------------------------------------------------------------------
  // 1. CURRENCY & INTEGER PAISE MATH TESTS
  // ---------------------------------------------------------------------------
  console.log("Test Suite 1: Currency & Integer Paise Math");
  
  assert(rupeesToPaise(38990) === 3899000, "rupeesToPaise converts ₹38,990 to 3,899,000 paise");
  assert(paiseToRupees(3899000) === 38990, "paiseToRupees converts 3,899,000 paise to ₹38,990");
  
  const formatted = formatInr(3899000, { isPaise: true });
  assert(formatted.includes("38,990"), `formatInr formats 3,899,000 paise correctly (got: ${formatted})`);

  const savings = calculateSavings(4499000, 3899000, true);
  assert(savings.amount === 600000, "calculateSavings produces exact paise savings");
  assert(savings.percentage === 13, `calculateSavings calculates discount percentage (got: ${savings.percentage}%)`);

  // ---------------------------------------------------------------------------
  // 2. SEED DATA MODEL INTEGRITY TESTS
  // ---------------------------------------------------------------------------
  console.log("\nTest Suite 2: Seed Catalog & Relational Integrity");

  assert(SEED_PRODUCTS.length >= 30, `Seed catalog has 30+ products (actual: ${SEED_PRODUCTS.length})`);
  assert(BRANDS.length >= 20, `Brand directory has 20+ verified manufacturers (actual: ${BRANDS.length})`);
  assert(CATEGORIES.length >= 4, `Category hierarchy has primary departments (actual: ${CATEGORIES.length})`);

  // Check every product for required relational fields and integer paise
  let allHaveVariants = true;
  let allHaveValidPaise = true;
  let allHaveSpecs = true;
  let allHaveCompatibility = true;

  for (const p of SEED_PRODUCTS) {
    if (!p.variants || p.variants.length === 0) allHaveVariants = false;
    for (const v of p.variants) {
      if (typeof v.priceInrPaise !== "number" || v.priceInrPaise <= 0) {
        allHaveValidPaise = false;
      } else if (v.priceInrPaise > (v.mrpInrPaise || 0)) {
        allHaveValidPaise = false;
      }
    }
    if (!p.specifications || p.specifications.length === 0) allHaveSpecs = false;
    if (!p.compatibility) allHaveCompatibility = false;
  }

  assert(allHaveVariants, "Every product contains at least 1 validated variant");
  assert(allHaveValidPaise, "All product variants have positive integer paise with price <= mrp");
  assert(allHaveSpecs, "All products have dynamic category-specific specifications");
  assert(allHaveCompatibility, "All products have signal-chain compatibility profiles");

  // ---------------------------------------------------------------------------
  // 3. PRODUCT SERVICE QUERIES & FACET FILTERING
  // ---------------------------------------------------------------------------
  console.log("\nTest Suite 3: Product Service Layer Queries");

  const allProductsRes = await productService.getProducts({ limit: 100 });
  assert(allProductsRes.total === SEED_PRODUCTS.length, "productService.getProducts returns all catalog products");

  const interfacesRes = await productService.getProducts({ categorySlug: "studio-recording", subCategorySlug: "audio-interfaces" });
  assert(interfacesRes.total >= 4, `Filter by subcategory 'audio-interfaces' returns models (actual: ${interfacesRes.total})`);

  const shureProducts = await productService.getProducts({ brandSlugs: ["shure"] });
  assert(shureProducts.total >= 2, `Filter by brand 'shure' returns models (actual: ${shureProducts.total})`);

  const priceAscRes = await productService.getProducts({ sortBy: "price-asc", limit: 10 });
  const p1 = priceAscRes.products[0].variants[0].sellingPriceInr;
  const p2 = priceAscRes.products[1].variants[0].sellingPriceInr;
  assert(p1 <= p2, `Sort 'price-asc' arranges cheapest product first (₹${p1} <= ₹${p2})`);

  const singleProduct = await productService.getProductBySlug("focusrite-scarlett-2i2-gen4");
  assert(singleProduct !== null && singleProduct.id === "prod-scarlett-2i2-gen4", "productService.getProductBySlug retrieves Scarlett 2i2");

  const related = await productService.getRelatedProducts("prod-scarlett-2i2-gen4", 3);
  assert(related.length === 3, "productService.getRelatedProducts returns 3 related models");

  // ---------------------------------------------------------------------------
  // 4. SEARCH SERVICE MULTI-FIELD MATCHING
  // ---------------------------------------------------------------------------
  console.log("\nTest Suite 4: Search Service Multi-Field Matching");

  const searchInterface = await searchService.search("scarlett");
  assert(searchInterface.products.length > 0, "Search 'scarlett' matches Scarlett interfaces");

  const searchXlr = await searchService.search("xlr");
  assert(searchXlr.products.length > 0, "Search technical spec 'xlr' matches products with XLR specifications");

  const searchShure = await searchService.search("shure");
  assert(searchShure.brands.length > 0 && searchShure.brands[0].slug === "shure", "Search 'shure' matches brand entity");

  const suggestions = await searchService.getSuggestions("yam");
  assert(suggestions.some((s) => s.toLowerCase().includes("yamaha")), "Suggestions for 'yam' includes Yamaha");

  // ---------------------------------------------------------------------------
  // 5. CART SERVICE & PRICE TAMPERING PREVENTION
  // ---------------------------------------------------------------------------
  console.log("\nTest Suite 5: Secure Cart Service & Integrity");

  const testSession = "test_session_" + Date.now();
  
  // Add Focusrite Scarlett 2i2 (selling price ₹17,490 = 1,749,000 paise)
  const cartAfterAdd1 = await cartService.addToCart(testSession, "prod-scarlett-2i2-gen4", "var-2i2-standalone", 1);
  assert(cartAfterAdd1.itemCount === 1, "Cart item count is 1 after addition");
  assert(cartAfterAdd1.subtotalPaise === 1749000, `Cart subtotal strictly matches catalog paise: 1,749,000 (actual: ${cartAfterAdd1.subtotalPaise})`);
  assert(cartAfterAdd1.estimatedShippingPaise === 0, "Insured shipping is free for orders over ₹2,000");

  // Add Shure SM7B (selling price ₹38,990 = 3,899,000 paise)
  const cartAfterAdd2 = await cartService.addToCart(testSession, "prod-shure-sm7b", "var-sm7b-standalone", 2);
  assert(cartAfterAdd2.itemCount === 3, "Cart item count is 3 after adding 2 SM7Bs");
  const expectedTotalPaise = 1749000 + 3899000 * 2;
  assert(cartAfterAdd2.subtotalPaise === expectedTotalPaise, `Cart subtotal correctly calculates (expected: ${expectedTotalPaise}, actual: ${cartAfterAdd2.subtotalPaise})`);

  // Update quantity
  const cartAfterUpdate = await cartService.updateQuantity(testSession, "var-sm7b-standalone", 1);
  assert(cartAfterUpdate.itemCount === 2, "Cart item count updated to 2 after decrementing SM7B");

  // Remove item
  const cartAfterRemove = await cartService.removeFromCart(testSession, "var-2i2-standalone");
  assert(cartAfterRemove.itemCount === 1, "Cart item count is 1 after removing Scarlett 2i2");
  assert(cartAfterRemove.items[0].sku === "SHU-SM7B-STD", "Remaining item in cart is SM7B");

  // Clear cart
  const cartAfterClear = await cartService.clearCart(testSession);
  assert(cartAfterClear.itemCount === 0 && cartAfterClear.items.length === 0, "Cart is empty after clear");

  // ---------------------------------------------------------------------------
  // SUMMARY
  // ---------------------------------------------------------------------------
  console.log("\n=================================================================");
  console.log(`TEST RUN COMPLETE: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log("=================================================================\n");

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error("Test execution threw unhandled exception:", err);
  process.exit(1);
});
