import { HugeiconsIcon } from "@hugeicons/react";
import { LockIcon, GlobeIcon } from "@hugeicons/core-free-icons";
import { cn } from "@lib/utils";

type MeetingVisibility = "shared" | "private";

interface VisibilityBadgeProps {
  visibility: MeetingVisibility;
  className?: string;
}

/**
 * Minimal badge indicating meeting visibility
 * Tiny icon + short label, matches other page badges
 */
export function VisibilityBadge({
  visibility,
  className,
}: VisibilityBadgeProps) {
  const isShared = visibility === "shared";
  const icon = isShared ? GlobeIcon : LockIcon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[10px] font-medium",
        isShared
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-amber-600 dark:text-amber-400",
        className,
      )}
    >
      <HugeiconsIcon icon={icon} size={12} strokeWidth={2} />
    </span>
  );
}
