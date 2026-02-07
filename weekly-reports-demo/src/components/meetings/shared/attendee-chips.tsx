import { cn } from "@lib/utils";
import type { MeetingAttendee } from "@types/meeting";

interface AttendeeChipsProps {
  attendees: MeetingAttendee[];
  maxDisplay?: number;
  onAttendeeClick?: (attendee: MeetingAttendee) => void;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Displays attendee chips with initials and names.
 * Names are individually clickable when onAttendeeClick is provided,
 * opening the contact profile drawer.
 * Renders as <span> when not clickable (accessibility).
 */
export function AttendeeChips({
  attendees,
  maxDisplay = 4,
  onAttendeeClick,
  size = "sm",
  className,
}: AttendeeChipsProps) {
  const displayed = attendees.slice(0, maxDisplay);
  const overflow = attendees.length - maxDisplay;

  const isMd = size === "md";

  const chipContent = (attendee: MeetingAttendee) => (
    <>
      <span
        className={cn(
          "rounded-full bg-accent/20 text-accent flex items-center justify-center font-medium",
          isMd ? "size-7 text-xs" : "size-5 text-micro",
        )}
      >
        {attendee.initials}
      </span>
      <span className="text-muted-foreground">{attendee.name}</span>
    </>
  );

  const chipClass = cn(
    "flex items-center rounded-full bg-muted/50",
    isMd ? "gap-2 px-2.5 py-1.5 text-sm" : "gap-1.5 px-2 py-1 text-caption",
  );

  return (
    <div
      className={cn(
        "flex flex-wrap items-center",
        isMd ? "gap-2.5" : "gap-2",
        className,
      )}
    >
      {displayed.map((attendee) =>
        onAttendeeClick ? (
          <button
            key={attendee.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAttendeeClick(attendee);
            }}
            className={cn(
              chipClass,
              "cursor-pointer",
              "hover:bg-accent/10 hover:ring-1 hover:ring-accent/20",
              "active:scale-[0.97]",
              "transition-all duration-150",
            )}
          >
            {chipContent(attendee)}
          </button>
        ) : (
          <span key={attendee.id} className={chipClass}>
            {chipContent(attendee)}
          </span>
        ),
      )}
      {overflow > 0 && (
        <span
          className={cn(
            "text-muted-foreground",
            isMd ? "text-sm" : "text-caption",
          )}
        >
          +{overflow} more
        </span>
      )}
    </div>
  );
}
