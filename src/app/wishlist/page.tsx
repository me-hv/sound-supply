"use client";

import React from "react";
import Link from "next/link";
import { useCommerce } from "@/context/CommerceContext";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Heart, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { wishlistIds } = useCommerce();
  const savedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="py-8 bg-canvas min-h-screen">
      <Container size="wide">
        <Breadcrumbs items={[{ label: "Saved Gear" }]} className="mb-4" />

        <div className="bg-white border border-border rounded-xl p-6 sm:p-8 mb-8 shadow-subtle flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent font-mono mb-1">
              <Heart size={14} className="fill-accent text-accent" />
              <span>Personal Wishlist</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Saved Studio Gear
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary mt-1">
              {savedProducts.length > 0
                ? `You have saved ${savedProducts.length} items to your shortlist.`
                : "No gear currently saved in your wishlist."}
            </p>
          </div>
        </div>

        {savedProducts.length === 0 ? (
          <div className="bg-white border border-border rounded-xl p-12 text-center space-y-4 max-w-lg mx-auto">
            <Heart size={32} className="mx-auto text-text-muted" />
            <h2 className="text-lg font-bold text-text-primary">Your wishlist is empty</h2>
            <p className="text-xs text-text-secondary">
              Click the heart icon on any piece of gear to bookmark it for future studio sessions.
            </p>
            <div>
              <Link
                href="/categories/studio-recording"
                className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-white text-xs font-bold px-4 py-2.5 rounded-md transition-colors"
              >
                <span>Browse Gear</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {savedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
