import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "success" | "warning" | "outline" | "brand";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "sm",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded tracking-tight",
        // Sizes
        size === "sm" && "text-[11px] px-2 py-0.5 leading-tight",
        size === "md" && "text-xs px-2.5 py-1",
        // Variants
        variant === "default" && "bg-canvas-muted text-text-secondary border border-border-subtle",
        variant === "accent" && "bg-accent text-white font-bold tracking-normal",
        variant === "success" && "bg-emerald-50 text-emerald-800 border border-emerald-200",
        variant === "warning" && "bg-amber-50 text-amber-800 border border-amber-200",
        variant === "outline" && "border border-border text-text-secondary bg-white",
        variant === "brand" && "bg-[#171717] text-white",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
