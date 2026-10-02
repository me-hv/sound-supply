"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SearchBar } from "@/components/search/SearchBar";
import { UtilityBar } from "./UtilityBar";
import { CategoryNav } from "@/components/navigation/CategoryNav";
import { MobileBottomNav } from "./MobileBottomNav";
import { Logo } from "@/components/ui/Logo";
import { useCommerce } from "@/context/CommerceContext";
import {
  Heart,
  ShoppingBag,
  User,
  Scale,
  Menu,
  X,
  ChevronRight,
  Flame,
  Wrench,
  BookOpen,
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export function SiteHeader() {
  const pathname = usePathname();
  const { cartCount, wishlistIds, compareIds, setCompareDrawerOpen } = useCommerce();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleFocusSearch = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      document.getElementById("universal-search-input")?.focus();
    }, 150);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-border">
        {/* Top utility ticker */}
        <UtilityBar />

        {/* Main Header Row */}
        <div className="py-2.5 sm:py-3 border-b border-border lg:border-b-0">
          <Container size="wide">
            <div className="flex items-center justify-between gap-3 sm:gap-4 lg:gap-8">
              {/* Mobile Hamburger Button */}
              <div className="flex items-center lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 text-text-primary hover:bg-canvas rounded-md transition-colors focus-visible:ring-1 focus-visible:ring-accent"
                  aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>

              {/* Brand Logo & Wordmark */}
              <div className="flex-1 flex justify-center lg:justify-start lg:flex-initial">
                <Logo size="md" variant="light" showTagline={true} />
              </div>

              {/* Central Universal Search Bar (Desktop) */}
              <div className="flex-1 max-w-2xl hidden md:block">
                <SearchBar />
              </div>

              {/* Right Account & Commerce Actions */}
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                {/* Compare Quick Access */}
                <button
                  type="button"
                  onClick={() => setCompareDrawerOpen(true)}
                  className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-canvas rounded-md transition-colors flex flex-col items-center justify-center group focus-visible:ring-1 focus-visible:ring-accent"
                  aria-label={`Product comparison matrix, ${compareIds.length} items selected`}
                >
                  <Scale size={18} />
                  <span className="text-[10px] font-medium hidden xl:inline mt-0.5">Compare</span>
                  {compareIds.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#171717] text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                      {compareIds.length}
                    </span>
                  )}
                </button>

                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-canvas rounded-md transition-colors flex flex-col items-center justify-center group focus-visible:ring-1 focus-visible:ring-accent"
                  aria-label={`Saved gear wishlist, ${wishlistIds.length} items saved`}
                >
                  <Heart size={18} />
                  <span className="text-[10px] font-medium hidden xl:inline mt-0.5">Saved</span>
                  {wishlistIds.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                      {wishlistIds.length}
                    </span>
                  )}
                </Link>

                {/* Account */}
                <Link
                  href="/account"
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-canvas rounded-md transition-colors flex flex-col items-center justify-center group focus-visible:ring-1 focus-visible:ring-accent"
                  aria-label="Account portal"
                >
                  <User size={18} />
                  <span className="text-[10px] font-medium hidden xl:inline mt-0.5">Account</span>
                </Link>

                {/* Shopping Cart Button */}
                <Link
                  href="/cart"
                  className="inline-flex items-center gap-2 bg-[#171717] hover:bg-accent text-white px-3 py-2 rounded-md text-xs font-semibold shadow-subtle transition-all active:scale-[0.98] ml-1 focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label={`Shopping cart containing ${cartCount} items`}
                >
                  <div className="relative">
                    <ShoppingBag size={17} />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <div className="hidden sm:flex flex-col text-left leading-tight">
                    <span className="text-[9px] text-gray-400 uppercase font-mono">Studio Cart</span>
                    <span className="font-bold">{cartCount > 0 ? `${cartCount} items` : "Cart"}</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Mobile Search Bar Row (Under logo) */}
            <div className="mt-2.5 md:hidden">
              <SearchBar />
            </div>
          </Container>
        </div>

        {/* Desktop Horizontal Category Navigation */}
        <CategoryNav />

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-[110px] bg-white z-50 overflow-y-auto lg:hidden border-t border-border animate-in slide-in-from-top-4 duration-200 pb-20">
            <div className="p-4 space-y-4">
              {/* Quick links banner */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/studio-builder"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-3 bg-canvas rounded-lg border border-border text-xs font-bold text-text-primary"
                >
                  <Wrench size={16} className="text-accent" />
                  <span>Studio Builder</span>
                </Link>
                <Link
                  href="/deals"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200 text-xs font-bold text-accent"
                >
                  <Flame size={16} />
                  <span>Deals & Bundles</span>
                </Link>
              </div>

              {/* Category list on mobile */}
              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-text-muted px-2 py-1 font-mono">
                  Browse Gear Categories
                </div>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-canvas text-sm font-medium text-text-primary border-b border-border-subtle"
                  >
                    <span>{cat.name}</span>
                    <ChevronRight size={16} className="text-text-muted" />
                  </Link>
                ))}
              </div>

              {/* Learning links */}
              <div className="pt-2">
                <Link
                  href="/guides"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 p-3 rounded-lg hover:bg-canvas text-sm font-medium text-text-secondary"
                >
                  <BookOpen size={16} className="text-text-muted" />
                  <span>Buying Guides & Equipment Advice</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Sticky Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        onOpenMobileCategories={() => setMobileMenuOpen((prev) => !prev)}
        onFocusSearch={handleFocusSearch}
      />
    </>
  );
}
