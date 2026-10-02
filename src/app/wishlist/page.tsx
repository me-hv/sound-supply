"use client";

import React from "react";
import Link from "next/link";
import { useCommerce } from "@/context/CommerceContext";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { EmptyState } from "@/components/ui/EmptyState";
import { Heart } from "lucide-react";

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
          <EmptyState
            icon={Heart}
            title="Your saved gear shortlist is empty"
            description="Click the heart icon on any audio interface, microphone, or instrument to bookmark it for future comparison."
            actionLabel="Discover Pro Audio Gear"
            actionHref="/categories/studio-recording"
          />
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
