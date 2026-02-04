import { type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "active"
    | "accent"
    | "outline"
    | "week"
    | "source"
    | "count"
    | "urgent"
    | "high"
    | "medium"
    | "low";
}

/**
 * Badge color variants only - sizing is consistent via base styles
 */
const badgeVariants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-muted text-foreground/80",
  active: "bg-accent text-accent-foreground",
  accent: "bg-accent-muted text-accent",
  outline: "border border-border text-muted-foreground bg-transparent",
  week: "bg-accent-muted text-accent font-semibold",
  source: "bg-surface text-muted-foreground border border-border-subtle",
  count:
    "bg-accent text-accent-foreground size-[14px] !p-0 justify-center !rounded-full !text-[10px]",
  // Priority/severity variants
  urgent: "bg-red-500/15 text-red-600 dark:text-red-400",
  high: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  medium: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
  low: "bg-slate-500/15 text-slate-600 dark:text-slate-400",
};

/**
 * Consistent badge component with unified sizing
 * All badges use text-[11px] (micro) with px-1.5 py-0.5 padding
 */
export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        // Consistent base sizing for all badges
        "inline-flex items-center font-medium",
        "text-[11px] px-1.5 py-0.5 rounded",
        badgeVariants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
