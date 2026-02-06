import { motion } from "motion/react";
import { UpNextCard } from "../cards";
import type { Meeting, MeetingAttendee } from "../../../types/meeting";

interface UpNextSectionProps {
  meeting: Meeting | null;
  onViewBrief: (meeting: Meeting) => void;
  onAttendeeClick?: (attendee: MeetingAttendee) => void;
}

/**
 * Featured section for the next upcoming meeting.
 * Clean divider before the prominent UpNextCard.
 */
export function UpNextSection({
  meeting,
  onViewBrief,
  onAttendeeClick,
}: UpNextSectionProps) {
  if (!meeting) {
    return (
      <section className="py-6">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border-subtle" />
          <span className="text-micro uppercase tracking-wider text-muted-foreground px-2">
            No upcoming meetings
          </span>
          <div className="h-px flex-1 bg-border-subtle" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-6">
      {/* Subtle divider */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.4 }}
        className="h-px bg-border-subtle mb-6"
      />

      {/* Featured card — "Up Next" label is inside the card */}
      <UpNextCard
        meeting={meeting}
        onViewBrief={() => onViewBrief(meeting)}
        onAttendeeClick={onAttendeeClick}
      />
    </section>
  );
}
