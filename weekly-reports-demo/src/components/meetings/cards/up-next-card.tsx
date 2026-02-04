import { motion } from "motion/react";
import { ChevronRight, ExternalLink, Circle } from "lucide-react";
import { cn } from "../../../lib/utils";
import { getMinutesUntilMeeting } from "../../../lib/date-utils";
import {
  VisibilityBadge,
  PlatformIndicator,
  CountdownTimer,
  AttendeeChips,
} from "../shared";
import { Button } from "../../ui/button";
import type { Meeting } from "../../../types/meeting";

interface UpNextCardProps {
  meeting: Meeting;
  onViewBrief?: () => void;
  className?: string;
}

/**
 * Featured card for the next upcoming meeting
 * Shows countdown timer, description, attendees, and join button
 * Green accent styling to draw attention
 */
export function UpNextCard({
  meeting,
  onViewBrief,
  className,
}: UpNextCardProps) {
  const minutesUntil = getMinutesUntilMeeting(meeting);
  const isStartingSoon = minutesUntil <= 15 && minutesUntil > 0;
  const isStartingNow = minutesUntil <= 0 && minutesUntil > -meeting.duration;

  const handleJoin = () => {
    if (meeting.meetingUrl) {
      window.open(meeting.meetingUrl, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-xl border bg-background p-6",
        isStartingNow
          ? "border-success/50 shadow-lg shadow-success/10"
          : isStartingSoon
            ? "border-success/30"
            : "border-border-subtle",
        className,
      )}
    >
      {/* Header: Status + Countdown */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {(isStartingSoon || isStartingNow) && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-success">
              <Circle className="size-1.5 fill-current animate-pulse" />
              {isStartingNow ? "In Progress" : "Starting Soon"}
            </span>
          )}
          <VisibilityBadge visibility={meeting.visibility} />
        </div>
        <CountdownTimer meeting={meeting} />
      </div>

      {/* Title */}
      <h2 className="text-title font-semibold mb-2">{meeting.title}</h2>

      {/* Description */}
      {meeting.description && (
        <p className="text-body text-muted-foreground mb-3 line-clamp-2">
          {meeting.description}
        </p>
      )}

      {/* View Brief link */}
      <button
        onClick={onViewBrief}
        className="text-muted-foreground hover:text-foreground text-ui font-medium mb-4 flex items-center gap-0.5 hover:gap-1.5 transition-all"
      >
        View Brief <ChevronRight className="size-4" />
      </button>

      {/* Attendees */}
      <AttendeeChips attendees={meeting.attendees} className="mb-4" />

      {/* Footer: Platform + Join */}
      <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
        <PlatformIndicator platform={meeting.platform} />
        {meeting.meetingUrl && (
          <Button variant="default" onClick={handleJoin}>
            Join Now
            <ExternalLink className="size-4 ml-1.5" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
