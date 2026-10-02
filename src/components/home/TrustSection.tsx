import { Container } from "@/components/ui/Container";
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
            Indian Retail Commitment
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            Why Audio Creators Choose Sound Supply
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            Built to solve the unique challenges of Indian musicians: authentic equipment warranties, transit insurance, and honest technical guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-canvas border border-border rounded-lg p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-white border border-border flex items-center justify-center text-accent">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-bold text-sm text-text-primary">100% Genuine Gear</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Direct official distributor serial allocation. No grey-market imports or rebadged units.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border-subtle text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
              <CheckCircle size={13} />
              <span>Full Brand Warranty</span>
            </div>
          </div>

          <div className="bg-canvas border border-border rounded-lg p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-white border border-border flex items-center justify-center text-accent">
                <Headphones size={20} />
              </div>
              <h3 className="font-bold text-sm text-text-primary">Working Engineer Support</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Get pre-purchase advice on impedance, microphone sensitivity, and driver compatibility.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border-subtle text-[11px] font-semibold text-text-primary flex items-center gap-1">
              <span>Mon–Sat Studio Hotline</span>
            </div>
          </div>

          <div className="bg-canvas border border-border rounded-lg p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-white border border-border flex items-center justify-center text-accent">
                <CreditCard size={20} />
              </div>
              <h3 className="font-bold text-sm text-text-primary">Transparent EMIs</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Clear monthly breakdowns across all major Indian credit and debit cards with 0% interest tenures.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border-subtle text-[11px] font-semibold text-text-primary flex items-center gap-1">
              <span>Instant Card Eligibility</span>
            </div>
          </div>

          <div className="bg-canvas border border-border rounded-lg p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-white border border-border flex items-center justify-center text-accent">
                <Truck size={20} />
              </div>
              <h3 className="font-bold text-sm text-text-primary">Insured Express Courier</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Double-boxed shock protection with transit insurance covering damage or theft in transit.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border-subtle text-[11px] font-semibold text-text-primary flex items-center gap-1">
              <span>Bluedart Air / Surface</span>
            </div>
          </div>

          <div className="bg-canvas border border-border rounded-lg p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-md bg-white border border-border flex items-center justify-center text-accent">
                <RotateCcw size={20} />
              </div>
              <h3 className="font-bold text-sm text-text-primary">Hassle-Free Returns</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                7-day replacement policy for DOA (Dead on Arrival) hardware or manufacturing defects.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border-subtle text-[11px] font-semibold text-text-primary flex items-center gap-1">
              <span>Direct Courier Pickup</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
