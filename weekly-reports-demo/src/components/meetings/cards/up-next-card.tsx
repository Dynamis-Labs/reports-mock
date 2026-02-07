import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Link03Icon,
  CircleIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@lib/utils";
import { getMinutesUntilMeeting } from "@lib/date-utils";
import { PlatformIndicator, CountdownTimer, AttendeeChips } from "../shared";
import { Button } from "@components/ui/button";
import type { Meeting, MeetingAttendee } from "@types/meeting";

interface UpNextCardProps {
  meeting: Meeting;
  onViewBrief?: () => void;
  onAttendeeClick?: (attendee: MeetingAttendee) => void;
  className?: string;
}

/**
 * Featured card for the next upcoming meeting — compact square layout.
 * Shows status badge, countdown, title, description, view brief link,
 * attendee chips, and platform + join button footer.
 */
export function UpNextCard({
  meeting,
  onViewBrief,
  onAttendeeClick,
  className,
}: UpNextCardProps) {
  const minutesUntil = getMinutesUntilMeeting(meeting);
  const isStartingSoon = minutesUntil <= 15 && minutesUntil > 0;
  const isStartingNow = minutesUntil <= 0 && minutesUntil > -meeting.duration;

  const handleJoin = () => {
    if (meeting.meetingUrl) {
      window.open(meeting.meetingUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative rounded-2xl border bg-background overflow-hidden",
        isStartingNow
          ? "border-success/40"
          : isStartingSoon
            ? "border-success/25"
            : "border-border",
        className,
      )}
      style={{
        boxShadow: isStartingNow
          ? "0 10px 28px -6px color-mix(in srgb, var(--color-success) 18%, transparent)"
          : isStartingSoon
            ? "0 10px 28px -6px color-mix(in srgb, var(--color-success) 12%, transparent)"
            : "0 10px 28px -6px color-mix(in srgb, var(--color-accent) 10%, transparent)",
      }}
    >
      {/* Subtle top accent gradient */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-px",
          isStartingNow || isStartingSoon
            ? "bg-gradient-to-r from-transparent via-success/50 to-transparent"
            : "bg-gradient-to-r from-transparent via-accent/30 to-transparent",
        )}
      />

      <div className="p-5">
        {/* Row 1: Status badge (left) + Countdown (right) */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {isStartingSoon || isStartingNow ? (
              <span className="inline-flex items-center gap-1.5 text-micro font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
                <span className="fill-current animate-pulse">
                  <HugeiconsIcon icon={CircleIcon} size={6} />
                </span>
                {isStartingNow ? "In Progress" : "Starting Soon"}
              </span>
            ) : (
              <span className="text-micro font-medium uppercase tracking-wider text-muted-foreground/60">
                Up Next
              </span>
            )}
          </div>
          <CountdownTimer meeting={meeting} />
        </div>

        {/* Row 2: Title */}
        <h2 className="text-lg font-semibold text-foreground leading-tight mb-1.5">
          {meeting.title}
        </h2>

        {/* Row 3: Short description */}
        {meeting.description && (
          <p className="text-ui text-muted-foreground line-clamp-2 mb-3">
            {meeting.description}
          </p>
        )}

        {/* Row 4: View Brief link */}
        <button
          type="button"
          onClick={onViewBrief}
          className="text-accent hover:text-accent/80 text-ui font-medium mb-3 flex items-center gap-0.5 hover:gap-1.5 transition-all rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-1"
        >
          View Brief <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
        </button>

        {/* Row 5: Attendees */}
        <AttendeeChips
          attendees={meeting.attendees}
          onAttendeeClick={onAttendeeClick}
          maxDisplay={4}
        />

        {/* Row 6: Footer — platform + join */}
        <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-border-subtle">
          <PlatformIndicator
            platform={meeting.platform}
            location={meeting.location}
          />
          {meeting.meetingUrl && (
            <Button
              variant="default"
              onClick={handleJoin}
              className="h-8 text-caption px-3"
            >
              Join Now
              <HugeiconsIcon icon={Link03Icon} size={14} />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
