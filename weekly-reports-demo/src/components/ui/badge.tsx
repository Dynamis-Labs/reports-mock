import { type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "active" | "accent" | "outline" | "week" | "source";
}

const badgeVariants = {
  default: "bg-muted text-muted-foreground",
  active: "bg-accent text-accent-foreground",
  accent: "bg-accent-muted text-accent",
  outline: "border border-border text-muted-foreground bg-transparent",
  week: "bg-accent-muted text-accent font-semibold",
  source: "bg-surface text-muted-foreground border border-border-subtle",
};

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium text-micro",
        "px-2 py-0.5 rounded-md",
        badgeVariants[variant],
        variant === "week" && "px-2.5 py-1 text-caption",
        variant === "source" && "px-2 py-1 text-caption",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
