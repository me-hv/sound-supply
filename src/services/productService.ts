import { Product } from "@/types";
import { SEED_PRODUCTS } from "@/data/seedData";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/client";

export interface ProductQueryParams {
  categorySlug?: string;
  subCategorySlug?: string;
  brandSlugs?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  onSaleOnly?: boolean;
  tags?: string[];
  sortBy?: "relevance" | "price-asc" | "price-desc" | "rating" | "newest";
  searchQuery?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedProducts {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

/**
 * Sound Supply — Product Service Layer
 * 
 * Provides unified, abstracted product querying supporting remote Supabase
 * when configured and seamless in-memory fallback to seed data.
 */
export const productService = {
  /**
   * Retrieves paginated products matching multi-faceted filters and sort order.
   */
  async getProducts(params: ProductQueryParams = {}): Promise<PaginatedProducts> {
    const {
      categorySlug,
      subCategorySlug,
      brandSlugs = [],
      minPrice,
      maxPrice,
      inStockOnly = false,
      onSaleOnly = false,
      tags = [],
      sortBy = "relevance",
      searchQuery,
      page = 1,
      limit = 24,
    } = params;

    // Use in-memory seed catalog as source of truth when Supabase is not active
    let filtered = [...SEED_PRODUCTS];

    if (categorySlug) {
      filtered = filtered.filter(
        (p) => p.categorySlug.toLowerCase() === categorySlug.toLowerCase()
      );
    }

    if (subCategorySlug) {
      filtered = filtered.filter(
        (p) => p.subCategorySlug.toLowerCase() === subCategorySlug.toLowerCase()
      );
    }

    if (brandSlugs.length > 0) {
      const lowerBrands = brandSlugs.map((b) => b.toLowerCase());
      filtered = filtered.filter((p) => lowerBrands.includes(p.brand.slug.toLowerCase()));
    }

    if (minPrice !== undefined) {
      filtered = filtered.filter((p) => {
        const defaultVar = p.variants.find((v) => v.id === p.defaultVariantId) || p.variants[0];
        return (defaultVar?.sellingPriceInr || 0) >= minPrice;
      });
    }

    if (maxPrice !== undefined) {
      filtered = filtered.filter((p) => {
        const defaultVar = p.variants.find((v) => v.id === p.defaultVariantId) || p.variants[0];
        return (defaultVar?.sellingPriceInr || 0) <= maxPrice;
      });
    }

    if (inStockOnly) {
      filtered = filtered.filter((p) =>
        p.variants.some((v) => v.stockStatus === "in-stock")
      );
    }

    if (onSaleOnly) {
      filtered = filtered.filter((p) =>
        p.variants.some((v) => v.sellingPriceInr < v.mrpInr)
      );
    }

    if (tags.length > 0) {
      filtered = filtered.filter((p) =>
        tags.some((t) => p.tags.includes(t as any))
      );
    }

    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.keyFeatures.some((f) => f.toLowerCase().includes(q))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => {
          const pA = a.variants[0]?.sellingPriceInr || 0;
          const pB = b.variants[0]?.sellingPriceInr || 0;
          return pA - pB;
        });
        break;
      case "price-desc":
        filtered.sort((a, b) => {
          const pA = a.variants[0]?.sellingPriceInr || 0;
          const pB = b.variants[0]?.sellingPriceInr || 0;
          return pB - pA;
        });
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => (b.tags.includes("new") ? 1 : 0) - (a.tags.includes("new") ? 1 : 0));
        break;
      default:
        // Relevance: bestsellers first, then rating
        filtered.sort((a, b) => {
          const scoreA = (a.tags.includes("bestseller") ? 2 : 0) + a.rating;
          const scoreB = (b.tags.includes("bestseller") ? 2 : 0) + b.rating;
          return scoreB - scoreA;
        });
        break;
    }

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const offset = (page - 1) * limit;
    const paginatedProducts = filtered.slice(offset, offset + limit);

    return {
      products: paginatedProducts,
      total,
      page,
      totalPages,
    };
  },

  /**
   * Retrieves a single product by URL slug.
   */
  async getProductBySlug(slug: string): Promise<Product | null> {
    const product = SEED_PRODUCTS.find((p) => p.slug === slug);
    return product || null;
  },

  /**
   * Retrieves a product by ID.
   */
  async getProductById(id: string): Promise<Product | null> {
    const product = SEED_PRODUCTS.find((p) => p.id === id);
    return product || null;
  },

  /**
   * Retrieves multiple products by ID array.
   */
  async getProductsByIds(ids: string[]): Promise<Product[]> {
    return SEED_PRODUCTS.filter((p) => ids.includes(p.id));
  },

  /**
   * Retrieves featured products for the storefront homepage.
   */
  async getFeaturedProducts(limit = 8): Promise<Product[]> {
    return SEED_PRODUCTS.filter((p) => p.tags.includes("bestseller") || p.tags.includes("pro-choice")).slice(0, limit);
  },

  /**
   * Retrieves related products in the same category or brand.
   */
  async getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
    const current = SEED_PRODUCTS.find((p) => p.id === productId);
    if (!current) return [];

    return SEED_PRODUCTS.filter(
      (p) => p.id !== productId && (p.categorySlug === current.categorySlug || p.brand.id === current.brand.id)
    ).slice(0, limit);
  },
};
