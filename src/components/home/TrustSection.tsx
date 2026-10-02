import { Container } from "@/components/ui/Container";
import { SITE_POLICIES, SITE_CONFIG } from "@/config/siteConfig";
import {
  ShieldCheck,
  Headphones,
  CreditCard,
  RotateCcw,
  Truck,
  CheckCircle,
} from "lucide-react";

export function TrustSection() {
  return (
    <section className="py-16 bg-white border-b border-border">
      <Container size="wide">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-accent mb-1 font-mono">
            Storefront Service Principles
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            Designed for Serious Indian Creators
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            Carefully structured business policies, secure packaging, and pre-purchase signal chain advisory.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-canvas border border-border rounded-lg p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-white border border-border flex items-center justify-center text-accent">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-bold text-sm text-text-primary">{SITE_POLICIES.authenticity.label}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {SITE_POLICIES.authenticity.shortDescription}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border-subtle text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
              <CheckCircle size={13} />
              <span>{SITE_POLICIES.authenticity.badgeText}</span>
            </div>
          </div>

          <div className="bg-canvas border border-border rounded-lg p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-white border border-border flex items-center justify-center text-accent">
                <Headphones size={20} />
              </div>
              <h3 className="font-bold text-sm text-text-primary">{SITE_POLICIES.support.label}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {SITE_POLICIES.support.shortDescription}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border-subtle text-[11px] font-semibold text-text-primary flex items-center gap-1">
              <span>{SITE_CONFIG.brand.hoursText}</span>
            </div>
          </div>

          <div className="bg-canvas border border-border rounded-lg p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-white border border-border flex items-center justify-center text-accent">
                <CreditCard size={20} />
              </div>
              <h3 className="font-bold text-sm text-text-primary">{SITE_POLICIES.financing.label}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {SITE_POLICIES.financing.shortDescription}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border-subtle text-[11px] font-semibold text-text-primary flex items-center gap-1">
              <span>Eligible Cards Supported</span>
            </div>
          </div>

          <div className="bg-canvas border border-border rounded-lg p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-white border border-border flex items-center justify-center text-accent">
                <Truck size={20} />
              </div>
              <h3 className="font-bold text-sm text-text-primary">{SITE_POLICIES.transit.label}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {SITE_POLICIES.transit.shortDescription}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border-subtle text-[11px] font-semibold text-text-primary flex items-center gap-1">
              <span>Tracked Courier Dispatch</span>
            </div>
          </div>

          <div className="bg-canvas border border-border rounded-lg p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-white border border-border flex items-center justify-center text-accent">
                <RotateCcw size={20} />
              </div>
              <h3 className="font-bold text-sm text-text-primary">{SITE_POLICIES.returns.label}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {SITE_POLICIES.returns.shortDescription}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border-subtle text-[11px] font-semibold text-text-primary flex items-center gap-1">
              <span>Courier Return Logistics</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
