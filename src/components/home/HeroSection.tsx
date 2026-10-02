import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Wrench, ShieldCheck, Zap, Headphones, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-[#171717] text-white py-12 lg:py-20 border-b border-[#2C2C2A] overflow-hidden">
      {/* Subtle background acoustic grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Mission & CTAs */}
          <div className="lg:col-span-7 space-y-6 z-10">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#262624] border border-[#3C3C38] text-xs text-[#E5E5E0]">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-semibold text-accent tracking-wide uppercase text-[11px]">
                Authorized Indian Retailer
              </span>
              <span className="text-[#888884]">&bull;</span>
              <span>Official Warranty & GST Invoices</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] font-sans">
              Everything You Need <br />
              <span className="text-white">to Make </span>
              <span className="text-accent underline decoration-accent/40 decoration-4 underline-offset-8">
                Sound.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-[#B0B0AC] max-w-xl leading-relaxed">
              Sound Supply brings world-class studio hardware, acoustic monitoring, precision microphones, and instruments together. Engineered with technical transparency, honest specs, and dedicated guidance for Indian creators.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/categories/studio-recording"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-bold px-6 py-3.5 rounded-lg shadow-subtle transition-all active:scale-[0.98]"
              >
                <span>Shop All Gear</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/studio-builder"
                className="inline-flex items-center justify-center gap-2 bg-[#262624] hover:bg-[#333330] text-white border border-[#444440] text-sm font-semibold px-5 py-3.5 rounded-lg transition-all"
              >
                <Wrench size={16} className="text-amber-400" />
                <span>Build Your Studio</span>
              </Link>
            </div>

            {/* Trust points row */}
            <div className="pt-6 border-t border-[#2C2C2A] grid grid-cols-3 gap-4 text-xs text-[#9E9E9A]">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-accent flex-shrink-0" />
                <span>Zero-Noise Preamp Test Benches</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-accent flex-shrink-0" />
                <span>Insured Fragile-Courier Transit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-accent flex-shrink-0" />
                <span>Verified Brand Distro</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Studio Spotlight */}
          <div className="lg:col-span-5 relative z-10">
            <div className="relative bg-[#222220] border border-[#333330] rounded-xl p-4 sm:p-5 shadow-2xl">
              {/* Top card header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#333330] text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-mono text-gray-300 font-semibold uppercase tracking-wider text-[11px]">
                    Featured Signal Chain
                  </span>
                </div>
                <span className="text-[11px] text-accent font-bold bg-[#331814] px-2 py-0.5 rounded border border-accent/20">
                  Save ₹12,980 Bundle
                </span>
              </div>

              {/* Main featured visual */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden my-4 bg-[#1A1A18] border border-[#2D2D2A]">
                <img
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80"
                  alt="Professional Recording Studio Setup"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <div className="text-[11px] font-bold text-accent uppercase tracking-wider">
                    Bedroom Producer Rig 2026
                  </div>
                  <div className="text-sm font-bold text-white">
                    Focusrite 2i2 4th Gen + ATH-M50x + KeyStep 37
                  </div>
                </div>
              </div>

              {/* Quick specs pill bar */}
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono">
                <div className="bg-[#1C1C1A] p-2 rounded border border-[#2D2D2A]">
                  <div className="text-gray-400 text-[10px]">Converters</div>
                  <div className="text-white font-bold">120 dB Dynamic</div>
                </div>
                <div className="bg-[#1C1C1A] p-2 rounded border border-[#2D2D2A]">
                  <div className="text-gray-400 text-[10px]">Mic Preamps</div>
                  <div className="text-white font-bold">69 dB Gain</div>
                </div>
                <div className="bg-[#1C1C1A] p-2 rounded border border-[#2D2D2A]">
                  <div className="text-gray-400 text-[10px]">Headphone Driver</div>
                  <div className="text-white font-bold">45mm Rare-Earth</div>
                </div>
              </div>

              {/* Action bar */}
              <div className="mt-4 pt-3 border-t border-[#333330] flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-gray-400 line-through font-mono">₹58,970 MRP</div>
                  <div className="text-base font-bold text-white font-mono">
                    ₹45,990 <span className="text-xs text-accent font-sans">Full Setup</span>
                  </div>
                </div>

                <Link
                  href="/studio-builder"
                  className="text-xs font-bold text-white bg-accent hover:bg-accent-hover px-3.5 py-2 rounded-md transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Customize Setup</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
