"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, CornerDownLeft } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { BRANDS } from "@/data/brands";
import { formatInr } from "@/lib/utils";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const normalized = query.toLowerCase().trim();

  const matchingProducts = normalized
    ? PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(normalized) ||
          p.brand.name.toLowerCase().includes(normalized) ||
          p.shortDescription.toLowerCase().includes(normalized)
      ).slice(0, 4)
    : [];

  const matchingCategories = normalized
    ? CATEGORIES.filter(
        (c) =>
          c.name.toLowerCase().includes(normalized) ||
          c.tagline.toLowerCase().includes(normalized)
      ).slice(0, 3)
    : [];

  const matchingBrands = normalized
    ? BRANDS.filter((b) => b.name.toLowerCase().includes(normalized)).slice(0, 3)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSearchSubmit} className="relative flex items-center">
        <div className="absolute left-3.5 text-text-muted pointer-events-none">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search guitars, microphones, interfaces, synths..."
          className="w-full pl-10 pr-24 py-2.5 text-sm bg-[#FAFAF9] hover:bg-white focus:bg-white text-text-primary placeholder:text-text-muted border border-border rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-12 p-1 text-text-muted hover:text-text-primary"
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}

        <button
          type="submit"
          className="absolute right-1.5 px-3 py-1.5 text-xs font-semibold bg-accent text-white rounded-md hover:bg-accent-hover transition-colors flex items-center gap-1"
        >
          <span className="hidden sm:inline">Search</span>
          <CornerDownLeft size={12} className="opacity-80" />
        </button>
      </form>

      {/* Auto-suggest Dropdown */}
      {isOpen && query.trim().length > 1 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-border rounded-lg shadow-dropdown z-50 overflow-hidden divide-y divide-border-subtle animate-in fade-in-50 duration-150">
          {matchingProducts.length === 0 &&
          matchingCategories.length === 0 &&
          matchingBrands.length === 0 ? (
            <div className="p-4 text-center text-sm text-text-secondary">
              No direct matches for &ldquo;{query}&rdquo;. Press Enter to view broad results.
            </div>
          ) : (
            <div className="max-h-[480px] overflow-y-auto">
              {/* Products match section */}
              {matchingProducts.length > 0 && (
                <div className="p-2">
                  <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                    Matching Gear
                  </div>
                  {matchingProducts.map((p) => {
                    const variant = p.variants[0];
                    return (
                      <Link
                        key={p.id}
                        href={`/products/${p.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-canvas transition-colors group"
                      >
                        <div className="w-11 h-11 bg-canvas-muted rounded flex items-center justify-center p-1 flex-shrink-0 border border-border-subtle overflow-hidden">
                          <img
                            src={variant.images[0]}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-semibold text-accent uppercase tracking-tight">
                            {p.brand.name}
                          </div>
                          <div className="text-sm font-medium text-text-primary truncate">
                            {p.title}
                          </div>
                          <div className="text-xs text-text-muted truncate">
                            {p.subtitle}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 pl-2">
                          <div className="text-sm font-bold text-text-primary font-mono">
                            {formatInr(variant.sellingPriceInr)}
                          </div>
                          {variant.mrpInr > variant.sellingPriceInr && (
                            <div className="text-[11px] text-text-muted line-through font-mono">
                              {formatInr(variant.mrpInr)}
                            </div>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Categories & Brands quick links */}
              {(matchingCategories.length > 0 || matchingBrands.length > 0) && (
                <div className="p-2 bg-canvas-muted">
                  {matchingCategories.length > 0 && (
                    <div className="mb-2">
                      <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                        Categories
                      </div>
                      <div className="flex flex-wrap gap-1.5 px-2">
                        {matchingCategories.map((c) => (
                          <Link
                            key={c.id}
                            href={`/categories/${c.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1.5 text-xs bg-white border border-border px-2.5 py-1 rounded-md text-text-primary hover:border-accent hover:text-accent transition-colors"
                          >
                            <span>{c.name}</span>
                            <ArrowRight size={11} />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchingBrands.length > 0 && (
                    <div>
                      <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                        Authorized Brands
                      </div>
                      <div className="flex flex-wrap gap-1.5 px-2">
                        {matchingBrands.map((b) => (
                          <Link
                            key={b.id}
                            href={`/brands/${b.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center text-xs bg-white border border-border px-2.5 py-1 rounded-md font-semibold text-text-primary hover:border-accent hover:text-accent transition-colors"
                          >
                            {b.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* View all button */}
              <div className="p-2 bg-white text-center">
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="w-full py-1.5 text-xs text-text-secondary hover:text-accent font-semibold flex items-center justify-center gap-1.5"
                >
                  <span>View all results for &ldquo;{query}&rdquo;</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
