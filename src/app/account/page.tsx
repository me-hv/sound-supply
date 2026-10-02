import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { User, Package, ShieldCheck, CreditCard, ArrowRight } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="py-8 bg-canvas min-h-screen">
      <Container size="tight">
        <Breadcrumbs items={[{ label: "Account" }]} className="mb-4" />

        <div className="bg-white border border-border rounded-xl p-6 sm:p-8 mb-8 shadow-subtle">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-accent-subtle text-accent flex items-center justify-center font-bold text-xl font-mono">
              SS
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight">
                Studio Member Account
              </h1>
              <p className="text-xs text-text-secondary mt-0.5">
                Sound Supply Customer Portal &bull; GST Registration & Warranty Claims
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-border rounded-xl p-5 space-y-2">
            <div className="w-8 h-8 rounded bg-canvas flex items-center justify-center text-accent">
              <Package size={18} />
            </div>
            <h3 className="font-bold text-sm text-text-primary">Order History & Tracking</h3>
            <p className="text-xs text-text-secondary">
              Track live Bluedart shipments, download tax invoices, and view serial allocations.
            </p>
          </div>

          <div className="bg-white border border-border rounded-xl p-5 space-y-2">
            <div className="w-8 h-8 rounded bg-canvas flex items-center justify-center text-accent">
              <ShieldCheck size={18} />
            </div>
            <h3 className="font-bold text-sm text-text-primary">Manufacturer Warranty</h3>
            <p className="text-xs text-text-secondary">
              Register serial numbers with Yamaha, Shure, and Focusrite for official Indian replacement.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
