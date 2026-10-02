import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Wrench, ShieldCheck, Truck, CreditCard, Sparkles } from "lucide-react";
import { SITE_POLICIES } from "@/config/siteConfig";

export function HeroSection() {
  return (
    <section className="relative bg-canvas py-10 lg:py-16 border-b border-border overflow-hidden">
      {/* Subtle technical background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #171717 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Mission & Core Action Triggers */}
          <div className="lg:col-span-7 space-y-5 z-10">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-border shadow-subtle text-xs text-text-secondary">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-bold text-accent tracking-wide uppercase text-[10px] font-mono">
                Pro Audio Storefront &bull; India
              </span>
              <span className="text-border-strong">&bull;</span>
              <span className="text-[11px] font-medium text-text-primary">
                Technical Clarity & Hardware Compatibility
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.08] text-text-primary font-sans">
              Everything You Need <br />
              <span>to Make </span>
              <span className="text-accent underline decoration-accent/30 decoration-4 underline-offset-8">
                Sound.
              </span>
            </h1>

            {/* Concise Supporting Copy */}
            <p className="text-sm sm:text-base text-text-secondary max-w-xl leading-relaxed">
              India&apos;s dedicated commerce platform for music producers, recording engineers, and gigging artists. Calibrated technical specifications, verified signal chain compatibility, and insured nationwide delivery.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/categories/studio-recording"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-lg shadow-subtle transition-all active:scale-[0.98]"
              >
                <span>Shop Studio Gear</span>
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/studio-builder"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-canvas-muted text-text-primary border border-border text-xs sm:text-sm font-semibold px-5 py-3 rounded-lg shadow-subtle transition-all"
              >
                <Wrench size={15} className="text-accent" />
                <span>Build Your Studio</span>
              </Link>
            </div>

            {/* Subtle supporting information row */}
            <div className="pt-5 border-t border-border-subtle grid grid-cols-3 gap-3 text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-700 flex-shrink-0" />
                <span className="font-medium text-text-primary text-[11px] sm:text-xs">
                  {SITE_POLICIES.authenticity.badgeText}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-accent flex-shrink-0" />
                <span className="font-medium text-text-primary text-[11px] sm:text-xs">
                  {SITE_POLICIES.transit.badgeText}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard size={16} className="text-text-muted flex-shrink-0" />
                <span className="font-medium text-text-primary text-[11px] sm:text-xs">
                  {SITE_POLICIES.financing.badgeText}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Light-First Hardware Showcase Card */}
          <div className="lg:col-span-5 relative z-10">
            <div className="bg-white border border-border rounded-xl p-5 shadow-card">
              {/* Card top banner */}
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span className="font-mono text-text-primary font-bold uppercase tracking-wider text-[11px]">
                    Featured Hardware Chain
                  </span>
                </div>
                <span className="text-[10px] text-accent font-bold bg-accent-subtle px-2 py-0.5 rounded font-mono">
                  Bundle Savings
                </span>
              </div>

              {/* Product imagery */}
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden my-3 bg-[#FAFAF9] border border-border-subtle p-2 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80"
                  alt="Professional Recording Studio Setup"
                  className="w-full h-full object-cover rounded"
                />
              </div>

              {/* Product details */}
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-accent uppercase tracking-wider font-mono">
                  Producer Tracking Rig 2026
                </div>
                <div className="text-sm font-bold text-text-primary">
                  Focusrite Scarlett 2i2 (4th Gen) + ATH-M50x Cans
                </div>
                <p className="text-xs text-text-secondary line-clamp-1">
                  Ultra-low noise preamps paired with industry-standard 45mm monitoring drivers.
                </p>
              </div>

              {/* Quick specs micro-grid */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border-subtle text-center text-[10px] font-mono">
                <div className="bg-canvas p-1.5 rounded border border-border-subtle">
                  <div className="text-text-muted text-[9px] uppercase">Converters</div>
                  <div className="text-text-primary font-bold">120 dB Dynamic</div>
                </div>
                <div className="bg-canvas p-1.5 rounded border border-border-subtle">
                  <div className="text-text-muted text-[9px] uppercase">Preamps</div>
                  <div className="text-text-primary font-bold">69 dB Gain</div>
                </div>
                <div className="bg-canvas p-1.5 rounded border border-border-subtle">
                  <div className="text-text-muted text-[9px] uppercase">Drivers</div>
                  <div className="text-text-primary font-bold">45mm Neodymium</div>
                </div>
              </div>

              {/* Action bar */}
              <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-text-muted line-through font-mono">MRP ₹43,980</div>
                  <div className="text-base font-bold text-text-primary font-mono tabular-nums">
                    ₹34,980 <span className="text-xs text-emerald-700 font-sans font-semibold">In Stock</span>
                  </div>
                </div>

                <Link
                  href="/studio-builder"
                  className="text-xs font-bold text-white bg-[#171717] hover:bg-accent px-3.5 py-2 rounded-md transition-colors inline-flex items-center gap-1.5 shadow-subtle"
                >
                  <span>Explore Rig</span>
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
