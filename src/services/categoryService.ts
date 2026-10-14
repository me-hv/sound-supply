import { Category } from "@/types";
import { CATEGORIES } from "@/data/categories";

/**
 * Sound Supply — Category Service Layer
 */
export const categoryService = {
  /**
   * Retrieves all top-level categories with subcategory groups.
   */
  async getCategories(): Promise<Category[]> {
    return CATEGORIES;
  },

  /**
   * Retrieves a category by URL slug.
   */
  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const category = CATEGORIES.find((c) => c.slug === slug);
    return category || null;
  },

  /**
   * Retrieves all category slugs for static path generation.
   */
  async getAllCategorySlugs(): Promise<string[]> {
    return CATEGORIES.map((c) => c.slug);
  },
};
