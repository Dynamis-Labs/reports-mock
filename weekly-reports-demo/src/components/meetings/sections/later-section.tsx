import { motion } from "motion/react";
import { LaterMeetingCard } from "../cards";
import { staggerContainer, staggerItem } from "../../../lib/motion";
import type { Meeting } from "../../../types/meeting";

interface LaterSectionProps {
  meetings: Meeting[];
  onSelectMeeting: (meeting: Meeting) => void;
}

/**
 * Section showing later/upcoming meetings
 * Meetings displayed as medium-sized cards
 */
export function LaterSection({ meetings, onSelectMeeting }: LaterSectionProps) {
  if (meetings.length === 0) {
    return null;
  }

  return (
    <section className="py-6">
      {/* Section header */}
      <h3 className="text-micro uppercase tracking-wider text-muted-foreground mb-4">
        Later
      </h3>

      {/* Meeting cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {meetings.map((meeting) => (
          <motion.div key={meeting.id} variants={staggerItem}>
            <LaterMeetingCard
              meeting={meeting}
              onClick={() => onSelectMeeting(meeting)}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
