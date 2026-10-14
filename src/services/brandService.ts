import { Brand } from "@/types";
import { BRANDS } from "@/data/brands";

/**
 * Sound Supply — Brand Service Layer
 */
export const brandService = {
  /**
   * Retrieves all verified audio brands in alphabetical order.
   */
  async getBrands(): Promise<Brand[]> {
    return [...BRANDS].sort((a, b) => a.name.localeCompare(b.name));
  },

  /**
   * Retrieves a single brand by its URL slug.
   */
  async getBrandBySlug(slug: string): Promise<Brand | null> {
    const brand = BRANDS.find((b) => b.slug === slug);
    return brand || null;
  },

  /**
   * Retrieves featured manufacturer brands.
   */
  async getFeaturedBrands(): Promise<Brand[]> {
    return BRANDS.filter((b) => b.featured);
  },

  /**
   * Retrieves all brand slugs for route generation.
   */
  async getAllBrandSlugs(): Promise<string[]> {
    return BRANDS.map((b) => b.slug);
  },
};
