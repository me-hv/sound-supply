"use client";

import React, { useState } from "react";
import { BRANDS } from "@/data/brands";
import { Filter, X, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterValues {
  brands: string[];
  priceRange?: string; // "all" | "under-20k" | "20k-50k" | "50k-100k" | "above-100k"
  inStockOnly: boolean;
  minRating?: number;
}

interface FilterSidebarProps {
  currentFilters: FilterValues;
  onFilterChange: (filters: FilterValues) => void;
  onClear: () => void;
  availableBrands?: string[];
  totalMatches: number;
}

const PRICE_PRESETS = [
  { id: "all", label: "All Prices" },
  { id: "under-20k", label: "Under ₹20,000" },
  { id: "20k-50k", label: "₹20,000 – ₹50,000" },
  { id: "50k-100k", label: "₹50,000 – ₹1,00,000" },
  { id: "above-100k", label: "Above ₹1,00,000" },
];

export function FilterSidebar({
  currentFilters,
  onFilterChange,
  onClear,
  availableBrands,
  totalMatches,
}: FilterSidebarProps) {
  const [brandsOpen, setBrandsOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [availabilityOpen, setAvailabilityOpen] = useState(true);

  const displayBrands = availableBrands
    ? BRANDS.filter((b) => availableBrands.includes(b.slug))
    : BRANDS;

  const handleBrandToggle = (brandSlug: string) => {
    const updated = currentFilters.brands.includes(brandSlug)
      ? currentFilters.brands.filter((b) => b !== brandSlug)
      : [...currentFilters.brands, brandSlug];

    onFilterChange({
      ...currentFilters,
      brands: updated,
    });
  };

  const handlePriceSelect = (priceId: string) => {
    onFilterChange({
      ...currentFilters,
      priceRange: priceId,
    });
  };

  const handleStockToggle = () => {
    onFilterChange({
      ...currentFilters,
      inStockOnly: !currentFilters.inStockOnly,
    });
  };

  const hasActiveFilters =
    currentFilters.brands.length > 0 ||
    (currentFilters.priceRange && currentFilters.priceRange !== "all") ||
    currentFilters.inStockOnly;

  return (
    <aside className="w-full bg-white border border-border rounded-lg p-4 space-y-5 text-sm">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-accent" />
          <h3 className="font-bold text-text-primary">Filters</h3>
          <span className="text-xs text-text-muted">({totalMatches} items)</span>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-accent hover:underline font-semibold"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Availability Section */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setAvailabilityOpen(!availabilityOpen)}
          className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-text-primary"
        >
          <span>Availability</span>
          <ChevronDown
            size={14}
            className={cn("transition-transform", !availabilityOpen && "-rotate-90")}
          />
        </button>

        {availabilityOpen && (
          <label className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer pt-1 hover:text-text-primary">
            <input
              type="checkbox"
              checked={currentFilters.inStockOnly}
              onChange={handleStockToggle}
              className="rounded border-border text-accent focus:ring-accent w-4 h-4"
            />
            <span>In Stock Units Only</span>
          </label>
        )}
      </div>

      {/* Price Range Section */}
      <div className="pt-3 border-t border-border-subtle space-y-2">
        <button
          type="button"
          onClick={() => setPriceOpen(!priceOpen)}
          className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-text-primary"
        >
          <span>Price (INR)</span>
          <ChevronDown
            size={14}
            className={cn("transition-transform", !priceOpen && "-rotate-90")}
          />
        </button>

        {priceOpen && (
          <div className="space-y-1.5 pt-1">
            {PRICE_PRESETS.map((p) => {
              const isChecked = (currentFilters.priceRange || "all") === p.id;
              return (
                <label
                  key={p.id}
                  className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer hover:text-text-primary"
                >
                  <input
                    type="radio"
                    name="priceFilter"
                    checked={isChecked}
                    onChange={() => handlePriceSelect(p.id)}
                    className="text-accent focus:ring-accent w-3.5 h-3.5"
                  />
                  <span className={cn(isChecked && "font-semibold text-text-primary")}>
                    {p.label}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Brands Section */}
      <div className="pt-3 border-t border-border-subtle space-y-2">
        <button
          type="button"
          onClick={() => setBrandsOpen(!brandsOpen)}
          className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-text-primary"
        >
          <span>Brand / Manufacturer</span>
          <ChevronDown
            size={14}
            className={cn("transition-transform", !brandsOpen && "-rotate-90")}
          />
        </button>

        {brandsOpen && (
          <div className="space-y-1.5 pt-1 max-h-56 overflow-y-auto pr-1">
            {displayBrands.map((b) => {
              const isChecked = currentFilters.brands.includes(b.slug);
              return (
                <label
                  key={b.id}
                  className="flex items-center justify-between text-xs text-text-secondary cursor-pointer hover:text-text-primary py-0.5"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleBrandToggle(b.slug)}
                      className="rounded border-border text-accent focus:ring-accent w-3.5 h-3.5"
                    />
                    <span className={cn(isChecked && "font-semibold text-text-primary")}>
                      {b.name}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
