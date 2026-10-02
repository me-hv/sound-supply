"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { RatingStars } from "@/components/ui/RatingStars";
import { Badge } from "@/components/ui/Badge";
import { useCommerce } from "@/context/CommerceContext";
import { formatInr, calculateDiscountPercent } from "@/lib/utils";
import {
  Heart,
  Scale,
  ShoppingBag,
  Check,
  Zap,
} from "lucide-react";
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

  // Key spec tags to show on retail cards
  const highlightSpecs = product.specifications
    .filter((s) => s.highlight)
    .slice(0, 2);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, variant.id, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
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
      {/* Top action row: Badges & Wishlist/Compare */}
      <div>
        <div className="flex items-start justify-between gap-1 mb-2">
          {/* Status Badges */}
          <div className="flex flex-wrap gap-1">
            {discountPercent > 0 && (
              <Badge variant="accent" size="sm">
                Save {discountPercent}%
              </Badge>
            )}
            {product.tags.includes("bestseller") && (
              <Badge variant="default" size="sm" className="font-semibold text-text-primary">
                Bestseller
              </Badge>
            )}
            {product.tags.includes("pro-choice") && (
              <Badge variant="brand" size="sm">
                Pro Gear
              </Badge>
            )}
          </div>

          {/* Quick Action Icons */}
          <div className="flex items-center gap-1">
            {showCompare && (
              <button
                type="button"
                onClick={handleToggleCompare}
                className={cn(
                  "p-1.5 rounded-md transition-colors text-text-muted hover:text-text-primary hover:bg-canvas",
                  inCompare && "text-accent bg-accent-subtle font-bold"
                )}
                title={inCompare ? "Remove from comparison" : "Compare technical specs"}
                aria-label="Compare"
              >
                <Scale size={15} />
              </button>
            )}

            <button
              type="button"
              onClick={handleToggleWishlist}
              className={cn(
                "p-1.5 rounded-md transition-colors text-text-muted hover:text-text-primary hover:bg-canvas",
                inWishlist && "text-accent fill-accent"
              )}
              title={inWishlist ? "Saved in wishlist" : "Add to wishlist"}
              aria-label="Wishlist"
            >
              <Heart size={15} className={inWishlist ? "fill-accent text-accent" : ""} />
            </button>
          </div>
        </div>

        {/* Product Image Link */}
        <Link
          href={`/products/${product.slug}`}
          className="block relative aspect-square bg-[#FBFBFA] rounded-md overflow-hidden mb-3 p-3 flex items-center justify-center border border-border-subtle group-hover:border-border transition-colors"
        >
          <img
            src={variant.images[0]}
            alt={product.title}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {variant.stockStatus === "low-stock" && (
            <div className="absolute bottom-2 left-2 bg-amber-500/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
              Only {variant.stockCount} left
            </div>
          )}
        </Link>

        {/* Brand & Category Breadcrumb */}
        <div className="flex items-center gap-1.5 mb-1 text-[11px] font-bold uppercase tracking-wider text-text-muted">
          <Link
            href={`/brands/${product.brand.slug}`}
            className="text-text-secondary hover:text-accent transition-colors"
          >
            {product.brand.name}
          </Link>
          <span>&bull;</span>
          <span className="font-normal lowercase first-letter:uppercase text-text-muted truncate">
            {product.subCategorySlug.replace("-", " ")}
          </span>
        </div>

        {/* Product Title */}
        <Link
          href={`/products/${product.slug}`}
          className="block group-hover:text-accent transition-colors"
        >
          <h3 className="font-semibold text-sm text-text-primary line-clamp-2 leading-snug">
            {product.title}
          </h3>
        </Link>

        {/* Short Descriptor / Subtitle */}
        <p className="text-xs text-text-secondary line-clamp-1 mt-1 font-normal">
          {product.subtitle}
        </p>

        {/* Key Highlight Specs Pills */}
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

        {/* Rating Block */}
        <div className="mt-2.5">
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
        </div>
      </div>

      {/* Bottom Commerce Block */}
      <div className="mt-4 pt-3 border-t border-border-subtle">
        {/* Pricing & Savings */}
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

          {/* Stock state */}
          <div className="text-[11px] font-semibold flex items-center gap-1">
            {variant.stockStatus === "in-stock" && (
              <span className="text-emerald-700 flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                In Stock
              </span>
            )}
            {variant.stockStatus === "low-stock" && (
              <span className="text-amber-700 flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block" />
                Low Stock
              </span>
            )}
          </div>
        </div>

        {/* EMI Hook */}
        <div className="mt-1 flex items-center justify-between text-[11px] text-text-muted">
          <span>EMI from <strong className="text-text-secondary font-mono">{formatInr(product.emiStartingInr)}/mo</strong></span>
          <span className="text-emerald-700 font-medium">Free Delivery</span>
        </div>

        {/* Add to Cart button */}
        <div className="mt-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className={cn(
              "w-full py-2 px-3 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-all",
              addedAnimation
                ? "bg-emerald-700 text-white"
                : "bg-[#171717] text-white hover:bg-accent hover:text-white"
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
      </div>
    </div>
  );
}
