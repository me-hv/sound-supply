import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "tight" | "wide";
}

export function Container({ children, className, size = "default", ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        size === "tight" && "max-w-5xl",
        size === "default" && "max-w-7xl",
        size === "wide" && "max-w-[1440px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
