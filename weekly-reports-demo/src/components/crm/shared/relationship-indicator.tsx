import { cn } from "../../../lib/utils";
import type { RelationshipWarmth } from "../../../types/contact";

/**
 * Relationship Indicator
 *
 * Visual warmth/strength indicator with animated bar.
 */

interface RelationshipIndicatorProps {
  score: number;
  warmth: RelationshipWarmth;
  size?: "sm" | "md";
  showLabel?: boolean;
}

const warmthConfig: Record<
  RelationshipWarmth,
  { label: string; color: string; bg: string }
> = {
  hot: {
    label: "Strong",
    color: "bg-emerald-500",
    bg: "bg-emerald-500/20",
  },
  warm: {
    label: "Good",
    color: "bg-emerald-400",
    bg: "bg-emerald-400/20",
  },
  cool: {
    label: "Cooling",
    color: "bg-amber-500",
    bg: "bg-amber-500/20",
  },
  cold: {
    label: "At Risk",
    color: "bg-red-500",
    bg: "bg-red-500/20",
  },
  new: {
    label: "New",
    color: "bg-accent",
    bg: "bg-accent/20",
  },
};

export function RelationshipIndicator({
  score,
  warmth,
  size = "md",
  showLabel = true,
}: RelationshipIndicatorProps) {
  const config = warmthConfig[warmth];

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        size === "sm" ? "text-micro" : "text-caption"
      )}
    >
      <div
        className={cn(
          "flex-1 rounded-full overflow-hidden",
          config.bg,
          size === "sm" ? "h-1" : "h-1.5"
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out",
            config.color
          )}
          style={{ width: `${score}%` }}
        />
      </div>
      {showLabel && (
        <span
          className={cn(
            "font-medium shrink-0 tabular-nums",
            warmth === "cold" || warmth === "cool"
              ? "text-amber-600 dark:text-amber-400"
              : "text-muted-foreground"
          )}
        >
          {config.label}
        </span>
      )}
    </div>
  );
}
