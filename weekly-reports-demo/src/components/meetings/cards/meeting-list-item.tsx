import { motion } from "motion/react";
import { Calendar, Eye, FileText, Share2 } from "lucide-react";
import { cn } from "../../../lib/utils";
import { formatMeetingDate } from "../../../lib/date-utils";
import { VisibilityBadge } from "../shared";
import { Button } from "../../ui/button";
import type { Meeting } from "../../../types/meeting";

interface MeetingListItemProps {
  meeting: Meeting;
  onViewRecap?: () => void;
  className?: string;
}

/**
 * Compact row for past meetings
 * Shows title, visibility, date, attendee count
 * Hover reveals action buttons
 */
export function MeetingListItem({
  meeting,
  onViewRecap,
  className,
}: MeetingListItemProps) {
  const dateStr = formatMeetingDate(meeting.date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group flex items-center gap-4 px-4 py-3 rounded-lg",
        "border border-transparent hover:border-border-subtle hover:bg-muted/30",
        "transition-colors duration-200 cursor-pointer",
        className,
      )}
      onClick={onViewRecap}
    >
      {/* Calendar icon */}
      <div className="size-9 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
        <Calendar className="size-4 text-muted-foreground" />
      </div>

      {/* Title & badges */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-body font-medium truncate">{meeting.title}</h3>
          <VisibilityBadge visibility={meeting.visibility} />
        </div>
        <div className="flex items-center gap-2 text-caption text-muted-foreground mt-0.5">
          <span>{dateStr}</span>
          <span>·</span>
          <span>{meeting.startTime}</span>
          <span>·</span>
          <span>{meeting.attendees.length} attendees</span>
        </div>
      </div>

      {/* Hover actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {meeting.hasRecording && (
          <Button
            variant="ghost"
            size="sm"
            className="size-8 p-0"
            onClick={(e) => {
              e.stopPropagation();
              // View transcript action
            }}
          >
            <FileText className="size-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="size-8 p-0"
          onClick={(e) => {
            e.stopPropagation();
            onViewRecap?.();
          }}
        >
          <Eye className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="size-8 p-0"
          onClick={(e) => {
            e.stopPropagation();
            // Share action
          }}
        >
          <Share2 className="size-4" />
        </Button>
      </div>
    </motion.div>
  );
}
