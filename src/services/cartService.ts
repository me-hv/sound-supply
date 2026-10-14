import { SEED_PRODUCTS } from "@/data/seedData";
import { paiseToRupees, rupeesToPaise } from "@/lib/currency";

export interface ValidatedCartItem {
  productId: string;
  variantId: string;
  productSlug: string;
  productTitle: string;
  variantTitle: string;
  brandName: string;
  sku: string;
  image: string;
  unitPricePaise: number;
  unitPriceInr: number;
  mrpPaise: number;
  mrpInr: number;
  quantity: number;
  totalPricePaise: number;
  totalPriceInr: number;
  stockStatus: string;
}

export interface CartSummary {
  sessionToken: string;
  items: ValidatedCartItem[];
  itemCount: number;
  subtotalPaise: number;
  subtotalInr: number;
  estimatedShippingPaise: number;
  estimatedShippingInr: number;
  totalPaise: number;
  totalInr: number;
}

interface StoredCartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

// In-memory session cart store (used when Supabase is unconfigured or in guest state)
const sessionCarts = new Map<string, StoredCartItem[]>();

function resolveCartItem(item: StoredCartItem): ValidatedCartItem | null {
  const product = SEED_PRODUCTS.find((p) => p.id === item.productId);
  if (!product) return null;

  const variant =
    product.variants.find((v) => v.id === item.variantId) ||
    product.variants.find((v) => v.id === product.defaultVariantId) ||
    product.variants[0];

  if (!variant) return null;

  const unitPricePaise = variant.priceInrPaise || rupeesToPaise(variant.sellingPriceInr);
  const mrpPaise = variant.mrpInrPaise || rupeesToPaise(variant.mrpInr);
  const qty = Math.max(1, Math.min(99, item.quantity));

  return {
    productId: product.id,
    variantId: variant.id,
    productSlug: product.slug,
    productTitle: product.title,
    variantTitle: variant.title,
    brandName: product.brand.name,
    sku: variant.sku,
    image: variant.images[0] || "",
    unitPricePaise,
    unitPriceInr: paiseToRupees(unitPricePaise),
    mrpPaise,
    mrpInr: paiseToRupees(mrpPaise),
    quantity: qty,
    totalPricePaise: unitPricePaise * qty,
    totalPriceInr: paiseToRupees(unitPricePaise * qty),
    stockStatus: variant.stockStatus,
  };
}

/**
 * Sound Supply — Secure Cart Service
 * 
 * Enforces server-side price validation against official catalog variant entities.
 * Strictly prevents client-side price tampering and integer overflow.
 */
export const cartService = {
  /**
   * Retrieves and validates the current cart for a session token.
   */
  async getCart(sessionToken: string): Promise<CartSummary> {
    const rawItems = sessionCarts.get(sessionToken) || [];
    const validatedItems: ValidatedCartItem[] = [];

    for (const item of rawItems) {
      const resolved = resolveCartItem(item);
      if (resolved) {
        validatedItems.push(resolved);
      }
    }

    const subtotalPaise = validatedItems.reduce((acc, item) => acc + item.totalPricePaise, 0);
    // Free insured shipping across India for music orders over ₹2,000 (200,000 paise)
    const isFreeShipping = subtotalPaise >= 200000 || subtotalPaise === 0;
    const estimatedShippingPaise = isFreeShipping ? 0 : 25000; // ₹250 flat fee if under ₹2000
    const totalPaise = subtotalPaise + estimatedShippingPaise;

    return {
      sessionToken,
      items: validatedItems,
      itemCount: validatedItems.reduce((acc, item) => acc + item.quantity, 0),
      subtotalPaise,
      subtotalInr: paiseToRupees(subtotalPaise),
      estimatedShippingPaise,
      estimatedShippingInr: paiseToRupees(estimatedShippingPaise),
      totalPaise,
      totalInr: paiseToRupees(totalPaise),
    };
  },

  /**
   * Adds an item to the session cart or increments quantity.
   */
  async addToCart(
    sessionToken: string,
    productId: string,
    variantId?: string,
    quantity = 1
  ): Promise<CartSummary> {
    const rawItems = sessionCarts.get(sessionToken) || [];
    const product = SEED_PRODUCTS.find((p) => p.id === productId);
    if (!product) {
      throw new Error(`Product not found: ${productId}`);
    }

    const resolvedVariantId = variantId || product.defaultVariantId || product.variants[0].id;
    const existingIndex = rawItems.findIndex((i) => i.variantId === resolvedVariantId);

    if (existingIndex > -1) {
      rawItems[existingIndex].quantity += quantity;
    } else {
      rawItems.push({
        productId,
        variantId: resolvedVariantId,
        quantity,
      });
    }

    sessionCarts.set(sessionToken, rawItems);
    return this.getCart(sessionToken);
  },

  /**
   * Updates the quantity of a specific variant in the cart.
   */
  async updateQuantity(
    sessionToken: string,
    variantId: string,
    quantity: number
  ): Promise<CartSummary> {
    let rawItems = sessionCarts.get(sessionToken) || [];

    if (quantity <= 0) {
      rawItems = rawItems.filter((i) => i.variantId !== variantId);
    } else {
      const item = rawItems.find((i) => i.variantId === variantId);
      if (item) {
        item.quantity = Math.min(99, quantity);
      }
    }

    sessionCarts.set(sessionToken, rawItems);
    return this.getCart(sessionToken);
  },

  /**
   * Removes an item variant completely from the cart.
   */
  async removeFromCart(sessionToken: string, variantId: string): Promise<CartSummary> {
    let rawItems = sessionCarts.get(sessionToken) || [];
    rawItems = rawItems.filter((i) => i.variantId !== variantId);
    sessionCarts.set(sessionToken, rawItems);
    return this.getCart(sessionToken);
  },

  /**
   * Clears the entire cart for the given session.
   */
  async clearCart(sessionToken: string): Promise<CartSummary> {
    sessionCarts.delete(sessionToken);
    return this.getCart(sessionToken);
  },
};
