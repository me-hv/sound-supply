"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Wrench, ArrowRight, CheckCircle2, Sparkles, Sliders } from "lucide-react";
import { cn } from "@/lib/utils";

const STUDIO_SETUPS = [
  {
    id: "beginner",
    title: "Beginner Studio",
    target: "Singers & Songwriters",
    budgetRange: "₹25,000 – ₹45,000",
    description: "The zero-friction starting point. High-quality 2-channel audio interface, flat-response dynamic microphone, closed-back headphones, and DAW software bundle.",
    gearPicks: [
      "Focusrite Scarlett Solo / 2i2 Gen 4",
      "Audio-Technica ATH-M40x Cans",
      "Shure PGA58 / SM58 Dynamic Mic",
      "Heavy-duty boom stand & XLR cable",
    ],
    recommendedFor: "Solo vocalists, acoustic guitarists, voiceover newcomers",
  },
  {
    id: "producer",
    title: "Producer Setup",
    target: "Beatmakers & Electronic Artists",
    budgetRange: "₹45,000 – ₹75,000",
    description: "Optimized for in-the-box sequencing, synth leads, and deep low-frequency translation without ear fatigue.",
    gearPicks: [
      "Arturia KeyStep 37 / Minilab 3",
      "Audio-Technica ATH-M50x Reference Headphones",
      "KRK ROKIT 5 G4 / Yamaha HS5 Monitors",
      "Focusrite Scarlett 2i2 USB-C Interface",
    ],
    recommendedFor: "Hip-hop producers, EDM composers, synth sound designers",
  },
  {
    id: "vocal",
    title: "Vocal Recording Setup",
    target: "Podcasters & Commercial VO",
    budgetRange: "₹65,000 – ₹1,10,000",
    description: "Tailored to conquer untreated room reverb with electromagnetic hum-shielded broadcast mics and ultra-high-gain clean preamps.",
    gearPicks: [
      "Shure SM7B or SM7dB Dynamic Broadcast Mic",
      "Focusrite Scarlett 2i2 4th Gen (69dB clean gain)",
      "Audio-Technica ATH-M50x Closed-Back Cans",
      "Gator Frameworks Studio Boom Arm & Dual Pop Filter",
    ],
    recommendedFor: "Singers, podcasters, voice actors in untreated bedrooms",
  },
  {
    id: "home-recording",
    title: "Home Recording Setup",
    target: "Bands & Multi-Instrumentalists",
    budgetRange: "₹90,000 – ₹1,50,000",
    description: "Multi-input tracking capabilities for recording acoustic drums, dual microphones on guitars, and live stereo keys simultaneously.",
    gearPicks: [
      "Focusrite Scarlett 18i8 / Clarett+ USB Interface",
      "Pair of Yamaha HS5 / HS7 Studio Monitors",
      "Matched Pair Small Condensers + Vocal Dynamic Mic",
      "Corner Bass Traps & Acoustic Desktop Isolation Pads",
    ],
    recommendedFor: "Indie bands, live jam recordists, multi-track creators",
  },
  {
    id: "pro-commercial",
    title: "Professional Studio",
    target: "Mixing & Commercial Facilities",
    budgetRange: "₹1,80,000 – ₹3,50,000+",
    description: "Elite AD/DA conversion, realtime UAD DSP processing, world-class reference monitors, and mastering-grade analog signal paths.",
    gearPicks: [
      "Universal Audio Apollo Twin X DUO Heritage Edition",
      "Genelec 8030C / Yamaha HS8 Nearfield Monitors",
      "Sennheiser HD 650 Open-Back Reference Headphones",
      "Shure SM7B + Warm Audio WA-87 Condenser Mic",
    ],
    recommendedFor: "Commercial mix engineers, mastering houses, film composers",
  },
];

export function StudioBuilderTeaser() {
  const [selectedId, setSelectedId] = useState("producer");
  const current = STUDIO_SETUPS.find((s) => s.id === selectedId) || STUDIO_SETUPS[0];

  return (
    <section className="py-16 bg-[#171717] text-white border-b border-[#2C2C2A] relative overflow-hidden">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent mb-1 font-mono">
              <Wrench size={13} className="text-accent" />
              <span>Interactive Configuration Tool</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Build Your Studio Setup
            </h2>
            <p className="text-sm text-[#A6A6A2] mt-1 max-w-2xl">
              Eliminate gear compatibility guesswork. Select your production goal and budget to preview a harmonized signal chain verified by audio engineers.
            </p>
          </div>

          <Link
            href="/studio-builder"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors flex-shrink-0 shadow-subtle"
          >
            <span>Launch Interactive Builder</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Stepper Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-8">
          {STUDIO_SETUPS.map((setup) => {
            const isSelected = selectedId === setup.id;
            return (
              <button
                key={setup.id}
                type="button"
                onClick={() => setSelectedId(setup.id)}
                className={cn(
                  "p-3.5 rounded-lg text-left border transition-all duration-200 flex flex-col justify-between",
                  isSelected
                    ? "bg-[#262624] border-accent shadow-md text-white ring-1 ring-accent"
                    : "bg-[#1E1E1C] border-[#333330] text-[#9E9E9A] hover:bg-[#242422] hover:text-white"
                )}
              >
                <div>
                  <div
                    className={cn(
                      "text-[10px] uppercase font-mono font-bold tracking-wider mb-1",
                      isSelected ? "text-accent" : "text-[#777774]"
                    )}
                  >
                    {setup.target}
                  </div>
                  <div className="text-sm font-bold">{setup.title}</div>
                </div>
                <div className="text-[11px] font-mono mt-2 text-white font-semibold">
                  {setup.budgetRange}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Breakdown Display */}
        <div className="bg-[#222220] border border-[#333330] rounded-xl p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Description & Value */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-accent bg-[#331814] px-2.5 py-1 rounded border border-accent/20">
                <Sparkles size={12} />
                <span>Estimated Investment: {current.budgetRange}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {current.title} Solution Architecture
              </h3>

              <p className="text-sm text-[#B0B0AC] leading-relaxed">
                {current.description}
              </p>

              <div className="pt-2 text-xs text-[#8A8A85]">
                <strong className="text-white">Recommended for:</strong> {current.recommendedFor}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/studio-builder"
                  className="bg-accent hover:bg-accent-hover text-white text-xs font-bold px-4 py-2.5 rounded-md inline-flex items-center gap-1.5 transition-colors shadow-subtle"
                >
                  <span>Customize in Studio Builder</span>
                  <ArrowRight size={13} />
                </Link>
                <Link
                  href="/guides/how-to-choose-your-first-audio-interface"
                  className="text-xs text-[#9E9E9A] hover:text-white underline underline-offset-4"
                >
                  Read compatibility guide
                </Link>
              </div>
            </div>

            {/* Right Gear Component Stack */}
            <div className="lg:col-span-6">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 font-mono">
                Included Hardware Chain
              </div>

              <div className="space-y-2.5">
                {current.gearPicks.map((gear, idx) => (
                  <div
                    key={gear}
                    className="flex items-center gap-3 p-3 bg-[#1A1A18] border border-[#2D2D2A] rounded-lg hover:border-[#444440] transition-colors"
                  >
                    <span className="w-6 h-6 rounded bg-[#2A2A28] text-accent text-xs font-bold font-mono flex items-center justify-center flex-shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white flex-1">
                      {gear}
                    </span>
                    <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
