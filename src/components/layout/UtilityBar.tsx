import Link from "next/link";
import { Truck, ShieldCheck, CreditCard, Headphones, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SITE_POLICIES, SITE_CONFIG } from "@/config/siteConfig";

export function UtilityBar() {
  return (
    <div className="bg-[#171717] text-[#D4D4D0] text-xs py-1.5 border-b border-[#2C2C2A] hidden sm:block">
      <Container size="wide">
        <div className="flex items-center justify-between">
          {/* Left: Storefront policy notices */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-accent" />
              <span>{SITE_POLICIES.authenticity.label}</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-[#B0B0AC]">
              <Truck size={14} className="text-[#A3A39F]" />
              <span>{SITE_POLICIES.transit.label}</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-[#B0B0AC]">
              <CreditCard size={14} className="text-[#A3A39F]" />
              <span>{SITE_POLICIES.financing.label}</span>
            </div>
          </div>

          {/* Right: Technical advice & promotional highlights */}
          <div className="flex items-center gap-5">
            <Link
              href="/deals"
              className="inline-flex items-center gap-1 text-white hover:text-accent font-medium transition-colors"
            >
              <Sparkles size={12} className="text-accent" />
              <span>Studio Deals & Clearance</span>
            </Link>
            <div className="h-3 w-px bg-[#3E3E3B]" />
            <div className="flex items-center gap-1.5 text-[#B0B0AC]">
              <Headphones size={13} />
              <span>{SITE_POLICIES.support.label}:</span>
              <span className="text-white font-mono text-[11px]">
                {SITE_CONFIG.brand.advisoryPhone}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
