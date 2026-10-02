"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PRODUCTS } from "@/data/products";
import { STUDIO_PRESETS, StudioBuilderPreset } from "@/data/presets";
import { formatInr } from "@/lib/utils";
import { useCommerce } from "@/context/CommerceContext";
import {
  Wrench,
  CheckCircle2,
  Mic,
  Sliders,
  Headphones,
  Speaker,
  Piano,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const GOALS = [
  { id: "music-production", title: "Music Production & Beats", icon: Piano, desc: "In-the-box sequencing, synth keys & low-end monitoring" },
  { id: "vocal-recording", title: "Singing & Voiceover", icon: Mic, desc: "Broadcast vocal capture with untreated room rejection" },
  { id: "podcast", title: "Podcasting & Streaming", icon: Headphones, desc: "Zero-latency voice clarity & USB-C/XLR flexibility" },
  { id: "guitar-recording", title: "Guitar & Bass Studio", icon: Sliders, desc: "High-headroom DI inputs & flat-response monitors" },
  { id: "full-studio", title: "Commercial Studio", icon: Speaker, desc: "Flagship conversion, DSP hardware & dual reference monitoring" },
];

const BUDGET_TIERS = [
  { id: "b-25k", label: "₹25,000", max: 35000 },
  { id: "b-50k", label: "₹50,000", max: 65000 },
  { id: "b-1l", label: "₹1,00,000", max: 120000 },
  { id: "b-2l", label: "₹2,00,000+", max: 250000 },
];

const COMPONENT_REQUIREMENTS = [
  { id: "req-interface", label: "Audio Interface", required: true },
  { id: "req-mic", label: "Vocal Microphone", required: false },
  { id: "req-headphones", label: "Studio Headphones", required: true },
  { id: "req-monitors", label: "Reference Monitors", required: false },
  { id: "req-midi", label: "MIDI Keyboard Controller", required: false },
  { id: "req-acoustics", label: "Acoustic Treatment & Cabling", required: false },
];

export default function StudioBuilderPage() {
  const { addToCart } = useCommerce();

  const [selectedGoal, setSelectedGoal] = useState("music-production");
  const [selectedBudget, setSelectedBudget] = useState("b-50k");
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([
    "req-interface",
    "req-headphones",
    "req-midi",
  ]);

  const [bundleAdded, setBundleAdded] = useState(false);

  // Find matching preset or fallback
  const currentPreset: StudioBuilderPreset =
    STUDIO_PRESETS.find((p) => p.goalId === selectedGoal && p.budgetId === selectedBudget) ||
    STUDIO_PRESETS.find((p) => p.goalId === selectedGoal) ||
    STUDIO_PRESETS[0];

  const matchedProducts = currentPreset.productIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as typeof PRODUCTS;

  const handleRequirementToggle = (reqId: string) => {
    setSelectedRequirements((prev) =>
      prev.includes(reqId) ? prev.filter((id) => id !== reqId) : [...prev, reqId]
    );
  };

  const handleAddBundleToCart = () => {
    matchedProducts.forEach((p) => {
      addToCart(p.id, p.defaultVariantId, 1);
    });
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2000);
  };

  return (
    <div className="py-8 bg-canvas min-h-screen">
      <Container size="wide">
        <Breadcrumbs items={[{ label: "Interactive Studio Builder" }]} className="mb-4" />

        {/* Page Banner */}
        <div className="bg-white border border-border rounded-xl p-6 sm:p-8 mb-8 shadow-subtle">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent font-mono">
              <Wrench size={14} />
              <span>Studio Hardware Harmonizer</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
              Interactive Studio Setup Builder
            </h1>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Define your musical objectives and investment target. Sound Supply pairs verified audio interfaces, microphones, monitors, and cables that guarantee electrical compatibility and zero bottlenecking.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Configuration Form (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Goal */}
            <div className="bg-white border border-border rounded-xl p-6 shadow-subtle space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center font-mono">
                  1
                </span>
                <h3 className="font-bold text-base text-text-primary">
                  What is your primary production goal?
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GOALS.map((goal) => {
                  const Icon = goal.icon;
                  const isSelected = selectedGoal === goal.id;
                  return (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => setSelectedGoal(goal.id)}
                      className={cn(
                        "p-4 rounded-lg border text-left transition-all flex items-start gap-3",
                        isSelected
                          ? "border-accent bg-accent-subtle/40 ring-1 ring-accent text-text-primary"
                          : "border-border hover:border-border-strong bg-canvas text-text-secondary hover:text-text-primary"
                      )}
                    >
                      <Icon
                        size={20}
                        className={cn("mt-0.5 flex-shrink-0", isSelected ? "text-accent" : "text-text-muted")}
                      />
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-text-primary">
                          {goal.title}
                        </div>
                        <div className="text-[11px] text-text-muted mt-0.5 leading-snug">
                          {goal.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Target Budget */}
            <div className="bg-white border border-border rounded-xl p-6 shadow-subtle space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center font-mono">
                  2
                </span>
                <h3 className="font-bold text-base text-text-primary">
                  Select your estimated gear budget:
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {BUDGET_TIERS.map((tier) => {
                  const isSelected = selectedBudget === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedBudget(tier.id)}
                      className={cn(
                        "py-3 px-4 rounded-lg border text-center font-mono text-sm font-bold transition-all",
                        isSelected
                          ? "border-accent bg-accent text-white shadow-subtle"
                          : "border-border hover:border-border-strong bg-canvas text-text-primary"
                      )}
                    >
                      {tier.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Required Components */}
            <div className="bg-white border border-border rounded-xl p-6 shadow-subtle space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center font-mono">
                  3
                </span>
                <h3 className="font-bold text-base text-text-primary">
                  Included setup elements:
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {COMPONENT_REQUIREMENTS.map((req) => {
                  const isChecked = selectedRequirements.includes(req.id);
                  return (
                    <label
                      key={req.id}
                      className={cn(
                        "p-3 rounded-lg border flex items-center gap-2.5 cursor-pointer text-xs transition-colors",
                        isChecked
                          ? "bg-white border-border-strong text-text-primary font-semibold"
                          : "bg-canvas border-border text-text-muted hover:text-text-secondary"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleRequirementToggle(req.id)}
                        className="rounded border-border text-accent focus:ring-accent w-4 h-4"
                      />
                      <span>{req.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Harmonized Bundle Preview (lg:col-span-5) */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <div className="bg-[#171717] text-white border border-[#2F2F2D] rounded-xl p-6 shadow-modal">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#2C2C2A]">
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-accent font-bold">
                    Harmonized Signal Chain
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {currentPreset.title}
                  </h3>
                </div>

                <span className="text-xs bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 px-2 py-0.5 rounded font-mono">
                  100% Compatible
                </span>
              </div>

              {/* Hardware items in chain */}
              <div className="py-4 space-y-3">
                <div className="text-xs uppercase font-mono tracking-wider text-gray-400">
                  Included Audio Hardware ({matchedProducts.length} items)
                </div>

                {matchedProducts.map((p) => {
                  const variant = p.variants[0];
                  return (
                    <div
                      key={p.id}
                      className="flex items-center gap-3 p-2.5 bg-[#222220] border border-[#333330] rounded-lg"
                    >
                      <div className="w-10 h-10 bg-white rounded p-1 flex-shrink-0">
                        <img
                          src={variant.images[0]}
                          alt={p.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-accent font-bold uppercase">
                          {p.brand.name}
                        </div>
                        <div className="text-xs font-semibold text-white truncate">
                          {p.title}
                        </div>
                      </div>
                      <div className="text-xs font-mono font-bold text-gray-200">
                        {formatInr(variant.sellingPriceInr)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Engineering Highlights */}
              <div className="py-3 border-t border-[#2C2C2A] space-y-1.5 text-xs text-gray-300">
                {currentPreset.highlightFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-accent flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Total Price & Bundle Savings */}
              <div className="pt-4 border-t border-[#2C2C2A] space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-gray-400">Total Hardware MRP:</span>
                  <span className="text-xs text-gray-400 line-through font-mono">
                    {formatInr(currentPreset.totalMrpInr)}
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-bold text-accent">Package Bundle Savings:</span>
                  <span className="text-xs font-bold text-accent font-mono">
                    - {formatInr(currentPreset.savingsInr)} ({(currentPreset.savingsInr / currentPreset.totalMrpInr * 100).toFixed(0)}% Off)
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-2 border-t border-[#2C2C2A]">
                  <span className="text-sm font-bold text-white">Harmonized Bundle Price:</span>
                  <span className="text-2xl font-extrabold text-white font-mono">
                    {formatInr(currentPreset.bundlePriceInr)}
                  </span>
                </div>

                <div className="text-[11px] text-gray-400">
                  Includes Free Express Insured Transit across India and official warranties.
                </div>
              </div>

              {/* CTA Add to Cart */}
              <div className="mt-5 space-y-2">
                <button
                  type="button"
                  onClick={handleAddBundleToCart}
                  className={cn(
                    "w-full py-3.5 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-subtle",
                    bundleAdded
                      ? "bg-emerald-600 text-white"
                      : "bg-accent hover:bg-accent-hover text-white"
                  )}
                >
                  {bundleAdded ? (
                    <>
                      <CheckCircle2 size={16} />
                      <span>Added Complete Setup to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      <span>Add Complete Studio Setup to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
