"use client";

import React from "react";
import Link from "next/link";
import { useCommerce } from "@/context/CommerceContext";
import { PRODUCTS } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { RatingStars } from "@/components/ui/RatingStars";
import { formatInr } from "@/lib/utils";
import { Scale, X, ShoppingBag, Plus, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ComparePage() {
  const { compareIds, removeFromCompare, clearCompare, addToCompare, addToCart } = useCommerce();

  // If no items in compare, offer default popular comparison: Yamaha HS5 & KRK ROKIT 5
  const activeIds =
    compareIds.length > 0
      ? compareIds
      : ["prod-yamaha-hs5", "prod-krk-rokit5-g4"];

  const products = activeIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as typeof PRODUCTS;

  // Extract all unique spec labels across compared products
  const allSpecLabels = Array.from(
    new Set(products.flatMap((p) => p.specifications.map((s) => s.label)))
  );

  return (
    <div className="py-8 bg-canvas min-h-screen">
      <Container size="wide">
        <Breadcrumbs items={[{ label: "Technical Comparison" }]} className="mb-4" />

        {/* Page Header */}
        <div className="bg-white border border-border rounded-lg p-6 sm:p-8 mb-8 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent font-mono mb-1">
              <Scale size={14} />
              <span>Side-by-Side Diagnostic Evaluation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Product Specification Matrix
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary mt-1">
              Compare audio frequency response, driver components, I/O connectors, and current pricing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {compareIds.length > 0 && (
              <button
                type="button"
                onClick={clearCompare}
                className="text-xs font-semibold text-text-muted hover:text-accent underline"
              >
                Clear comparison list
              </button>
            )}

            <Link
              href="/categories/studio-recording"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#171717] hover:bg-black px-4 py-2 rounded-md transition-colors"
            >
              <Plus size={14} />
              <span>Add More Gear</span>
            </Link>
          </div>
        </div>

        {compareIds.length === 0 && (
          <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center justify-between">
            <span>
              <strong>Sample Benchmark Active:</strong> Currently demonstrating comparison between Yamaha HS5 and KRK ROKIT 5 G4 monitors.
            </span>
            <button
              onClick={() => {
                addToCompare("prod-scarlett-2i2-gen4");
                addToCompare("prod-universal-audio-apollo-twin-x");
              }}
              className="font-bold underline ml-2"
            >
              Switch to Audio Interfaces
            </button>
          </div>
        )}

        {/* Comparison Matrix Table */}
        <div className="bg-white border border-border rounded-xl shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              {/* Product Headers Row */}
              <thead>
                <tr className="border-b border-border bg-canvas/30">
                  <th className="p-4 w-1/4 text-xs font-bold uppercase tracking-wider text-text-muted align-top border-r border-border-subtle">
                    Hardware Overview
                  </th>
                  {products.map((p) => {
                    const variant = p.variants[0];
                    return (
                      <th
                        key={p.id}
                        className="p-4 w-1/4 align-top border-r border-border-subtle last:border-r-0 relative"
                      >
                        {compareIds.includes(p.id) && (
                          <button
                            type="button"
                            onClick={() => removeFromCompare(p.id)}
                            className="absolute top-2 right-2 p-1 text-text-muted hover:text-accent rounded"
                            title="Remove from comparison"
                          >
                            <X size={15} />
                          </button>
                        )}

                        <div className="space-y-3">
                          <div className="w-24 h-24 mx-auto bg-white rounded border border-border-subtle p-2 flex items-center justify-center">
                            <img
                              src={variant.images[0]}
                              alt={p.title}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>

                          <div className="text-center space-y-1">
                            <div className="text-[11px] font-bold text-accent uppercase tracking-wider">
                              {p.brand.name}
                            </div>
                            <Link
                              href={`/products/${p.slug}`}
                              className="text-xs font-bold text-text-primary hover:text-accent transition-colors block line-clamp-2"
                            >
                              {p.title}
                            </Link>
                          </div>

                          <div className="text-center pt-2 border-t border-border-subtle">
                            <div className="text-base font-bold font-mono text-text-primary">
                              {formatInr(variant.sellingPriceInr)}
                            </div>
                            {variant.mrpInr > variant.sellingPriceInr && (
                              <div className="text-[11px] text-text-muted line-through font-mono">
                                MRP {formatInr(variant.mrpInr)}
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => addToCart(p.id, variant.id, 1)}
                            className="w-full py-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <ShoppingBag size={13} />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              {/* General Commerce Metrics */}
              <tbody>
                <tr className="border-b border-border-subtle bg-canvas-muted">
                  <td colSpan={products.length + 1} className="py-2 px-4 text-[11px] font-bold uppercase tracking-wider text-text-primary">
                    Ratings & Warranty
                  </td>
                </tr>

                <tr className="border-b border-border-subtle">
                  <td className="py-3 px-4 text-xs font-semibold text-text-secondary border-r border-border-subtle">
                    Customer Rating
                  </td>
                  {products.map((p) => (
                    <td key={p.id} className="py-3 px-4 text-xs border-r border-border-subtle last:border-r-0">
                      <RatingStars rating={p.rating} reviewCount={p.reviewCount} size="sm" />
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-border-subtle">
                  <td className="py-3 px-4 text-xs font-semibold text-text-secondary border-r border-border-subtle">
                    Official Indian Warranty
                  </td>
                  {products.map((p) => (
                    <td key={p.id} className="py-3 px-4 text-xs text-text-primary font-medium border-r border-border-subtle last:border-r-0">
                      {p.warrantySummary}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-border-subtle">
                  <td className="py-3 px-4 text-xs font-semibold text-text-secondary border-r border-border-subtle">
                    0% EMI Starting Rate
                  </td>
                  {products.map((p) => (
                    <td key={p.id} className="py-3 px-4 text-xs font-mono font-bold text-text-primary border-r border-border-subtle last:border-r-0">
                      {formatInr(p.emiStartingInr)} / mo
                    </td>
                  ))}
                </tr>

                {/* Technical Specifications Section */}
                <tr className="border-b border-border-subtle bg-canvas-muted">
                  <td colSpan={products.length + 1} className="py-2 px-4 text-[11px] font-bold uppercase tracking-wider text-text-primary">
                    Technical Specifications
                  </td>
                </tr>

                {allSpecLabels.map((label, idx) => (
                  <tr
                    key={label}
                    className={cn(
                      "border-b border-border-subtle last:border-b-0",
                      idx % 2 === 0 ? "bg-white" : "bg-canvas/30"
                    )}
                  >
                    <td className="py-2.5 px-4 text-xs font-medium text-text-secondary border-r border-border-subtle">
                      {label}
                    </td>
                    {products.map((p) => {
                      const spec = p.specifications.find((s) => s.label === label);
                      return (
                        <td
                          key={p.id}
                          className="py-2.5 px-4 text-xs font-mono text-text-primary border-r border-border-subtle last:border-r-0"
                        >
                          {spec ? spec.value : "—"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
}
