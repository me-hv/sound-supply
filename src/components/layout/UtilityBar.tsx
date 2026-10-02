import Link from "next/link";
import { Truck, ShieldCheck, CreditCard, Headphones, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function UtilityBar() {
  return (
    <div className="bg-[#171717] text-[#D4D4D0] text-xs py-1.5 border-b border-[#2C2C2A] hidden sm:block">
      <Container size="wide">
        <div className="flex items-center justify-between">
          {/* Left: Value proposition highlights */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-accent" />
              <span>100% Genuine Authorized Gear</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5">
              <Truck size={14} className="text-[#A3A39F]" />
              <span>Insured Express Courier Across India</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5">
              <CreditCard size={14} className="text-[#A3A39F]" />
              <span>No-Cost EMI Options on Major Cards</span>
            </div>
          </div>

          {/* Right: Expert support and hot deals */}
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
              <span>Gear Specialist Advisory:</span>
              <a href="tel:+918000000000" className="text-white hover:underline font-mono">
                +91 800-SOUNDS
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
