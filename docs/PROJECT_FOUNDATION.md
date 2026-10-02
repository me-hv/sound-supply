# Sound Supply — Architectural & Foundation Blueprint

**Sound Supply** is a premium online music equipment and audio production commerce platform engineered specifically for the Indian market, delivering the information density, technical depth, and discovery experience of professional music gear retail.

---

## 1. Brand Direction

* **Core Purpose:** "Everything you need to make sound."
* **Market Position:** A dedicated, serious destination for Indian bedroom producers, gigging guitarists, studio recording engineers, composers, podcasters, and sound designers.
* **Tone & Persona:** 
  * *Professional & Technical:* Spec-first, honest equipment ratings, comprehensive connectivity guides, and detailed studio setup advisory.
  * *Trustworthy & Confident:* Clear Indian warranty terms, genuine manufacturer guarantee, transparent EMI calculations, and verified courier delivery.
  * *Approachable & Musical:* Warm, clean, modern, avoiding sterile corporate aesthetics or dark gaming motifs.
* **Visual Signature:**
  * Light-first interface with warm neutral tones (`#F7F7F5`), crisp white cards (`#FFFFFF`), subtle slate borders (`#DDDDDD`), and a signature warm flame/crimson accent (`#D9381E` / `#C22F17`) used strategically for active states, key CTAs, and promotional badges.

---

## 2. Information Architecture (IA)

Sound Supply's IA organizes complex audio equipment into intuitive hierarchies, balancing broad browsing with surgical technical filtering.

### Navigational Pillars
1. **Utility Navigation:** Free Express Shipping thresholds, Easy 0% EMI tiers (e.g., Bajaj, HDFC, ICICI), 100% Genuine Authorized Warranty, and Dedicated Gear Specialist Advisory.
2. **Global Header:** Brand identity, Quick Category Trigger, Intelligent Algorithmic Search Bar with keyboard shortcut, Compare Tray quick-view, Wishlist, and Cart preview.
3. **Primary Category Bar & Mega-Menu:** 11 top-level categories providing 3-level deep cascading category discovery with featured spotlight brands and best-sellers per category.
4. **Contextual Sub-Nav & Breadcrumbs:** Deep multi-segment breadcrumbs with facet counters across all Product Listing Pages (PLP).

---

## 3. Global Sitemap

```
/
├── /categories
│   ├── /categories/[categorySlug]                (e.g., /categories/studio-recording)
│   └── /categories/[categorySlug]/[subSlug]      (e.g., /categories/studio-recording/audio-interfaces)
├── /products
│   └── /products/[productSlug]                   (e.g., /products/focusrite-scarlett-2i2-gen4)
├── /brands
│   ├── /brands                                   (A-Z brand catalog & authorized dealer index)
│   └── /brands/[brandSlug]                       (e.g., /brands/shure)
├── /search                                       (Dynamic search results with deep filters)
├── /studio-builder                               (Guided workflow for custom studio setups)
├── /compare                                      (Side-by-side technical specification matrix)
├── /deals                                        (Exclusive discounts, bundle offers, clearance)
├── /guides                                       (Buying guides, impedance matching, mic placement)
├── /cart                                         (Cart management & free shipping threshold tracker)
├── /wishlist                                     (Bookmarked gear shortlist)
└── /account                                      (Customer portal & warranty registration)
```

---

## 4. Product Data Model

To prevent simplistic single-SKU limitations, Sound Supply separates **Products** (parent entity with brand, category, shared description, and specifications) from **Product Variants** (SKUs with individual barcodes, finishes, key counts, voltages, localized Indian MRP, stock inventory, and media).

```typescript
export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoText: string;
  originCountry: string;
  isAuthorizedDealer: boolean;
  warrantyPeriodMonths: number;
}

export interface TechnicalSpecification {
  group: "Audio Performance" | "Connectivity & I/O" | "Hardware & Build" | "Compatibility & Power";
  label: string;
  value: string;
  highlight?: boolean;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  title: string;
  attributes: {
    color?: string;
    finish?: string;
    keyCount?: number;
    sizeInch?: number;
    cableLengthMeters?: number;
    handOrientation?: "Right-Handed" | "Left-Handed";
    connectivity?: "USB-C" | "Thunderbolt 4" | "Bluetooth + Wired";
    impedanceOhms?: number;
  };
  mrpInr: number;
  sellingPriceInr: number;
  stockStatus: "in-stock" | "low-stock" | "pre-order" | "out-of-stock";
  stockCount: number;
  images: string[];
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  brand: Brand;
  categorySlug: string;
  subCategorySlug: string;
  shortDescription: string;
  fullDescription: string;
  keyFeatures: string[];
  whatsInTheBox: string[];
  specifications: TechnicalSpecification[];
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  defaultVariantId: string;
  tags: ("bestseller" | "new" | "deal" | "pro-choice" | "studio-essential")[];
  warrantySummary: string;
  fastestDeliveryDays: number;
  emiStartingInr: number;
}
```

---

## 5. Future Supabase Schema Architecture

Planned PostgreSQL tables for seamless backend integration:

1. `brands` (`id`, `name`, `slug`, `logo_url`, `authorized_partner`, `warranty_policy`)
2. `categories` (`id`, `name`, `slug`, `parent_id`, `sort_order`, `metadata`)
3. `products` (`id`, `brand_id`, `category_id`, `title`, `slug`, `description`, `features`, `whats_in_box`, `specs_jsonb`, `is_published`)
4. `product_variants` (`id`, `product_id`, `sku`, `variant_name`, `attributes_jsonb`, `mrp_paisa`, `price_paisa`, `inventory_count`, `is_active`)
5. `product_images` (`id`, `variant_id`, `url`, `alt_text`, `display_order`, `is_primary`)
6. `studio_presets` (`id`, `name`, `genre`, `budget_tier`, `items_jsonb`, `description`)
7. `reviews` (`id`, `product_id`, `user_id`, `rating`, `title`, `comment`, `verified_purchase`)
8. `pincode_serviceability` (`pincode`, `city`, `state`, `standard_days`, `express_available`, `cod_supported`)

---

## 6. How to Run Locally

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Production build test
npm run build
npm run start
```
