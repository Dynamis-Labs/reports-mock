import { type HTMLAttributes } from "react";
import { cn } from "@lib/utils";

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
    | "low"
    | "todo"
    | "in-progress"
    | "in-review"
    | "completed"
    | "teal"
    | "green"
    | "amber"
    | "blue"
    | "purple";
}

const badgeVariants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default:
    "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
  active: "bg-primary text-primary-foreground",
  accent: "bg-accent-muted text-accent",
  outline: "border border-border text-muted-foreground bg-transparent",
  week: "bg-accent-muted text-accent font-semibold",
  source: "bg-surface text-muted-foreground border border-border-subtle",
  count:
    "bg-primary text-primary-foreground size-4 !p-0 justify-center !rounded-full !text-[10px] font-semibold",

  // Priority variants
  urgent: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400",
  high: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-400",
  medium: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  low: "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",

  // Kanban status chips (Synchro style)
  todo: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  "in-progress":
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  "in-review":
    "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-400",
  completed: "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-400",

  // Colored name chips (Synchro assignee style)
  teal: "bg-teal-50 text-teal-700 dark:bg-teal-900 dark:text-teal-300",
  green: "bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300",
  amber: "bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  blue: "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  purple:
    "bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
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
        "inline-flex items-center font-medium leading-none",
        "text-[11px] px-2 py-0.5 rounded-full",
        badgeVariants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
