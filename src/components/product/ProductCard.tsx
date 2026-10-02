"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { RatingStars } from "@/components/ui/RatingStars";
import { Badge } from "@/components/ui/Badge";
import { useCommerce } from "@/context/CommerceContext";
import { formatInr, calculateDiscountPercent } from "@/lib/utils";
import { Heart, Scale, ShoppingBag, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  variantIndex?: number;
  className?: string;
  showCompare?: boolean;
}

export function ProductCard({
  product,
  variantIndex = 0,
  className,
  showCompare = true,
}: ProductCardProps) {
  const {
    addToCompare,
    isInCompare,
    toggleWishlist,
    isInWishlist,
    addToCart,
  } = useCommerce();

  const [addedAnimation, setAddedAnimation] = useState(false);

  // Active variant (defaults to first variant or selected index)
  const variant = product.variants[variantIndex] || product.variants[0];
  const discountPercent = calculateDiscountPercent(variant.mrpInr, variant.sellingPriceInr);
  const inCompare = isInCompare(product.id);
  const inWishlist = isInWishlist(product.id);

  // 2 to 3 selective high-relevance technical spec pills
  const highlightSpecs = product.specifications
    .filter((s) => s.highlight)
    .slice(0, 3);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, variant.id, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCompare(product.id);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      className={cn(
        "group relative bg-white border border-border rounded-lg p-3.5 flex flex-col justify-between transition-all duration-200 hover:border-border-strong hover:shadow-card hover:-translate-y-0.5",
        inCompare && "border-accent ring-1 ring-accent",
        className
      )}
    >
      <div>
        {/* 1. BRAND (Small uppercase header) */}
        <div className="flex items-center justify-between gap-1 mb-1.5">
          <Link
            href={`/brands/${product.brand.slug}`}
            className="text-[11px] font-bold uppercase tracking-wider text-text-muted hover:text-accent transition-colors font-mono"
          >
            {product.brand.name}
          </Link>

          {/* Quick status badge if on sale or pro */}
          {discountPercent > 0 ? (
            <span className="text-[10px] font-bold text-accent bg-accent-subtle px-1.5 py-0.5 rounded font-mono">
              Save {discountPercent}%
            </span>
          ) : product.tags.includes("bestseller") ? (
            <span className="text-[10px] font-bold text-text-primary bg-canvas px-1.5 py-0.5 rounded border border-border-subtle">
              Bestseller
            </span>
          ) : null}
        </div>

        {/* 2. PRODUCT IMAGE */}
        <Link
          href={`/products/${product.slug}`}
          className="block relative aspect-square bg-[#FBFBFA] rounded-md overflow-hidden p-3 flex items-center justify-center border border-border-subtle group-hover:border-border transition-colors"
        >
          <img
            src={variant.images[0]}
            alt={product.title}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {variant.stockStatus === "low-stock" && (
            <div className="absolute bottom-2 left-2 bg-amber-600/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
              Only {variant.stockCount} left
            </div>
          )}
        </Link>

        {/* 3. PRODUCT NAME */}
        <div className="mt-3">
          <Link
            href={`/products/${product.slug}`}
            className="block group-hover:text-accent transition-colors"
          >
            <h3 className="font-semibold text-sm text-text-primary line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </Link>
          <p className="text-xs text-text-secondary line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* 4. STARS + COUNT */}
        <div className="mt-2 flex items-center gap-1.5">
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
        </div>

        {/* 5. SELECTIVE TECH SPECS PILLS */}
        {highlightSpecs.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1">
            {highlightSpecs.map((spec) => (
              <span
                key={spec.label}
                className="inline-flex items-center text-[10px] bg-canvas text-text-secondary px-2 py-0.5 rounded border border-border-subtle font-mono"
              >
                <span className="text-text-muted mr-1">{spec.label}:</span>
                <span className="font-semibold text-text-primary">{spec.value}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 6. COMMERCE ACTION BLOCK */}
      <div className="mt-3.5 pt-3 border-t border-border-subtle">
        {/* PRICE + MRP + SAVINGS */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-bold text-text-primary font-mono tabular-nums">
              {formatInr(variant.sellingPriceInr)}
            </span>
            {variant.mrpInr > variant.sellingPriceInr && (
              <span className="text-xs text-text-muted line-through font-mono">
                {formatInr(variant.mrpInr)}
              </span>
            )}
          </div>

          {/* STOCK STATUS (● In Stock) */}
          <div className="text-[11px] font-semibold flex items-center gap-1">
            {variant.stockStatus === "in-stock" && (
              <span className="text-emerald-700 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                In Stock
              </span>
            )}
            {variant.stockStatus === "low-stock" && (
              <span className="text-amber-700 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block" />
                Low Stock
              </span>
            )}
            {variant.stockStatus === "pre-order" && (
              <span className="text-blue-700 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                Pre-Order
              </span>
            )}
          </div>
        </div>

        {/* 7. [ ADD TO CART ] BUTTON */}
        <div className="mt-2.5">
          <button
            type="button"
            onClick={handleAddToCart}
            className={cn(
              "w-full py-2 px-3 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-all shadow-subtle active:scale-[0.98]",
              addedAnimation
                ? "bg-emerald-700 text-white"
                : "bg-[#171717] hover:bg-accent text-white"
            )}
          >
            {addedAnimation ? (
              <>
                <Check size={14} className="stroke-[3]" />
                <span>Added to Studio Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>

        {/* 8. WISHLIST & COMPARE ROW (Below Add to Cart) */}
        <div className="mt-2 pt-2 border-t border-border-subtle flex items-center justify-between text-xs text-text-muted">
          <button
            type="button"
            onClick={handleToggleWishlist}
            className={cn(
              "inline-flex items-center gap-1 text-[11px] font-medium hover:text-text-primary transition-colors py-0.5",
              inWishlist && "text-accent font-semibold"
            )}
          >
            <Heart
              size={13}
              className={inWishlist ? "fill-accent text-accent" : "text-text-muted"}
            />
            <span>{inWishlist ? "Saved" : "Save"}</span>
          </button>

          {showCompare && (
            <button
              type="button"
              onClick={handleToggleCompare}
              className={cn(
                "inline-flex items-center gap-1 text-[11px] font-medium hover:text-text-primary transition-colors py-0.5",
                inCompare && "text-accent font-semibold"
              )}
            >
              <Scale size={13} className={inCompare ? "text-accent" : "text-text-muted"} />
              <span>{inCompare ? "In Compare" : "Compare"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
