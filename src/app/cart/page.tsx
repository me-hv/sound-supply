"use client";

import React from "react";
import Link from "next/link";
import { useCommerce } from "@/context/CommerceContext";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatInr } from "@/lib/currency";
import {
  ShoppingBag,
  Trash2,
  ShieldCheck,
  Truck,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Plus,
  Minus,
} from "lucide-react";
import { SITE_POLICIES } from "@/config/siteConfig";

export default function CartPage() {
  const { validatedCartItems, cartSummary, removeFromCart, updateCartQuantity, cartCount } = useCommerce();

  const subtotalPaise = cartSummary?.subtotalPaise || 0;
  const shippingPaise = cartSummary?.estimatedShippingPaise || 0;
  const totalPaise = cartSummary?.totalPaise || 0;

  return (
    <div className="py-8 bg-canvas min-h-screen">
      <Container size="wide">
        <Breadcrumbs items={[{ label: "Studio Cart" }]} className="mb-4" />

        <div className="bg-white border border-border rounded-xl p-6 sm:p-8 mb-8 shadow-subtle flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Studio Equipment Cart
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary mt-1">
              {cartCount > 0
                ? `${cartCount} items selected with insured express transit across India.`
                : "Your cart is currently empty."}
            </p>
          </div>

          <Link
            href="/categories/studio-recording"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-accent transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {validatedCartItems.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Your studio cart is currently empty"
            description="Explore professional recording interfaces, reference monitors, microphones, and studio keyboards to begin building your sound."
            actionLabel="Discover Studio Gear"
            actionHref="/categories/studio-recording"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Items List (lg:col-span-8) */}
            <div className="lg:col-span-8 bg-white border border-border rounded-xl divide-y divide-border-subtle shadow-subtle overflow-hidden">
              <div className="p-4 bg-canvas text-xs font-bold uppercase tracking-wider text-text-muted flex justify-between">
                <span>Hardware Unit & Configuration</span>
                <span>Subtotal</span>
              </div>

              {validatedCartItems.map((item) => (
                <div key={item.variantId} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-canvas rounded-lg border border-border-subtle p-1 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.productTitle}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-accent font-mono">
                        {item.brandName}
                      </div>
                      <Link
                        href={`/products/${item.productSlug}`}
                        className="font-bold text-sm text-text-primary hover:text-accent transition-colors block"
                      >
                        {item.productTitle}
                      </Link>
                      <div className="text-xs text-text-muted mt-0.5">
                        Config: {item.variantTitle} &bull; SKU: <span className="font-mono text-[11px]">{item.sku}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-border-subtle">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-border rounded-lg bg-surface">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.variantId, item.quantity - 1)}
                        className="p-1.5 text-text-muted hover:text-text-primary transition-colors"
                        title="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center text-xs font-mono font-bold text-text-primary">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.variantId, item.quantity + 1)}
                        className="p-1.5 text-text-muted hover:text-text-primary transition-colors"
                        title="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <div className="text-right min-w-[90px]">
                      <div className="text-sm font-bold font-mono text-text-primary">
                        {formatInr(item.totalPricePaise, { isPaise: true })}
                      </div>
                      <div className="text-[11px] text-text-muted font-mono">
                        {formatInr(item.unitPricePaise, { isPaise: true })} each
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.variantId)}
                      className="text-text-muted hover:text-accent p-1.5 rounded transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Summary Card (lg:col-span-4) */}
            <div className="lg:col-span-4 bg-white border border-border rounded-xl p-6 shadow-subtle space-y-4">
              <h3 className="font-bold text-base text-text-primary pb-3 border-b border-border-subtle">
                Order Summary
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-text-secondary">
                  <span>Hardware Subtotal:</span>
                  <span className="font-mono font-bold text-text-primary">
                    {formatInr(subtotalPaise, { isPaise: true })}
                  </span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Insured Express Shipping:</span>
                  <span className="text-emerald-700 font-bold">
                    {shippingPaise === 0 ? "FREE (India Wide)" : formatInr(shippingPaise, { isPaise: true })}
                  </span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Applicable GST (18%):</span>
                  <span className="text-text-muted">Included in item price</span>
                </div>
              </div>

              <div className="pt-3 border-t border-border-subtle flex justify-between items-baseline">
                <span className="font-bold text-sm text-text-primary">Estimated Total:</span>
                <span className="font-extrabold text-2xl font-mono text-text-primary">
                  {formatInr(totalPaise, { isPaise: true })}
                </span>
              </div>

              <button
                type="button"
                onClick={() => alert("Checkout integration will be connected with Supabase in backend phase.")}
                className="w-full py-3.5 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-subtle"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight size={14} />
              </button>

              <div className="pt-4 border-t border-border-subtle space-y-2 text-[11px] text-text-muted">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-emerald-700 flex-shrink-0" />
                  <span>{SITE_POLICIES.authenticity.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={14} className="text-accent flex-shrink-0" />
                  <span>{SITE_POLICIES.transit.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard size={14} className="text-text-muted flex-shrink-0" />
                  <span>{SITE_POLICIES.financing.label}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
