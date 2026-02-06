import { motion } from "motion/react";
import { LaterMeetingCard } from "../cards";
import { staggerContainer, staggerItem } from "../../../lib/motion";
import type { Meeting, MeetingAttendee } from "../../../types/meeting";

interface LaterSectionProps {
  meetings: Meeting[];
  onSelectMeeting: (meeting: Meeting) => void;
  onAttendeeClick?: (attendee: MeetingAttendee) => void;
}

/**
 * Section showing later/upcoming meetings as medium cards.
 * Consistent visual treatment with other sections.
 */
export function LaterSection({
  meetings,
  onSelectMeeting,
  onAttendeeClick,
}: LaterSectionProps) {
  if (meetings.length === 0) {
    return null;
  }

  return (
    <section className="py-6">
      {/* Divider + label */}
      <div className="h-px bg-border-subtle mb-4" />
      <h3 className="text-micro uppercase tracking-wider text-muted-foreground mb-3">
        Later
      </h3>

      {/* Meeting cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-2.5"
      >
        {meetings.map((meeting) => (
          <motion.div key={meeting.id} variants={staggerItem}>
            <LaterMeetingCard
              meeting={meeting}
              onClick={() => onSelectMeeting(meeting)}
              onAttendeeClick={onAttendeeClick}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
