"use client";

import React from "react";
import Link from "next/link";
import { useCommerce } from "@/context/CommerceContext";
import { PRODUCTS } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { formatInr } from "@/lib/utils";
import {
  ShoppingBag,
  Trash2,
  ShieldCheck,
  Truck,
  ArrowRight,
  ArrowLeft,
  CreditCard,
} from "lucide-react";

export default function CartPage() {
  const { cartItems, removeFromCart, cartCount } = useCommerce();

  // Hydrate cart item details
  const hydratedItems = cartItems
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      if (!product) return null;
      const variant =
        product.variants.find((v) => v.id === item.variantId) || product.variants[0];
      return {
        ...item,
        product,
        variant,
        subtotal: variant.sellingPriceInr * item.quantity,
      };
    })
    .filter(Boolean) as any[];

  const cartSubtotal = hydratedItems.reduce((acc, item) => acc + item.subtotal, 0);

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
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-accent"
          >
            <ArrowLeft size={14} />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {hydratedItems.length === 0 ? (
          <div className="bg-white border border-border rounded-xl p-12 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-canvas mx-auto flex items-center justify-center text-text-muted">
              <ShoppingBag size={24} />
            </div>
            <h2 className="text-lg font-bold text-text-primary">Your cart is empty</h2>
            <p className="text-xs text-text-secondary">
              Discover audio interfaces, studio monitors, dynamic microphones, and keyboards to build your sound.
            </p>
            <div>
              <Link
                href="/categories/studio-recording"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold px-5 py-2.5 rounded-md transition-colors"
              >
                <span>Browse Studio Recording</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Items List (lg:col-span-8) */}
            <div className="lg:col-span-8 bg-white border border-border rounded-xl divide-y divide-border-subtle shadow-subtle overflow-hidden">
              <div className="p-4 bg-canvas text-xs font-bold uppercase tracking-wider text-text-muted flex justify-between">
                <span>Hardware Unit</span>
                <span>Subtotal</span>
              </div>

              {hydratedItems.map((item) => (
                <div key={item.variantId} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-canvas rounded-lg border border-border-subtle p-1 flex-shrink-0">
                      <img
                        src={item.variant.images[0]}
                        alt={item.product.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-accent font-mono">
                        {item.product.brand.name}
                      </div>
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-bold text-sm text-text-primary hover:text-accent transition-colors block"
                      >
                        {item.product.title}
                      </Link>
                      <div className="text-xs text-text-muted mt-0.5">
                        Config: {item.variant.title} &bull; Qty: {item.quantity}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-border-subtle">
                    <div className="text-right">
                      <div className="text-sm font-bold font-mono text-text-primary">
                        {formatInr(item.subtotal)}
                      </div>
                      <div className="text-[11px] text-text-muted font-mono">
                        {formatInr(item.variant.sellingPriceInr)} each
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.variantId)}
                      className="text-text-muted hover:text-accent p-1.5 rounded"
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
                  <span className="font-mono font-bold text-text-primary">{formatInr(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Insured Express Shipping:</span>
                  <span className="text-emerald-700 font-bold">FREE (India Wide)</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Applicable GST (18%):</span>
                  <span className="text-text-muted">Included in item price</span>
                </div>
              </div>

              <div className="pt-3 border-t border-border-subtle flex justify-between items-baseline">
                <span className="font-bold text-sm text-text-primary">Estimated Total:</span>
                <span className="font-extrabold text-2xl font-mono text-text-primary">
                  {formatInr(cartSubtotal)}
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
                  <ShieldCheck size={14} className="text-accent flex-shrink-0" />
                  <span>Authorized Indian distributor serial guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={14} className="text-accent flex-shrink-0" />
                  <span>Bluedart Air insured packaging with tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard size={14} className="text-accent flex-shrink-0" />
                  <span>0% EMI support on all major Indian banks</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
