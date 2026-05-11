import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: "low" | "medium" | "high";
  hoverEffect?: boolean;
}

export const GlassCard = ({
  children,
  className,
  intensity = "medium",
  hoverEffect = true,
  ...props
}: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass-card overflow-hidden",
        intensity === "low" && "bg-white/5 dark:bg-black/10 backdrop-blur-sm",
        intensity === "high" && "bg-white/20 dark:bg-black/40 backdrop-blur-xl",
        hoverEffect && "hover:scale-[1.02] hover:shadow-primary/20",
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
    </div>
  );
};
