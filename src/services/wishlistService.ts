// In-memory wishlist store by session token
const sessionWishlists = new Map<string, Set<string>>();

/**
 * Sound Supply — Wishlist Service Layer
 * 
 * Manages guest and authenticated wishlist items with session token mapping.
 */
export const wishlistService = {
  /**
   * Retrieves array of product IDs currently in the user's wishlist.
   */
  async getWishlist(sessionToken: string): Promise<string[]> {
    const set = sessionWishlists.get(sessionToken) || new Set<string>();
    return Array.from(set);
  },

  /**
   * Toggles product in or out of the session wishlist.
   */
  async toggleWishlist(sessionToken: string, productId: string): Promise<string[]> {
    let set = sessionWishlists.get(sessionToken);
    if (!set) {
      set = new Set<string>();
      sessionWishlists.set(sessionToken, set);
    }

    if (set.has(productId)) {
      set.delete(productId);
    } else {
      set.add(productId);
    }

    return Array.from(set);
  },

  /**
   * Checks if a product ID is in the session wishlist.
   */
  async isInWishlist(sessionToken: string, productId: string): Promise<boolean> {
    const set = sessionWishlists.get(sessionToken);
    return Boolean(set?.has(productId));
  },
};
