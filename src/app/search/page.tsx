"use client";

import React, { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { EmptyState } from "@/components/ui/EmptyState";
import { Search } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const normalized = q.toLowerCase().trim();

  const results = useMemo(() => {
    if (!normalized) return PRODUCTS;
    return PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(normalized) ||
        p.brand.name.toLowerCase().includes(normalized) ||
        p.shortDescription.toLowerCase().includes(normalized) ||
        p.specifications.some((s) => s.value.toLowerCase().includes(normalized))
    );
  }, [normalized]);

  return (
    <div className="py-8 bg-canvas min-h-screen">
      <Container size="wide">
        <Breadcrumbs items={[{ label: `Search: "${q}"` }]} className="mb-4" />

        <div className="bg-white border border-border rounded-lg p-6 sm:p-8 mb-8 shadow-subtle flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent font-mono mb-1">
              <Search size={14} />
              <span>Universal Search Results</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              {q ? `Results for “${q}”` : "All Gear Catalog"}
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary mt-1">
              Found <strong className="text-text-primary font-mono">{results.length}</strong> matching models with verified specs.
            </p>
          </div>
        </div>

        {results.length === 0 ? (
          <EmptyState
            icon={Search}
            title={`No equipment matches “${q}”`}
            description="Try searching for a brand like Focusrite or Yamaha, or an equipment category like 'audio interfaces' or 'studio monitors'."
            actionLabel="Browse Full Catalog"
            actionHref="/categories/studio-recording"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm">Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
}
