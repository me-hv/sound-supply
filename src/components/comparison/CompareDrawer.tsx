"use client";

import React from "react";
import Link from "next/link";
import { useCommerce } from "@/context/CommerceContext";
import { PRODUCTS } from "@/data/products";
import { formatInr } from "@/lib/utils";
import { Scale, X, ArrowRight, Trash2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function CompareDrawer() {
  const {
    compareIds,
    removeFromCompare,
    clearCompare,
    isCompareDrawerOpen,
    setCompareDrawerOpen,
  } = useCommerce();

  if (compareIds.length === 0 || !isCompareDrawerOpen) {
    return null;
  }

  const comparedProducts = PRODUCTS.filter((p) => compareIds.includes(p.id));

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#171717] text-white border-t border-[#333330] shadow-modal animate-in slide-in-from-bottom-5 duration-200">
      <Container size="wide" className="py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left: Summary Title & Clear */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center text-white flex-shrink-0">
              <Scale size={16} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-300">
                Gear Comparison Matrix
              </div>
              <div className="text-xs text-gray-400">
                {compareIds.length} of 4 items selected
              </div>
            </div>

            <button
              type="button"
              onClick={clearCompare}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1 ml-2 underline underline-offset-2"
            >
              <Trash2 size={12} />
              <span>Clear all</span>
            </button>
          </div>

          {/* Center: Selected Gear Thumbnails */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-xl py-1">
            {comparedProducts.map((p) => {
              const variant = p.variants[0];
              return (
                <div
                  key={p.id}
                  className="flex items-center gap-2 bg-[#262624] border border-[#3C3C38] rounded-md p-1.5 pr-2.5 flex-shrink-0 group relative"
                >
                  <div className="w-9 h-9 bg-white rounded p-0.5 flex-shrink-0 overflow-hidden">
                    <img
                      src={variant.images[0]}
                      alt={p.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col text-left max-w-[120px]">
                    <span className="text-[11px] font-semibold text-white truncate">
                      {p.title}
                    </span>
                    <span className="text-[10px] text-accent font-mono">
                      {formatInr(variant.sellingPriceInr)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCompare(p.id)}
                    className="text-gray-400 hover:text-white p-0.5 rounded ml-1"
                    title="Remove from comparison"
                  >
                    <X size={13} />
                  </button>
                </div>
              );
            })}

            {/* Empty slots indicator */}
            {Array.from({ length: 4 - comparedProducts.length }).map((_, i) => (
              <div
                key={i}
                className="hidden md:flex items-center justify-center w-24 h-12 border border-dashed border-[#444440] rounded-md text-[10px] text-gray-400"
              >
                + Add gear
              </div>
            ))}
          </div>

          {/* Right Action: Launch Full Comparison Page & Minimize */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link
              href="/compare"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold px-4 py-2.5 rounded-md transition-colors shadow-subtle"
            >
              <span>Compare Full Specs ({compareIds.length})</span>
              <ArrowRight size={14} />
            </Link>

            <button
              type="button"
              onClick={() => setCompareDrawerOpen(false)}
              className="p-2 text-gray-400 hover:text-white rounded-md border border-[#333330] hover:bg-[#262624]"
              title="Close tray"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
