"use client";

import React from "react";
import Link from "next/link";
import { Category } from "@/types";
import { ArrowRight, Sparkles } from "lucide-react";
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

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 right-0 bg-white border-b border-border shadow-dropdown z-40 animate-in fade-in-50 duration-150"
    >
      <Container size="wide" className="py-7">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left summary block */}
          <div className="lg:w-64 flex-shrink-0 border-r border-border-subtle pr-6">
            <h3 className="text-lg font-bold text-text-primary tracking-tight">
              {category.name}
            </h3>
            <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
              {category.description}
            </p>

            <div className="mt-4 pt-4 border-t border-border-subtle">
              <Link
                href={`/categories/${category.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover transition-colors"
              >
                <span>Explore All in {category.name}</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {category.featuredBrands && category.featuredBrands.length > 0 && (
              <div className="mt-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-text-muted mb-2">
                  Featured Brands
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {category.featuredBrands.map((b) => (
                    <Link
                      key={b}
                      href={`/brands/${b}`}
                      onClick={onClose}
                      className="text-[11px] uppercase font-bold text-text-secondary hover:text-accent bg-canvas px-2 py-0.5 rounded border border-border-subtle"
                    >
                      {b}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Center: Columns of Subcategory Groups */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {category.groups.map((group) => (
              <div key={group.name} className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary pb-1 border-b border-border-subtle">
                  {group.name}
                </h4>
                <ul className="space-y-1.5">
                  {group.items.map((sub) => (
                    <li key={sub.id}>
                      <Link
                        href={`/categories/${category.slug}?sub=${sub.slug}`}
                        onClick={onClose}
                        className="text-xs text-text-secondary hover:text-accent hover:translate-x-0.5 transition-all inline-flex items-center justify-between w-full group py-0.5"
                      >
                        <span className="group-hover:text-text-primary transition-colors">
                          {sub.name}
                        </span>
                        {sub.itemCount && (
                          <span className="text-[10px] text-text-muted font-mono opacity-60">
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

          {/* Right Spotlight Callout */}
          <div className="hidden xl:block w-64 flex-shrink-0 bg-canvas rounded-lg p-4 border border-border-subtle">
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-accent uppercase tracking-wider mb-2">
              <Sparkles size={12} />
              <span>Staff Spotlight</span>
            </div>
            <div className="text-xs font-bold text-text-primary">
              Studio Setup Consultation
            </div>
            <p className="text-[11px] text-text-secondary mt-1 leading-normal">
              Not sure which interface matches your microphone impedance? Chat directly with an authorized audio technician.
            </p>
            <div className="mt-3">
              <Link
                href="/studio-builder"
                onClick={onClose}
                className="text-xs font-semibold text-white bg-accent px-3 py-1.5 rounded-md inline-block hover:bg-accent-hover transition-colors"
              >
                Launch Studio Builder
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
