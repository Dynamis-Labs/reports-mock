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
    | "count";
}

const badgeVariants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-muted text-muted-foreground",
  active: "bg-accent text-accent-foreground",
  accent: "bg-accent-muted text-accent",
  outline: "border border-border text-muted-foreground bg-transparent",
  week: "bg-accent-muted text-accent font-semibold px-2.5 py-1 text-caption",
  source:
    "bg-surface text-muted-foreground border border-border-subtle px-2 py-1 text-caption",
  count:
    "bg-accent text-accent-foreground size-[14px] p-0 justify-center rounded-full text-[10px]",
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
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
