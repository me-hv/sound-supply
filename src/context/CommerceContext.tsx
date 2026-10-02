"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

interface CommerceContextType {
  compareIds: string[];
  addToCompare: (productId: string) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  isCompareDrawerOpen: boolean;
  setCompareDrawerOpen: (open: boolean) => void;

  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  cartItems: CartItem[];
  addToCart: (productId: string, variantId?: string, quantity?: number) => void;
  removeFromCart: (variantId: string) => void;
  cartCount: number;
}

const CommerceContext = createContext<CommerceContextType | undefined>(undefined);

export function CommerceProvider({ children }: { children: React.ReactNode }) {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareDrawerOpen, setCompareDrawerOpen] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load from localStorage if available (client-side only)
  useEffect(() => {
    try {
      const savedCompare = localStorage.getItem("soundsupply_compare");
      if (savedCompare) setCompareIds(JSON.parse(savedCompare));

      const savedWishlist = localStorage.getItem("soundsupply_wishlist");
      if (savedWishlist) setWishlistIds(JSON.parse(savedWishlist));

      const savedCart = localStorage.getItem("soundsupply_cart");
      if (savedCart) setCartItems(JSON.parse(savedCart));
    } catch {
      // Ignore storage errors
    }
  }, []);

  const addToCompare = (productId: string): boolean => {
    if (compareIds.includes(productId)) {
      removeFromCompare(productId);
      return false;
    }
    if (compareIds.length >= 4) {
      alert("You can compare up to 4 pieces of gear simultaneously.");
      return false;
    }
    const updated = [...compareIds, productId];
    setCompareIds(updated);
    setCompareDrawerOpen(true);
    try {
      localStorage.setItem("soundsupply_compare", JSON.stringify(updated));
    } catch {}
    return true;
  };

  const removeFromCompare = (productId: string) => {
    const updated = compareIds.filter((id) => id !== productId);
    setCompareIds(updated);
    try {
      localStorage.setItem("soundsupply_compare", JSON.stringify(updated));
    } catch {}
  };

  const clearCompare = () => {
    setCompareIds([]);
    setCompareDrawerOpen(false);
    try {
      localStorage.removeItem("soundsupply_compare");
    } catch {}
  };

  const isInCompare = (productId: string) => compareIds.includes(productId);

  const toggleWishlist = (productId: string) => {
    let updated: string[];
    if (wishlistIds.includes(productId)) {
      updated = wishlistIds.filter((id) => id !== productId);
    } else {
      updated = [...wishlistIds, productId];
    }
    setWishlistIds(updated);
    try {
      localStorage.setItem("soundsupply_wishlist", JSON.stringify(updated));
    } catch {}
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const addToCart = (productId: string, variantId?: string, quantity: number = 1) => {
    setCartItems((prev) => {
      const vId = variantId || productId;
      const existing = prev.find((item) => item.variantId === vId);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.variantId === vId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updated = [...prev, { productId, variantId: vId, quantity }];
      }
      try {
        localStorage.setItem("soundsupply_cart", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const removeFromCart = (variantId: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.variantId !== variantId);
      try {
        localStorage.setItem("soundsupply_cart", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CommerceContext.Provider
      value={{
        compareIds,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        isCompareDrawerOpen,
        setCompareDrawerOpen,
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        cartItems,
        addToCart,
        removeFromCart,
        cartCount,
      }}
    >
      {children}
    </CommerceContext.Provider>
  );
}

export function useCommerce() {
  const context = useContext(CommerceContext);
  if (!context) {
    throw new Error("useCommerce must be used within a CommerceProvider");
  }
  return context;
}
