"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  SlidersHorizontal,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Mail,
  ArrowRight,
  CreditCard,
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export function SiteFooter() {
  return (
    <footer className="bg-[#171717] text-[#D4D4D0] border-t border-[#2C2C2A] mt-20">
      {/* 4 Value Proposition Pillars */}
      <div className="border-b border-[#2C2C2A] py-10">
        <Container size="wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#242422] border border-[#333330] flex items-center justify-center text-accent flex-shrink-0">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">100% Genuine Gear</h4>
                <p className="text-xs text-[#9E9E9A] mt-1 leading-relaxed">
                  Direct authorized Indian distribution. Every unit carries authentic manufacturer serial warranty.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#242422] border border-[#333330] flex items-center justify-center text-accent flex-shrink-0">
                <Truck size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Insured Indian Shipping</h4>
                <p className="text-xs text-[#9E9E9A] mt-1 leading-relaxed">
                  Specialized double-box shock-absorbing packaging dispatched via Bluedart Express with transit insurance.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#242422] border border-[#333330] flex items-center justify-center text-accent flex-shrink-0">
                <Headphones size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Gear Specialist Advisory</h4>
                <p className="text-xs text-[#9E9E9A] mt-1 leading-relaxed">
                  Talk directly with working sound engineers and producers for pre-purchase impedance and signal advice.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#242422] border border-[#333330] flex items-center justify-center text-accent flex-shrink-0">
                <CreditCard size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Flexible Indian EMIs</h4>
                <p className="text-xs text-[#9E9E9A] mt-1 leading-relaxed">
                  0% No-Cost EMI tenures on major bank credit cards, debit cards, and cardless finance partners.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer Links */}
      <div className="py-14">
        <Container size="wide">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Brand Intro & Newsletter */}
            <div className="col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white">
                  <SlidersHorizontal size={18} />
                </div>
                <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                  SOUND<span className="text-accent">SUPPLY</span>
                </span>
              </Link>
              <p className="text-xs text-[#A6A6A2] leading-relaxed max-w-sm">
                India&apos;s dedicated commerce destination for music producers, sound designers, gigging artists, and recording studios. Everything you need to make sound.
              </p>

              {/* Newsletter block */}
              <div className="pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                  Sound Supply Insider
                </div>
                <p className="text-[11px] text-[#888884] mb-2.5">
                  Exclusive price drops, B-stock inventory alerts, and studio setup breakdowns.
                </p>
                <form onSubmit={(e) => e.preventDefault()} className="flex items-center max-w-sm">
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    className="w-full bg-[#242422] border border-[#3A3A36] text-xs text-white px-3 py-2 rounded-l-md focus:outline-none focus:border-accent"
                  />
                  <button
                    type="submit"
                    className="bg-accent hover:bg-accent-hover text-white px-3 py-2 rounded-r-md text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Join</span>
                    <ArrowRight size={13} />
                  </button>
                </form>
              </div>
            </div>

            {/* Column: Gear Categories */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-white">
                Studio Gear
              </h5>
              <ul className="space-y-2 text-xs text-[#A6A6A2]">
                <li><Link href="/categories/studio-recording?sub=audio-interfaces" className="hover:text-white transition-colors">Audio Interfaces</Link></li>
                <li><Link href="/categories/studio-recording?sub=studio-monitors" className="hover:text-white transition-colors">Studio Monitors</Link></li>
                <li><Link href="/categories/studio-recording?sub=studio-headphones" className="hover:text-white transition-colors">Reference Headphones</Link></li>
                <li><Link href="/categories/microphones" className="hover:text-white transition-colors">Dynamic & Condenser Mics</Link></li>
                <li><Link href="/categories/keyboards-synths" className="hover:text-white transition-colors">MIDI Controllers & Synths</Link></li>
                <li><Link href="/categories/studio-recording?sub=acoustic-panels" className="hover:text-white transition-colors">Acoustic Treatment</Link></li>
              </ul>
            </div>

            {/* Column: Instruments */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-white">
                Instruments
              </h5>
              <ul className="space-y-2 text-xs text-[#A6A6A2]">
                <li><Link href="/categories/guitars" className="hover:text-white transition-colors">Electric & Acoustic Guitars</Link></li>
                <li><Link href="/categories/bass" className="hover:text-white transition-colors">Electric Basses</Link></li>
                <li><Link href="/categories/drums" className="hover:text-white transition-colors">Electronic Drum Kits</Link></li>
                <li><Link href="/categories/keyboards-synths" className="hover:text-white transition-colors">Digital Pianos & Stage Keys</Link></li>
                <li><Link href="/categories/dj" className="hover:text-white transition-colors">DJ Controllers & Mixers</Link></li>
              </ul>
            </div>

            {/* Column: Tools & Guides */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-white">
                Tools & Discovery
              </h5>
              <ul className="space-y-2 text-xs text-[#A6A6A2]">
                <li><Link href="/studio-builder" className="hover:text-white text-accent font-semibold transition-colors">Interactive Studio Builder</Link></li>
                <li><Link href="/compare" className="hover:text-white transition-colors">Product Spec Comparison</Link></li>
                <li><Link href="/guides" className="hover:text-white transition-colors">Equipment Buying Guides</Link></li>
                <li><Link href="/deals" className="hover:text-white transition-colors">Studio Deals & Bundles</Link></li>
                <li><Link href="/brands" className="hover:text-white transition-colors">Authorized Brand Directory</Link></li>
              </ul>
            </div>

            {/* Column: Help & Support */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-white">
                Support & Policy
              </h5>
              <ul className="space-y-2 text-xs text-[#A6A6A2]">
                <li><span className="text-[#888884]">Official Indian Warranty</span></li>
                <li><span className="text-[#888884]">GST Invoice for Businesses</span></li>
                <li><span className="text-[#888884]">Transit Insurance Policy</span></li>
                <li><span className="text-[#888884]">Easy 7-Day Returns</span></li>
                <li><span className="text-[#888884]">Service Center Locator</span></li>
                <li><span className="text-[#888884]">Contact Audio Support</span></li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar: Copyright & Compliance */}
      <div className="border-t border-[#252523] py-6 text-xs text-[#7A7A76]">
        <Container size="wide">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>
              &copy; {new Date().getFullYear()} Sound Supply India Private Limited. All brand logos and trademarks are property of their respective manufacturer owners.
            </p>
            <div className="flex items-center gap-6">
              <span>Security Guaranteed 256-bit SSL</span>
              <span>All Prices Inclusive of GST</span>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
