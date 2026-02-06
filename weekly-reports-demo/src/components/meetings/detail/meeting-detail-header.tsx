import { Calendar, Clock, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { VisibilityBadge, PlatformIndicator, AttendeeChips } from "../shared";
import { Button } from "../../ui/button";
import type { Meeting } from "../../../types/meeting";

interface MeetingDetailHeaderProps {
  meeting: Meeting;
  showJoinButton?: boolean;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  }
  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Meeting detail header with title, metadata, attendees
 * Used in both brief and recap views
 */
export function MeetingDetailHeader({
  meeting,
  showJoinButton = false,
}: MeetingDetailHeaderProps) {
  const handleJoin = () => {
    if (meeting.meetingUrl) {
      window.open(meeting.meetingUrl, "_blank");
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="pb-6 border-b border-border-subtle"
    >
      {/* Badges */}
      <div className="flex items-center gap-2 mb-3">
        <VisibilityBadge visibility={meeting.visibility} />
        <PlatformIndicator
          platform={meeting.platform}
          location={meeting.location}
        />
      </div>

      {/* Title */}
      <h1 className="text-display font-semibold text-foreground mb-3">
        {meeting.title}
      </h1>

      {/* Metadata row */}
      <div className="flex items-center gap-4 text-ui text-muted-foreground mb-4">
        <div className="flex items-center gap-1.5">
          <Calendar className="size-4" strokeWidth={1.5} />
          <span>{formatDate(meeting.date)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="size-4" strokeWidth={1.5} />
          <span>{meeting.startTime}</span>
        </div>
        <span className="text-border">·</span>
        <span>{formatDuration(meeting.duration)}</span>
      </div>

      {/* Attendees */}
      <AttendeeChips attendees={meeting.attendees} maxDisplay={6} />

      {/* Join button (for upcoming meetings) */}
      {showJoinButton && meeting.meetingUrl && (
        <div className="mt-4">
          <Button variant="default" onClick={handleJoin}>
            Join Meeting
            <ExternalLink className="size-4 ml-1.5" />
          </Button>
        </div>
      )}
    </motion.header>
  );
}
