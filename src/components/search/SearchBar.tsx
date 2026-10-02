"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, CornerDownLeft, Clock, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { BRANDS } from "@/data/brands";
import { formatInr, cn } from "@/lib/utils";

const POPULAR_SEARCH_TERMS = [
  "Focusrite Scarlett",
  "Shure SM7B",
  "Yamaha HS5",
  "ATH-M50x",
  "Studio Monitors",
  "MIDI Keyboards",
  "Audio Interface",
];

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const listboxId = useId();

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

  // Matching entities
  const matchingProducts = normalized
    ? PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(normalized) ||
          p.brand.name.toLowerCase().includes(normalized) ||
          p.shortDescription.toLowerCase().includes(normalized) ||
          p.specifications.some((s) => s.value.toLowerCase().includes(normalized))
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

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelectPopular = (term: string) => {
    setQuery(term);
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    } else if (e.key === "Enter" && !e.shiftKey) {
      handleSearchSubmit();
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSearchSubmit} className="relative flex items-center" role="search">
        <label htmlFor="universal-search-input" className="sr-only">
          Search audio equipment, instruments, specifications, and brands
        </label>
        <div className="absolute left-3.5 text-text-muted pointer-events-none" aria-hidden="true">
          <Search size={18} />
        </div>

        <input
          id="universal-search-input"
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-autocomplete="list"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search guitars, microphones, interfaces, synths..."
          className="w-full pl-10 pr-24 py-2.5 text-sm bg-[#FAFAF9] hover:bg-white focus:bg-white text-text-primary placeholder:text-text-muted border border-border rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-12 p-1 text-text-muted hover:text-text-primary rounded"
            aria-label="Clear search input"
          >
            <X size={15} />
          </button>
        )}

        <button
          type="submit"
          className="absolute right-1.5 px-3 py-1.5 text-xs font-semibold bg-accent text-white rounded-md hover:bg-accent-hover transition-colors flex items-center gap-1 active:scale-[0.98]"
        >
          <span className="hidden sm:inline">Search</span>
          <CornerDownLeft size={12} className="opacity-80" />
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-border rounded-lg shadow-dropdown z-50 overflow-hidden divide-y divide-border-subtle animate-in fade-in-50 duration-150"
        >
          {/* State A: Empty input shows popular queries */}
          {!normalized && (
            <div className="p-3.5 space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                <Sparkles size={12} className="text-accent" />
                <span>Popular Gear Searches</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_SEARCH_TERMS.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleSelectPopular(term)}
                    className="text-xs bg-canvas hover:bg-canvas-muted text-text-secondary hover:text-text-primary px-2.5 py-1 rounded-md border border-border-subtle transition-colors flex items-center gap-1"
                  >
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* State B: User has typed query */}
          {normalized && (
            <div className="max-h-[460px] overflow-y-auto">
              {matchingProducts.length === 0 &&
              matchingCategories.length === 0 &&
              matchingBrands.length === 0 ? (
                <div className="p-5 text-center text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">No immediate catalog matches</p>
                  <p className="text-xs text-text-muted mt-1">
                    Press Enter to perform a broader search for &ldquo;{query}&rdquo;.
                  </p>
                </div>
              ) : (
                <div>
                  {/* Products Matches */}
                  {matchingProducts.length > 0 && (
                    <div className="p-2">
                      <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                        Matching Equipment
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

                  {/* Categories & Brands quick suggestions */}
                  {(matchingCategories.length > 0 || matchingBrands.length > 0) && (
                    <div className="p-2.5 bg-canvas-muted border-t border-border-subtle">
                      {matchingCategories.length > 0 && (
                        <div className="mb-2">
                          <div className="px-1 py-1 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                            Matching Categories
                          </div>
                          <div className="flex flex-wrap gap-1.5">
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
                          <div className="px-1 py-1 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                            Matching Brands
                          </div>
                          <div className="flex flex-wrap gap-1.5">
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

                  {/* Footer button */}
                  <div className="p-2 bg-white text-center border-t border-border-subtle">
                    <button
                      type="button"
                      onClick={() => handleSearchSubmit()}
                      className="w-full py-1.5 text-xs text-text-secondary hover:text-accent font-semibold flex items-center justify-center gap-1.5"
                    >
                      <span>View all matching results for &ldquo;{query}&rdquo;</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
