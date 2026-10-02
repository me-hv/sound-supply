"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SearchBar } from "@/components/search/SearchBar";
import { UtilityBar } from "./UtilityBar";
import { CategoryNav } from "@/components/navigation/CategoryNav";
import { useCommerce } from "@/context/CommerceContext";
import {
  SlidersHorizontal,
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

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      {/* Top utility ticker */}
      <UtilityBar />

      {/* Main Header Row */}
      <div className="py-3 border-b border-border lg:border-b-0">
        <Container size="wide">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-text-primary hover:bg-canvas rounded-md"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center text-white shadow-subtle group-hover:bg-accent-hover transition-colors">
                <SlidersHorizontal size={20} className="stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-text-primary leading-none font-sans">
                  SOUND<span className="text-accent">SUPPLY</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-text-muted font-bold font-mono">
                  Pro Audio &bull; India
                </span>
              </div>
            </Link>

            {/* Central Universal Search Bar */}
            <div className="flex-1 max-w-2xl hidden md:block">
              <SearchBar />
            </div>

            {/* Right Account & Commerce Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Compare Quick Access */}
              <button
                type="button"
                onClick={() => setCompareDrawerOpen(true)}
                className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-canvas rounded-md transition-colors flex flex-col items-center justify-center group"
                title="Product Spec Comparison"
              >
                <Scale size={20} />
                <span className="text-[10px] font-medium hidden xl:inline mt-0.5">Compare</span>
                {compareIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#171717] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {compareIds.length}
                  </span>
                )}
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-canvas rounded-md transition-colors flex flex-col items-center justify-center group"
                title="Saved Gear Wishlist"
              >
                <Heart size={20} />
                <span className="text-[10px] font-medium hidden xl:inline mt-0.5">Saved</span>
                {wishlistIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistIds.length}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-canvas rounded-md transition-colors flex flex-col items-center justify-center group"
                title="Account & Orders"
              >
                <User size={20} />
                <span className="text-[10px] font-medium hidden xl:inline mt-0.5">Account</span>
              </Link>

              {/* Shopping Cart Button */}
              <Link
                href="/cart"
                className="inline-flex items-center gap-2 bg-[#171717] hover:bg-[#2C2C2C] text-white px-3 py-2 rounded-lg text-xs font-semibold shadow-subtle transition-colors ml-1"
              >
                <div className="relative">
                  <ShoppingBag size={18} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left leading-tight">
                  <span className="text-[10px] text-gray-400 uppercase font-mono">My Cart</span>
                  <span className="font-bold">{cartCount > 0 ? `${cartCount} items` : "Cart"}</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Search bar on mobile (under logo) */}
          <div className="mt-3 md:hidden">
            <SearchBar />
          </div>
        </Container>
      </div>

      {/* Desktop Horizontal Category Navigation */}
      <CategoryNav />

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[110px] bg-white z-50 overflow-y-auto lg:hidden border-t border-border animate-in slide-in-from-top-4 duration-200">
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
                <span>Deals & Offers</span>
              </Link>
            </div>

            {/* Category list accordion on mobile */}
            <div className="space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-text-muted px-2 py-1">
                Browse Categories
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
                <span>Buying Guides & Tone Tips</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
