"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { cartService, CartSummary, ValidatedCartItem } from "@/services/cartService";
import { wishlistService } from "@/services/wishlistService";

export interface CartItem {
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
  cartSummary: CartSummary | null;
  validatedCartItems: ValidatedCartItem[];
  addToCart: (productId: string, variantId?: string, quantity?: number) => void;
  removeFromCart: (variantId: string) => void;
  updateCartQuantity: (variantId: string, quantity: number) => void;
  cartCount: number;
  sessionToken: string;
}

const CommerceContext = createContext<CommerceContextType | undefined>(undefined);

export function CommerceProvider({ children }: { children: React.ReactNode }) {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareDrawerOpen, setCompareDrawerOpen] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartSummary, setCartSummary] = useState<CartSummary | null>(null);
  const [sessionToken, setSessionToken] = useState<string>("");

  // Initialize guest session and load state from storage/services
  useEffect(() => {
    try {
      let token = localStorage.getItem("soundsupply_session_token");
      if (!token) {
        token = "sess_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem("soundsupply_session_token", token);
      }
      setSessionToken(token);

      const savedCompare = localStorage.getItem("soundsupply_compare");
      if (savedCompare) setCompareIds(JSON.parse(savedCompare));

      const savedWishlist = localStorage.getItem("soundsupply_wishlist");
      if (savedWishlist) setWishlistIds(JSON.parse(savedWishlist));

      const savedCart = localStorage.getItem("soundsupply_cart");
      if (savedCart) {
        const parsed: CartItem[] = JSON.parse(savedCart);
        setCartItems(parsed);
        // Sync items into cartService
        Promise.all(
          parsed.map((item) =>
            cartService.addToCart(token, item.productId, item.variantId, item.quantity)
          )
        ).then(() => {
          cartService.getCart(token).then(setCartSummary);
        });
      } else {
        cartService.getCart(token).then(setCartSummary);
      }
    } catch {
      // Ignore storage errors on client initialization
    }
  }, []);

  const refreshCart = useCallback(async (token: string) => {
    if (!token) return;
    try {
      const summary = await cartService.getCart(token);
      setCartSummary(summary);
      const simpleItems = summary.items.map((i) => ({
        productId: i.productId,
        variantId: i.variantId,
        quantity: i.quantity,
      }));
      setCartItems(simpleItems);
      localStorage.setItem("soundsupply_cart", JSON.stringify(simpleItems));
    } catch (err) {
      console.error("Failed to refresh cart:", err);
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

  const toggleWishlist = async (productId: string) => {
    let updated: string[];
    if (wishlistIds.includes(productId)) {
      updated = wishlistIds.filter((id) => id !== productId);
    } else {
      updated = [...wishlistIds, productId];
    }
    setWishlistIds(updated);
    try {
      localStorage.setItem("soundsupply_wishlist", JSON.stringify(updated));
      if (sessionToken) {
        await wishlistService.toggleWishlist(sessionToken, productId);
      }
    } catch {}
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const addToCart = async (productId: string, variantId?: string, quantity: number = 1) => {
    const activeToken = sessionToken || "guest_default";
    try {
      const summary = await cartService.addToCart(activeToken, productId, variantId, quantity);
      setCartSummary(summary);
      const simpleItems = summary.items.map((i) => ({
        productId: i.productId,
        variantId: i.variantId,
        quantity: i.quantity,
      }));
      setCartItems(simpleItems);
      localStorage.setItem("soundsupply_cart", JSON.stringify(simpleItems));
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  const updateCartQuantity = async (variantId: string, quantity: number) => {
    const activeToken = sessionToken || "guest_default";
    try {
      const summary = await cartService.updateQuantity(activeToken, variantId, quantity);
      setCartSummary(summary);
      const simpleItems = summary.items.map((i) => ({
        productId: i.productId,
        variantId: i.variantId,
        quantity: i.quantity,
      }));
      setCartItems(simpleItems);
      localStorage.setItem("soundsupply_cart", JSON.stringify(simpleItems));
    } catch (err) {
      console.error("Update quantity error:", err);
    }
  };

  const removeFromCart = async (variantId: string) => {
    const activeToken = sessionToken || "guest_default";
    try {
      const summary = await cartService.removeFromCart(activeToken, variantId);
      setCartSummary(summary);
      const simpleItems = summary.items.map((i) => ({
        productId: i.productId,
        variantId: i.variantId,
        quantity: i.quantity,
      }));
      setCartItems(simpleItems);
      localStorage.setItem("soundsupply_cart", JSON.stringify(simpleItems));
    } catch (err) {
      console.error("Remove from cart error:", err);
    }
  };

  const cartCount = cartSummary ? cartSummary.itemCount : cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
        cartSummary,
        validatedCartItems: cartSummary ? cartSummary.items : [],
        addToCart,
        removeFromCart,
        updateCartQuantity,
        cartCount,
        sessionToken,
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
