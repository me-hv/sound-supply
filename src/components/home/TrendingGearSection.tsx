"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS } from "@/data/products";
import { ArrowRight, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const FILTER_TABS = [
  { id: "all", label: "All Trending Gear" },
  { id: "studio-recording", label: "Studio & Recording" },
  { id: "microphones", label: "Microphones" },
  { id: "keyboards-synths", label: "Keyboards & Synths" },
  { id: "guitars", label: "Guitars & Bass" },
];

export function TrendingGearSection() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === "all") return true;
    return p.categorySlug === activeTab;
  });

  return (
    <section className="py-16 bg-white border-b border-border">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent mb-1 font-mono">
              <Flame size={14} />
              <span>In-Demand Hardware</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Trending Studio & Stage Gear
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Top tracked audio converters, vocal transducers, and production synthesizers in Indian studios.
            </p>
          </div>

          <Link
            href="/categories/studio-recording"
            className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:text-accent-hover transition-colors flex-shrink-0"
          >
            <span>Explore Complete Catalog</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 border-b border-border-subtle">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-3.5 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors",
                activeTab === tab.id
                  ? "bg-[#171717] text-white"
                  : "bg-canvas text-text-secondary hover:text-text-primary hover:bg-canvas-muted"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
