import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { MeetingListItem } from "../cards";
import { staggerContainer, staggerItem } from "../../../lib/motion";
import type { Meeting, MeetingAttendee } from "../../../types/meeting";

interface PastSectionProps {
  meetings: Meeting[];
  onSelectMeeting: (meeting: Meeting) => void;
  onAttendeeClick?: (attendee: MeetingAttendee) => void;
}

/**
 * Section showing past meetings as distinct card blocks.
 * "Needs attention" style — each meeting is a bordered card.
 * Includes "Scroll for history" indicator.
 */
export function PastSection({
  meetings,
  onSelectMeeting,
  onAttendeeClick,
}: PastSectionProps) {
  if (meetings.length === 0) {
    return null;
  }

  return (
    <section className="mb-6">
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center gap-2 py-3 text-muted-foreground"
      >
        <ChevronDown className="size-4 animate-bounce" />
        <span className="text-micro uppercase tracking-wider">
          Scroll for history
        </span>
      </motion.div>

      {/* Section label */}
      <h3 className="text-micro uppercase tracking-wider text-muted-foreground mb-3">
        Needs Attention
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
            <MeetingListItem
              meeting={meeting}
              onViewRecap={() => onSelectMeeting(meeting)}
              onAttendeeClick={onAttendeeClick}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
