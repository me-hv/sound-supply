import { Product, Brand } from "@/types";
import { SEED_PRODUCTS } from "@/data/seedData";
import { BRANDS } from "@/data/brands";

export interface SearchResult {
  products: Product[];
  brands: Brand[];
  total: number;
}

/**
 * Sound Supply — Search Service Layer
 * 
 * Provides multi-field matching across product titles, brand names, categories,
 * key features, and dynamic technical specifications.
 */
export const searchService = {
  /**
   * Performs an instant search across products and brands.
   */
  async search(query: string, limit = 12): Promise<SearchResult> {
    const q = query.toLowerCase().trim();
    if (!q) {
      return { products: [], brands: [], total: 0 };
    }

    const matchingBrands = BRANDS.filter(
      (b) => b.name.toLowerCase().includes(q) || b.slug.toLowerCase().includes(q)
    );

    const matchingProducts = SEED_PRODUCTS.filter((product) => {
      // Direct title match
      if (product.title.toLowerCase().includes(q)) return true;
      // Brand match
      if (product.brand.name.toLowerCase().includes(q)) return true;
      // Subtitle / category match
      if (product.subtitle.toLowerCase().includes(q)) return true;
      if (product.categorySlug.toLowerCase().includes(q)) return true;
      if (product.subCategorySlug.toLowerCase().includes(q)) return true;
      // Feature list match
      if (product.keyFeatures.some((f) => f.toLowerCase().includes(q))) return true;
      // Specification match (e.g. "xlr", "condenser", "cardioid", "fatar", "24-bit")
      if (
        product.specifications.some(
          (s) => s.label.toLowerCase().includes(q) || s.value.toLowerCase().includes(q)
        )
      ) {
        return true;
      }
      return false;
    });

    return {
      products: matchingProducts.slice(0, limit),
      brands: matchingBrands.slice(0, 4),
      total: matchingProducts.length,
    };
  },

  /**
   * Generates auto-complete query suggestions for the header search bar.
   */
  async getSuggestions(query: string): Promise<string[]> {
    const q = query.toLowerCase().trim();
    if (!q || q.length < 2) return [];

    const suggestions = new Set<string>();

    // Check brand names
    for (const b of BRANDS) {
      if (b.name.toLowerCase().includes(q)) {
        suggestions.add(b.name);
      }
    }

    // Check product titles
    for (const p of SEED_PRODUCTS) {
      if (p.title.toLowerCase().includes(q)) {
        suggestions.add(p.title);
      }
    }

    return Array.from(suggestions).slice(0, 6);
  },
};
