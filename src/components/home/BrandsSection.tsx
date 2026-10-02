"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BRANDS } from "@/data/brands";
import { ArrowRight, Tag, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandsSection() {
  const [selectedLetter, setSelectedLetter] = useState<string>("ALL");

  // Group brands by first letter
  const groupedBrands = BRANDS.reduce((acc, brand) => {
    const letter = brand.name.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(brand);
    return acc;
  }, {} as Record<string, typeof BRANDS>);

  const letters = Object.keys(groupedBrands).sort();

  const displayedLetters = selectedLetter === "ALL" ? letters : [selectedLetter];

  return (
    <section className="py-14 bg-canvas border-b border-border">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-accent mb-1 font-mono">
              Manufacturer Index
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Shop by Brand
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-1">
              Browse world-renowned pro audio manufacturers across conversion, monitoring, microphones, and instruments.
            </p>
          </div>

          <Link
            href="/brands"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover transition-colors flex-shrink-0"
          >
            <span>Complete A–Z Directory</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Quick Letter Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 border-b border-border-subtle">
          <button
            type="button"
            onClick={() => setSelectedLetter("ALL")}
            className={cn(
              "px-3 py-1 text-xs font-mono font-bold rounded transition-colors",
              selectedLetter === "ALL"
                ? "bg-[#171717] text-white"
                : "bg-white text-text-secondary hover:text-text-primary border border-border-subtle hover:bg-canvas-muted"
            )}
          >
            ALL
          </button>
          {letters.map((letter) => (
            <button
              key={letter}
              type="button"
              onClick={() => setSelectedLetter(letter)}
              className={cn(
                "w-7 h-7 flex items-center justify-center text-xs font-mono font-bold rounded transition-colors",
                selectedLetter === letter
                  ? "bg-accent text-white"
                  : "bg-white text-text-secondary hover:text-text-primary border border-border-subtle hover:bg-canvas-muted"
              )}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Grouped Alphabetical Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedLetters.map((letter) => (
            <div
              key={letter}
              className="bg-white border border-border rounded-lg p-4 shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-border-subtle mb-3">
                  <span className="text-sm font-extrabold font-mono text-accent">
                    {letter}
                  </span>
                  <span className="text-[11px] font-mono text-text-muted">
                    {groupedBrands[letter]?.length || 0} Brands
                  </span>
                </div>

                <div className="space-y-2.5">
                  {groupedBrands[letter]?.map((brand) => (
                    <Link
                      key={brand.id}
                      href={`/brands/${brand.slug}`}
                      className="group flex items-center justify-between py-1 px-1.5 rounded hover:bg-canvas transition-colors"
                    >
                      <div>
                        <div className="text-xs font-bold text-text-primary group-hover:text-accent transition-colors">
                          {brand.name}
                        </div>
                        <div className="text-[10px] text-text-muted">
                          {brand.originCountry} &bull; {brand.warrantyPeriodMonths}M Warranty
                        </div>
                      </div>
                      <ArrowRight
                        size={12}
                        className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-transform"
                      />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-border-subtle text-[11px] text-text-muted flex items-center gap-1">
                <ShieldCheck size={13} className="text-emerald-700" />
                <span>Verified Brand Serials</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
