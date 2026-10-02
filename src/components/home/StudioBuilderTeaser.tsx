"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  Wrench,
  ArrowRight,
  CheckCircle2,
  Mic,
  Sliders,
  Headphones,
  Volume2,
  Cable,
} from "lucide-react";
import { cn, formatInr } from "@/lib/utils";

interface SetupPlan {
  id: string;
  name: string;
  estimatedTotalInr: number;
  description: string;
  slots: {
    category: string;
    icon: typeof Mic;
    gear: string;
    specBadge: string;
  }[];
}

const PLANS: SetupPlan[] = [
  {
    id: "bedroom-studio",
    name: "Bedroom Studio",
    estimatedTotalInr: 38480,
    description: "Compact acoustic footprint optimized for singers, voiceover creators, and songwriting in untreated spaces.",
    slots: [
      { category: "Microphone", icon: Mic, gear: "Shure SM58 Cardioid Dynamic Mic", specBadge: "Balanced XLR" },
      { category: "Audio Interface", icon: Sliders, gear: "Focusrite Scarlett 2i2 Gen 4", specBadge: "69dB Clean Gain" },
      { category: "Headphones", icon: Headphones, gear: "Audio-Technica ATH-M40x Studio Cans", specBadge: "35Ω Impedance" },
      { category: "Monitors", icon: Volume2, gear: "Yamaha HS5 5\" Active Speakers (Pair)", specBadge: "70W Bi-Amped" },
      { category: "Accessories", icon: Cable, gear: "Balanced Mogami XLR & Desktop Isolation Pads", specBadge: "Noise Shielded" },
    ],
  },
  {
    id: "producer-setup",
    name: "Producer Setup",
    estimatedTotalInr: 58970,
    description: "Geared for beatmaking, EDM production, and sequencing with tactile keys, accurate bass response, and low latency.",
    slots: [
      { category: "Microphone", icon: Mic, gear: "Audio-Technica AT2020 Cardioid Condenser", specBadge: "Requires +48V" },
      { category: "Audio Interface", icon: Sliders, gear: "Focusrite Scarlett 2i2 Gen 4 (USB-C)", specBadge: "120dB Dynamic Range" },
      { category: "Headphones", icon: Headphones, gear: "Audio-Technica ATH-M50x Closed-Back", specBadge: "45mm Drivers" },
      { category: "Monitors", icon: Volume2, gear: "KRK ROKIT 5 G4 DSP Controlled (Pair)", specBadge: "Graphic EQ" },
      { category: "Accessories", icon: Cable, gear: "Arturia KeyStep 37 MIDI Controller + USB-C Cables", specBadge: "MIDI / CV-Gate" },
    ],
  },
  {
    id: "vocal-recording",
    name: "Vocal Recording",
    estimatedTotalInr: 68480,
    description: "Broadcast-grade vocal chain engineered to reject background noise, room reflections, and electromagnetic interference.",
    slots: [
      { category: "Microphone", icon: Mic, gear: "Shure SM7B Cardioid Dynamic Broadcast Mic", specBadge: "Humbucking Coil" },
      { category: "Audio Interface", icon: Sliders, gear: "Focusrite Scarlett 2i2 Gen 4", specBadge: "69dB Ultra-Clean Gain" },
      { category: "Headphones", icon: Headphones, gear: "Audio-Technica ATH-M50x Reference Cans", specBadge: "High Isolation" },
      { category: "Monitors", icon: Volume2, gear: "Yamaha HS5 Nearfield Active Monitors", specBadge: "Flat Response" },
      { category: "Accessories", icon: Cable, gear: "Gator Studio Boom Arm + Dual-Mesh Pop Filter", specBadge: "Vibration Dampened" },
    ],
  },
  {
    id: "home-band",
    name: "Home Band",
    estimatedTotalInr: 112450,
    description: "Multi-channel tracking solution for recording acoustic drums, dual electric guitars, stereo keys, and vocals concurrently.",
    slots: [
      { category: "Microphone", icon: Mic, gear: "Matched Small Condenser Pair + Dynamic Vocal Mics", specBadge: "Multi-Transducer" },
      { category: "Audio Interface", icon: Sliders, gear: "Universal Audio Apollo Twin X USB-C / Thunderbolt", specBadge: "DSP Realtime Tracking" },
      { category: "Headphones", icon: Headphones, gear: "Multi-Station Headphone Distribution Amp + Cans", specBadge: "4 Independent Feeds" },
      { category: "Monitors", icon: Volume2, gear: "Yamaha HS7 6.5\" Active Monitors", specBadge: "95W Power" },
      { category: "Accessories", icon: Cable, gear: "8-Way Balanced Snake Cable & Corner Bass Traps", specBadge: "Acoustic Tamed" },
    ],
  },
  {
    id: "professional",
    name: "Professional",
    estimatedTotalInr: 218900,
    description: "Commercial reference studio tier with master-grade conversion, analog preamplification, and mastering-grade acoustic translation.",
    slots: [
      { category: "Microphone", icon: Mic, gear: "Shure SM7B + Large-Diaphragm Multi-Pattern Condenser", specBadge: "Studio Gold Standard" },
      { category: "Audio Interface", icon: Sliders, gear: "Universal Audio Apollo Twin X DUO Heritage Edition", specBadge: "Elite Converters" },
      { category: "Headphones", icon: Headphones, gear: "Sennheiser Open-Back Reference Mixing Headphones", specBadge: "300Ω Calibrated" },
      { category: "Monitors", icon: Volume2, gear: "Yamaha HS8 Active 8\" Bi-Amped Reference Speakers", specBadge: "38Hz Deep Bass" },
      { category: "Accessories", icon: Cable, gear: "Mogami Gold Studio Balanced Cabling & Acoustic Diffusers", specBadge: "Mastering Grade" },
    ],
  },
];

export function StudioBuilderTeaser() {
  const [activePlanId, setActivePlanId] = useState("bedroom-studio");
  const activePlan = PLANS.find((p) => p.id === activePlanId) || PLANS[0];

  return (
    <section className="py-14 bg-white border-b border-border">
      <Container size="wide">
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent mb-1 font-mono">
            <Wrench size={13} className="text-accent" />
            <span>Interactive Studio Builder</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            Harmonized Signal Chains
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Eliminate gear mismatch. Select your creative discipline to preview a complete, electrically-compatible equipment chain.
          </p>
        </div>

        {/* Step 1: WHAT ARE YOU BUILDING? */}
        <div className="space-y-3 mb-6">
          <div className="text-[11px] font-bold uppercase tracking-wider text-text-muted font-mono">
            What Are You Building?
          </div>
          <div className="flex flex-wrap gap-2">
            {PLANS.map((plan) => {
              const isSelected = activePlanId === plan.id;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setActivePlanId(plan.id)}
                  className={cn(
                    "px-4 py-2 text-xs font-semibold rounded-md transition-all border shadow-subtle active:scale-[0.98]",
                    isSelected
                      ? "bg-[#171717] text-white border-[#171717]"
                      : "bg-canvas text-text-secondary border-border hover:bg-canvas-muted hover:text-text-primary"
                  )}
                >
                  {plan.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: YOUR SETUP CONTAINER */}
        <div className="bg-canvas border border-border rounded-xl p-5 sm:p-7 shadow-subtle">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-border gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-text-primary font-mono flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-700" />
                <span>Your Setup &bull; {activePlan.name}</span>
              </div>
              <p className="text-xs text-text-secondary mt-0.5 max-w-xl">
                {activePlan.description}
              </p>
            </div>

            <div className="text-left lg:text-right">
              <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted font-mono">
                Estimated Total
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-text-primary font-mono tabular-nums">
                {formatInr(activePlan.estimatedTotalInr)}
              </div>
            </div>
          </div>

          {/* 5 Hardware Slots */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 my-5">
            {activePlan.slots.map((slot) => {
              const Icon = slot.icon;
              return (
                <div
                  key={slot.category}
                  className="bg-white border border-border-subtle hover:border-border rounded-lg p-3.5 flex flex-col justify-between transition-colors shadow-subtle"
                >
                  <div>
                    <div className="flex items-center justify-between text-text-muted mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider font-mono">
                        {slot.category}
                      </span>
                      <Icon size={14} className="text-accent" />
                    </div>
                    <div className="text-xs font-semibold text-text-primary leading-snug">
                      {slot.gear}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-border-subtle flex items-center justify-between">
                    <span className="text-[10px] bg-canvas text-text-secondary px-1.5 py-0.5 rounded font-mono border border-border-subtle">
                      {slot.specBadge}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-text-muted">
              All components in this signal chain are impedance-matched and include necessary connection cables.
            </div>

            <Link
              href="/studio-builder"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold px-5 py-2.5 rounded-md transition-colors shadow-subtle flex-shrink-0"
            >
              <span>Explore Setup in Studio Builder</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
