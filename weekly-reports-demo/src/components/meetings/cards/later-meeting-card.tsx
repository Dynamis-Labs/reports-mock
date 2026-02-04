import { motion } from "motion/react";
import { cn } from "../../../lib/utils";
import { VisibilityBadge, PlatformIndicator } from "../shared";
import type { Meeting } from "../../../types/meeting";

interface LaterMeetingCardProps {
  meeting: Meeting;
  onClick?: () => void;
  className?: string;
}

/**
 * Medium card for later/upcoming meetings
 * Shows date badge, title, time, platform, and visibility
 */
export function LaterMeetingCard({
  meeting,
  onClick,
  className,
}: LaterMeetingCardProps) {
  const dayOfMonth = meeting.date.getDate();
  const monthShort = meeting.date.toLocaleDateString("en-US", {
    month: "short",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl cursor-pointer",
        "border border-border-subtle hover:border-border bg-background/50 hover:bg-muted/30",
        "transition-colors duration-200",
        className,
      )}
    >
      {/* Circular date badge */}
      <div className="size-12 rounded-full bg-muted/50 flex flex-col items-center justify-center shrink-0">
        <span className="text-micro font-medium text-muted-foreground uppercase">
          {monthShort}
        </span>
        <span className="text-body font-semibold leading-none">
          {dayOfMonth}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-body font-medium truncate">{meeting.title}</h3>
          <VisibilityBadge visibility={meeting.visibility} />
        </div>
        <div className="flex items-center gap-3 text-caption text-muted-foreground">
          <span>{meeting.startTime}</span>
          <span>·</span>
          <span>{meeting.duration} min</span>
          <span>·</span>
          <PlatformIndicator platform={meeting.platform} showLabel={false} />
        </div>
      </div>
    </motion.div>
  );
}
