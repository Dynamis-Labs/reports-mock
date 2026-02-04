import { motion } from "motion/react";
import {
  Video,
  Mail,
  MessageSquare,
  FileText,
  Calendar,
  Flag,
  Target,
  AlertCircle,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { type MemoryEvent, type MemoryEventType } from "../../types/memory";
import { useIsEventSelected, useMemoryStore } from "../../stores/memory-store";

/**
 * Memory Timeline Card
 *
 * Individual card in the horizontal timeline, designed to match the
 * activity feed reference image:
 * - Left-colored border indicating event type
 * - Service icon (Zoom, Gmail, Slack, etc.)
 * - Title with date and platform badges
 * - "with [participants]" secondary line
 * - Summary description
 *
 * Cards have a clean white background with subtle shadows on hover.
 */

interface MemoryTimelineCardProps {
  event: MemoryEvent;
  /** Compact mode for week-column display */
  compact?: boolean;
}

// Map event types to appropriate icons
const eventTypeIcons: Record<MemoryEventType, typeof Video> = {
  meeting: Video,
  email: Mail,
  commitment: Flag,
  milestone: Target,
  decision: FileText,
  alert: AlertCircle,
};

// Map source types to icons
const sourceTypeIcons: Record<string, typeof Video> = {
  meeting: Video,
  email: Mail,
  slack: MessageSquare,
  document: FileText,
  calendar: Calendar,
};

// Get display label for the source/platform
function getSourceLabel(event: MemoryEvent): string | null {
  if (event.sources.length === 0) return null;

  const sourceType = event.sources[0].type;
  const labels: Record<string, string> = {
    meeting: "Zoom",
    email: "Gmail",
    slack: "Slack",
    document: "Doc",
    calendar: "Calendar",
  };

  return labels[sourceType] || sourceType;
}

// Format date for badge display
function formatBadgeDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// Get participants display string
function getParticipantsDisplay(event: MemoryEvent): string | null {
  if (event.participants.length === 0) return null;

  const names = event.participants.slice(0, 2).map((p) => p.name);
  const remaining = event.participants.length - 2;

  if (remaining > 0) {
    return `with ${names.join(", ")} +${remaining}`;
  }
  return `with ${names.join(", ")}`;
}

// Border colors by event type (left accent)
const borderColors: Record<MemoryEventType, string> = {
  meeting: "border-l-blue-400",
  email: "border-l-sky-400",
  commitment: "border-l-amber-400",
  milestone: "border-l-emerald-400",
  decision: "border-l-violet-400",
  alert: "border-l-red-400",
};

// Icon background colors
const iconBgColors: Record<MemoryEventType, string> = {
  meeting: "bg-blue-500",
  email: "bg-red-500", // Gmail red
  commitment: "bg-amber-500",
  milestone: "bg-emerald-500",
  decision: "bg-violet-500",
  alert: "bg-red-500",
};

// Icon background for Slack (distinct purple)
const slackBg = "bg-[#4A154B]";

export function MemoryTimelineCard({
  event,
  compact = false,
}: MemoryTimelineCardProps) {
  const isSelected = useIsEventSelected(event.id);
  const selectEvent = useMemoryStore((state) => state.selectEvent);

  const Icon = eventTypeIcons[event.type];
  const sourceLabel = getSourceLabel(event);
  const participantsDisplay = getParticipantsDisplay(event);

  // Determine icon background based on source
  const primarySource = event.sources[0]?.type;
  let iconBg = iconBgColors[event.type];
  if (primarySource === "slack") {
    iconBg = slackBg;
  }

  // Get the appropriate icon for the source
  const SourceIcon = primarySource
    ? sourceTypeIcons[primarySource] || Icon
    : Icon;

  const handleClick = () => {
    selectEvent(event.id);
  };

  // Compact mode: smaller card for week-column display
  if (compact) {
    return (
      <motion.button
        type="button"
        onClick={handleClick}
        className={cn(
          "w-[170px] text-left rounded-lg overflow-hidden",
          "bg-surface-elevated border border-l-[3px]",
          "transition-all duration-200",
          borderColors[event.type],
          isSelected
            ? "border-border shadow-md ring-2 ring-accent/20"
            : "border-border/60 hover:shadow-sm hover:border-border",
        )}
        whileHover={{ y: -1, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", duration: 0.2, bounce: 0 }}
      >
        <div className="p-3">
          {/* Row 1: Icon + Type label */}
          <div className="flex items-center gap-2 mb-1.5">
            <div
              className={cn(
                "size-6 rounded flex items-center justify-center shrink-0",
                iconBg,
              )}
            >
              <SourceIcon className="size-3.5 text-white" strokeWidth={1.5} />
            </div>
            <Badge
              variant="outline"
              className="text-[9px] px-1 py-0 h-4 border-border bg-surface text-muted-foreground font-medium"
            >
              {formatBadgeDate(event.date)}
            </Badge>
          </div>

          {/* Title */}
          <h4 className="font-medium text-xs text-foreground line-clamp-2 leading-snug">
            {event.title}
          </h4>
        </div>
      </motion.button>
    );
  }

  // Full-size card (original)
  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className={cn(
        "w-[280px] text-left rounded-lg overflow-hidden",
        "bg-surface-elevated border border-l-4",
        "transition-all duration-200",
        borderColors[event.type],
        isSelected
          ? "border-border shadow-md ring-2 ring-accent/20"
          : "border-border/60 hover:shadow-md hover:border-border",
      )}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", duration: 0.2, bounce: 0 }}
    >
      <div className="p-4">
        {/* Row 1: Icon + Title with badges */}
        <div className="flex items-start gap-3">
          {/* Service Icon */}
          <div
            className={cn(
              "size-9 rounded-lg flex items-center justify-center shrink-0",
              iconBg,
            )}
          >
            <SourceIcon className="size-4.5 text-white" strokeWidth={1.5} />
          </div>

          {/* Title + Badges */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold text-sm text-foreground truncate max-w-[140px]">
                {event.title}
              </h4>

              {/* Date Badge */}
              <Badge
                variant="outline"
                className="text-[10px] px-1.5 py-0 h-5 border-border bg-surface text-muted-foreground font-medium tabular-nums"
              >
                {formatBadgeDate(event.date)}
              </Badge>

              {/* Platform Badge */}
              {sourceLabel && (
                <Badge
                  variant="outline"
                  className="text-[10px] px-1.5 py-0 h-5 border-border bg-surface text-muted-foreground font-medium"
                >
                  {sourceLabel}
                </Badge>
              )}
            </div>

            {/* Participants */}
            {participantsDisplay && (
              <p className="text-xs text-muted-foreground/70 mt-0.5">
                {participantsDisplay}
              </p>
            )}
          </div>
        </div>

        {/* Summary */}
        <p className="text-xs text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
          {event.summary}
        </p>
      </div>
    </motion.button>
  );
}
