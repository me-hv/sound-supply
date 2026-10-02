import React from "react";
import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onActionClick,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "bg-white border border-border rounded-xl p-8 sm:p-12 text-center max-w-md mx-auto space-y-4 shadow-subtle",
        className
      )}
    >
      {Icon && (
        <div className="w-12 h-12 rounded-full bg-canvas border border-border-subtle mx-auto flex items-center justify-center text-text-muted">
          <Icon size={24} />
        </div>
      )}

      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>

      {(actionLabel && (actionHref || onActionClick)) && (
        <div className="pt-2">
          {actionHref ? (
            <Link
              href={actionHref}
              className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-white text-xs font-bold px-4 py-2.5 rounded-md transition-colors shadow-subtle active:scale-[0.98]"
            >
              <span>{actionLabel}</span>
              <ArrowRight size={14} />
            </Link>
          ) : (
            <button
              type="button"
              onClick={onActionClick}
              className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-white text-xs font-bold px-4 py-2.5 rounded-md transition-colors shadow-subtle active:scale-[0.98]"
            >
              <span>{actionLabel}</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
