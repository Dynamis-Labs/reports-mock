/**
 * Involvement Tab Item
 *
 * Row item for the involvement section.
 * Features:
 * - Icon + title + metadata
 * - Status indicators (blocked=red, at-risk=orange)
 * - Click handlers for navigation
 */

import { motion } from "motion/react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  Alert01Icon,
  Cancel01Icon,
  CheckmarkSquare01Icon,
  Notification01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@lib/utils";
import type { InvolvementItem } from "@types/home";

interface InvolvementTabItemProps {
  item: InvolvementItem;
  onClick: () => void;
}

const typeIcons: Record<InvolvementItem["type"], IconSvgElement> = {
  "blocked-swimlane": Cancel01Icon,
  "at-risk": Alert01Icon,
  "action-item": CheckmarkSquare01Icon,
  "recent-update": Notification01Icon,
};

const severityColors = {
  critical: {
    text: "text-red-500",
    bg: "bg-red-500/10",
    dot: "bg-red-500",
  },
  high: {
    text: "text-orange-500",
    bg: "bg-orange-500/10",
    dot: "bg-orange-500",
  },
  medium: {
    text: "text-yellow-500",
    bg: "bg-yellow-500/10",
    dot: "bg-yellow-500",
  },
  low: {
    text: "text-slate-400",
    bg: "bg-slate-400/10",
    dot: "bg-slate-400",
  },
};

export function InvolvementTabItem({ item, onClick }: InvolvementTabItemProps) {
  const icon = typeIcons[item.type];
  const severity = item.severity ?? "low";
  const colors = severityColors[severity];

  // Determine icon color based on type
  const iconColor =
    item.type === "blocked-swimlane"
      ? "text-red-500"
      : item.type === "at-risk"
        ? "text-orange-500"
        : "text-muted-foreground";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3.5 rounded-[var(--radius-lg)]",
        "text-left transition-all",
        "bg-surface-elevated border border-border shadow-sm",
        "hover:shadow-md hover:border-border group",
      )}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", duration: 0.2, bounce: 0 }}
    >
      {/* Type icon */}
      <div
        className={cn(
          "size-9 rounded-[var(--radius-lg)] flex items-center justify-center shrink-0",
          item.type === "blocked-swimlane" && "bg-red-500/10",
          item.type === "at-risk" && "bg-orange-500/10",
          item.type === "action-item" && "bg-blue-500/10",
          item.type === "recent-update" && "bg-slate-500/10",
        )}
      >
        <HugeiconsIcon
          icon={icon}
          size={16}
          strokeWidth={1.5}
          className={iconColor}
        />
      </div>

      {/* Content -- title + subtitle */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-sm text-foreground truncate">
            {item.title}
          </h4>
          {(severity === "critical" || severity === "high") && (
            <span
              className={cn("size-1.5 rounded-full shrink-0", colors.dot)}
            />
          )}
        </div>
        {item.subtitle && (
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            {item.subtitle}
          </p>
        )}
      </div>

      {/* Chevron */}
      <HugeiconsIcon
        icon={ArrowRight01Icon}
        size={16}
        strokeWidth={1.5}
        className="text-muted-foreground/40 group-hover:text-muted-foreground transition-colors shrink-0"
      />
    </motion.button>
  );
}
