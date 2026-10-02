"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, Search, Heart, ShoppingBag } from "lucide-react";
import { useCommerce } from "@/context/CommerceContext";
import { cn } from "@/lib/utils";

interface MobileBottomNavProps {
  onOpenMobileCategories?: () => void;
  onFocusSearch?: () => void;
}

export function MobileBottomNav({
  onOpenMobileCategories,
  onFocusSearch,
}: MobileBottomNavProps) {
  const pathname = usePathname();
  const { cartCount, wishlistIds } = useCommerce();

  const isHome = pathname === "/";
  const isCategories = pathname.startsWith("/categories");
  const isSearch = pathname.startsWith("/search");
  const isWishlist = pathname.startsWith("/wishlist");
  const isCart = pathname.startsWith("/cart");

  const handleSearchClick = (e: React.MouseEvent) => {
    if (onFocusSearch) {
      e.preventDefault();
      onFocusSearch();
    }
  };

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border lg:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.05)]"
    >
      <div className="grid grid-cols-5 h-14">
        {/* 1. Home */}
        <Link
          href="/"
          className={cn(
            "flex flex-col items-center justify-center py-1 transition-colors relative",
            isHome ? "text-accent font-bold" : "text-text-secondary hover:text-text-primary"
          )}
        >
          <Home size={18} />
          <span className="text-[10px] mt-0.5">Home</span>
          {isHome && <span className="absolute top-0 w-8 h-0.5 bg-accent rounded-full" />}
        </Link>

        {/* 2. Categories */}
        <Link
          href="/categories"
          onClick={(e) => {
            if (onOpenMobileCategories) {
              e.preventDefault();
              onOpenMobileCategories();
            }
          }}
          className={cn(
            "flex flex-col items-center justify-center py-1 transition-colors relative",
            isCategories ? "text-accent font-bold" : "text-text-secondary hover:text-text-primary"
          )}
        >
          <Layers size={18} />
          <span className="text-[10px] mt-0.5">Catalog</span>
          {isCategories && <span className="absolute top-0 w-8 h-0.5 bg-accent rounded-full" />}
        </Link>

        {/* 3. Search */}
        <Link
          href="/search"
          onClick={handleSearchClick}
          className={cn(
            "flex flex-col items-center justify-center py-1 transition-colors relative",
            isSearch ? "text-accent font-bold" : "text-text-secondary hover:text-text-primary"
          )}
        >
          <Search size={18} />
          <span className="text-[10px] mt-0.5">Search</span>
          {isSearch && <span className="absolute top-0 w-8 h-0.5 bg-accent rounded-full" />}
        </Link>

        {/* 4. Wishlist */}
        <Link
          href="/wishlist"
          className={cn(
            "flex flex-col items-center justify-center py-1 transition-colors relative",
            isWishlist ? "text-accent font-bold" : "text-text-secondary hover:text-text-primary"
          )}
        >
          <div className="relative">
            <Heart size={18} className={isWishlist ? "fill-accent text-accent" : ""} />
            {wishlistIds.length > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[14px] h-[14px] bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5 font-mono">
                {wishlistIds.length}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Saved</span>
          {isWishlist && <span className="absolute top-0 w-8 h-0.5 bg-accent rounded-full" />}
        </Link>

        {/* 5. Cart */}
        <Link
          href="/cart"
          className={cn(
            "flex flex-col items-center justify-center py-1 transition-colors relative",
            isCart ? "text-accent font-bold" : "text-text-secondary hover:text-text-primary"
          )}
        >
          <div className="relative">
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[14px] h-[14px] bg-[#171717] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5 font-mono">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Cart</span>
          {isCart && <span className="absolute top-0 w-8 h-0.5 bg-accent rounded-full" />}
        </Link>
      </div>
    </nav>
  );
}
