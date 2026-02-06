import { motion } from "motion/react";
import { cn } from "../../../lib/utils";
import { AttendeeChips, PlatformIndicator } from "../shared";
import type { Meeting, MeetingAttendee } from "../../../types/meeting";

interface LaterMeetingCardProps {
  meeting: Meeting;
  onClick?: () => void;
  onAttendeeClick?: (attendee: MeetingAttendee) => void;
  className?: string;
}

/**
 * Medium card for later/upcoming meetings
 * Default view: platform icon + title, short description, clickable attendee names
 */
export function LaterMeetingCard({
  meeting,
  onClick,
  onAttendeeClick,
  className,
}: LaterMeetingCardProps) {
  return (
    <motion.div
      role="button"
      tabIndex={0}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        "p-4 rounded-xl cursor-pointer",
        "border border-border-subtle hover:border-border bg-background/50 hover:bg-muted/30",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-1",
        className,
      )}
    >
      {/* Title row with platform icon */}
      <div className="flex items-center gap-2 mb-1">
        <PlatformIndicator
          platform={meeting.platform}
          location={meeting.location}
          showLabel={false}
        />
        <h3 className="text-body font-medium text-foreground truncate">
          {meeting.title}
        </h3>
      </div>

      {/* Short description */}
      {meeting.description && (
        <p className="text-caption text-muted-foreground line-clamp-1 mb-2.5">
          {meeting.description}
        </p>
      )}

      {/* Attendee names */}
      <AttendeeChips
        attendees={meeting.attendees}
        maxDisplay={3}
        onAttendeeClick={onAttendeeClick}
      />
    </motion.div>
  );
}
