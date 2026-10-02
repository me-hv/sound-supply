"use client";

import React from "react";
import Link from "next/link";
import { Category } from "@/types";
import { ArrowRight, Sparkles, ShieldCheck, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface MegaMenuProps {
  category: Category;
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ category, isOpen, onClose }: MegaMenuProps) {
  if (!isOpen || !category.groups || category.groups.length === 0) {
    return null;
  }

  // Split category groups into major categories and secondary subcategories
  const majorGroup = category.groups[0];
  const secondaryGroups = category.groups.slice(1);

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 right-0 bg-white border-b border-border shadow-dropdown z-40 animate-in fade-in-50 duration-150"
    >
      <Container size="wide" className="py-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Department Overview (lg:col-span-3) */}
          <div className="lg:col-span-3 pr-6 border-r border-border-subtle space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent font-mono">
                Department
              </span>
              <h3 className="text-xl font-bold text-text-primary tracking-tight mt-0.5">
                {category.name}
              </h3>
              <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                {category.description}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href={`/categories/${category.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover transition-colors"
              >
                <span>Browse All {category.name} Gear</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="p-3 bg-canvas rounded-md border border-border-subtle text-[11px] text-text-secondary space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-text-primary">
                <ShieldCheck size={14} className="text-emerald-700" />
                <span>Genuine Hardware Guarantee</span>
              </div>
              <p className="text-[10px] text-text-muted leading-snug">
                Every unit includes valid manufacturer serial numbers and GST tax invoices.
              </p>
            </div>
          </div>

          {/* Column 2: Major Core Categories (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            {majorGroup && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary pb-1.5 border-b border-border-subtle">
                  {majorGroup.name}
                </h4>
                <ul className="mt-2.5 space-y-1.5">
                  {majorGroup.items.map((sub) => (
                    <li key={sub.id}>
                      <Link
                        href={`/categories/${category.slug}?sub=${sub.slug}`}
                        onClick={onClose}
                        className="text-xs text-text-secondary hover:text-accent hover:translate-x-0.5 transition-all flex items-center justify-between py-1 group"
                      >
                        <span className="group-hover:text-text-primary font-medium transition-colors">
                          {sub.name}
                        </span>
                        {sub.itemCount && (
                          <span className="text-[10px] text-text-muted font-mono opacity-70">
                            {sub.itemCount}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Column 3: Secondary Groups & Accessories (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            {secondaryGroups.slice(0, 2).map((group) => (
              <div key={group.name}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary pb-1.5 border-b border-border-subtle">
                  {group.name}
                </h4>
                <ul className="mt-2.5 space-y-1.5">
                  {group.items.slice(0, 4).map((sub) => (
                    <li key={sub.id}>
                      <Link
                        href={`/categories/${category.slug}?sub=${sub.slug}`}
                        onClick={onClose}
                        className="text-xs text-text-secondary hover:text-accent hover:translate-x-0.5 transition-all flex items-center justify-between py-1 group"
                      >
                        <span className="group-hover:text-text-primary font-medium transition-colors">
                          {sub.name}
                        </span>
                        {sub.itemCount && (
                          <span className="text-[10px] text-text-muted font-mono opacity-70">
                            {sub.itemCount}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Column 4: Featured Brands & Department Spotlight (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Featured Brands */}
            {category.featuredBrands && category.featuredBrands.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary pb-1.5 border-b border-border-subtle">
                  Featured Brands
                </h4>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {category.featuredBrands.map((b) => (
                    <Link
                      key={b}
                      href={`/brands/${b}`}
                      onClick={onClose}
                      className="text-xs uppercase font-bold text-text-secondary hover:text-accent bg-canvas hover:bg-canvas-muted px-2.5 py-1 rounded border border-border-subtle transition-colors"
                    >
                      {b}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Department Spotlight Card */}
            <div className="bg-canvas rounded-lg p-3.5 border border-border-subtle space-y-2">
              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-accent uppercase tracking-wider font-mono">
                <Sparkles size={11} />
                <span>Signal Setup Guide</span>
              </div>
              <div className="text-xs font-bold text-text-primary">
                Need Help Matching Impedance?
              </div>
              <p className="text-[11px] text-text-secondary leading-normal">
                Check our studio compatibility notes before selecting cables, monitors, or audio interfaces.
              </p>
              <div className="pt-1">
                <Link
                  href="/guides"
                  onClick={onClose}
                  className="text-xs font-semibold text-text-primary hover:text-accent flex items-center gap-1 transition-colors"
                >
                  <BookOpen size={12} className="text-accent" />
                  <span>Read Equipment Guides</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
