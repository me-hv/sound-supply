"use client";

import React, { useState, useMemo, use } from "react";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { FilterSidebar, FilterValues } from "@/components/filters/FilterSidebar";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { ArrowUpDown, SlidersHorizontal, Grid3X3, LayoutList, Sliders } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const subCategoryParam = searchParams.get("sub");

  const category = CATEGORIES.find((c) => c.slug === resolvedParams.slug);

  const [filters, setFilters] = useState<FilterValues>({
    brands: [],
    priceRange: "all",
    inStockOnly: false,
  });

  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  if (!category && resolvedParams.slug !== "all") {
    // If not found, fallback to all products
  }

  // All products matching this category
  const baseCategoryProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (resolvedParams.slug === "deals") {
        return p.tags.includes("deal") || p.variants[0].mrpInr > p.variants[0].sellingPriceInr;
      }
      if (resolvedParams.slug === "all") return true;
      if (subCategoryParam) {
        return p.categorySlug === resolvedParams.slug && p.subCategorySlug === subCategoryParam;
      }
      return p.categorySlug === resolvedParams.slug;
    });
  }, [resolvedParams.slug, subCategoryParam]);

  // Apply filters
  const filteredProducts = useMemo(() => {
    return baseCategoryProducts.filter((product) => {
      const variant = product.variants[0];

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand.slug)) {
        return false;
      }

      // Stock filter
      if (filters.inStockOnly && variant.stockStatus !== "in-stock") {
        return false;
      }

      // Price filter
      const price = variant.sellingPriceInr;
      if (filters.priceRange === "under-20k" && price >= 20000) return false;
      if (filters.priceRange === "20k-50k" && (price < 20000 || price > 50000)) return false;
      if (filters.priceRange === "50k-100k" && (price < 50000 || price > 100000)) return false;
      if (filters.priceRange === "above-100k" && price <= 100000) return false;

      return true;
    });
  }, [baseCategoryProducts, filters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.variants[0].sellingPriceInr - b.variants[0].sellingPriceInr);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.variants[0].sellingPriceInr - a.variants[0].sellingPriceInr);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [filteredProducts, sortBy]);

  const activeCategoryTitle = category ? category.name : "All Music Equipment";

  // Breadcrumbs items
  const breadcrumbItems: { label: string; href?: string }[] = [
    { label: "Categories", href: "/categories" },
    { label: activeCategoryTitle, href: `/categories/${resolvedParams.slug}` },
  ];
  if (subCategoryParam) {
    breadcrumbItems.push({
      label: subCategoryParam.replace("-", " "),
    });
  }

  return (
    <div className="py-8 bg-canvas min-h-screen">
      <Container size="wide">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-4" />

        {/* Category Header Banner */}
        <div className="bg-white border border-border rounded-lg p-6 sm:p-8 mb-8 shadow-subtle">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-accent font-mono">
              Professional Audio Taxonomy
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
              {activeCategoryTitle}
            </h1>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              {category?.description || "Browse our complete catalog of professional music equipment."}
            </p>
          </div>

          {/* Subcategory Pills */}
          {category?.groups && category.groups.length > 0 && (
            <div className="mt-6 pt-5 border-t border-border-subtle flex flex-wrap gap-2">
              <Link
                href={`/categories/${category.slug}`}
                className={cn(
                  "text-xs px-3 py-1.5 rounded-md font-semibold transition-colors border",
                  !subCategoryParam
                    ? "bg-[#171717] text-white border-[#171717]"
                    : "bg-canvas text-text-secondary border-border hover:text-text-primary hover:bg-canvas-muted"
                )}
              >
                All {category.name}
              </Link>
              {category.groups.flatMap((g) => g.items).slice(0, 6).map((sub) => {
                const isSelected = subCategoryParam === sub.slug;
                return (
                  <Link
                    key={sub.id}
                    href={`/categories/${category.slug}?sub=${sub.slug}`}
                    className={cn(
                      "text-xs px-3 py-1.5 rounded-md font-semibold transition-colors border",
                      isSelected
                        ? "bg-accent text-white border-accent"
                        : "bg-canvas text-text-secondary border-border hover:text-text-primary hover:bg-canvas-muted"
                    )}
                  >
                    <span>{sub.name}</span>
                    {sub.itemCount && (
                      <span className="ml-1 opacity-70 font-mono text-[10px]">({sub.itemCount})</span>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 sticky top-28">
            <FilterSidebar
              currentFilters={filters}
              onFilterChange={setFilters}
              onClear={() => setFilters({ brands: [], priceRange: "all", inStockOnly: false })}
              totalMatches={sortedProducts.length}
            />
          </div>

          {/* Mobile Filter Toggle Drawer Button */}
          <div className="lg:hidden flex items-center justify-between gap-3 bg-white p-3.5 rounded-lg border border-border mb-4">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="inline-flex items-center gap-2 text-xs font-bold text-text-primary bg-canvas px-3 py-2 rounded-md border border-border"
            >
              <SlidersHorizontal size={14} className="text-accent" />
              <span>Filter ({sortedProducts.length} items)</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-text-muted">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold bg-canvas border border-border rounded-md px-2 py-1.5 text-text-primary"
              >
                <option value="featured">Featured Gear</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Mobile Filter Drawer Overlay */}
          {mobileFilterOpen && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden flex justify-end">
              <div className="w-full max-w-xs bg-white h-full p-4 overflow-y-auto animate-in slide-in-from-right-10 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
                  <h3 className="font-bold text-sm">Filter Gear</h3>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="text-text-muted hover:text-text-primary text-xs font-bold"
                  >
                    Close
                  </button>
                </div>
                <FilterSidebar
                  currentFilters={filters}
                  onFilterChange={(f) => {
                    setFilters(f);
                  }}
                  onClear={() => setFilters({ brands: [], priceRange: "all", inStockOnly: false })}
                  totalMatches={sortedProducts.length}
                />
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full mt-4 py-2.5 bg-accent text-white text-xs font-bold rounded-md"
                >
                  Show {sortedProducts.length} Results
                </button>
              </div>
            </div>
          )}

          {/* Product Listing Grid Area */}
          <div className="lg:col-span-9 space-y-4">
            {/* Top Toolbar */}
            <div className="hidden lg:flex items-center justify-between bg-white border border-border rounded-lg px-4 py-3 shadow-subtle">
              <div className="text-xs text-text-secondary">
                Showing <strong className="text-text-primary font-mono">{sortedProducts.length}</strong> verified models
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted flex items-center gap-1 font-mono">
                  <ArrowUpDown size={12} />
                  <span>Sort By:</span>
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs font-semibold bg-canvas hover:bg-canvas-muted border border-border rounded-md px-3 py-1.5 text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="featured">Featured Recommendations</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated by Engineers</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <EmptyState
                icon={Sliders}
                title="No gear matches your specific filter criteria"
                description="Try clearing some brand filters or expanding your price range to discover equivalent models in this category."
                actionLabel="Reset All Filters"
                onActionClick={() => setFilters({ brands: [], priceRange: "all", inStockOnly: false })}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
