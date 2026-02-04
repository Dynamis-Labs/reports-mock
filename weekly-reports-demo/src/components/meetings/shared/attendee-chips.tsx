import { cn } from "../../../lib/utils";
import type { MeetingAttendee } from "../../../types/meeting";

interface AttendeeChipsProps {
  attendees: MeetingAttendee[];
  maxDisplay?: number;
  className?: string;
}

/**
 * Displays attendee chips with initials and names
 * Shows up to maxDisplay attendees, with overflow indicator
 */
export function AttendeeChips({
  attendees,
  maxDisplay = 4,
  className,
}: AttendeeChipsProps) {
  const displayed = attendees.slice(0, maxDisplay);
  const overflow = attendees.length - maxDisplay;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {displayed.map((attendee) => (
        <div
          key={attendee.id}
          className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted/50 text-caption"
        >
          <span className="size-5 rounded-full bg-accent/20 text-accent flex items-center justify-center text-micro font-medium">
            {attendee.initials}
          </span>
          <span className="text-muted-foreground">{attendee.name}</span>
        </div>
      ))}
      {overflow > 0 && (
        <span className="text-caption text-muted-foreground">
          +{overflow} more
        </span>
      )}
    </div>
  );
}
