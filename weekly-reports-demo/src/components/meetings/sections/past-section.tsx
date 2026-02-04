import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { MeetingListItem } from "../cards";
import { staggerContainer, staggerItem } from "../../../lib/motion";
import type { Meeting } from "../../../types/meeting";

interface PastSectionProps {
  meetings: Meeting[];
  onSelectMeeting: (meeting: Meeting) => void;
}

/**
 * Section showing past meetings from today
 * Includes "Scroll for history" indicator
 * Meetings are displayed as compact list items
 */
export function PastSection({ meetings, onSelectMeeting }: PastSectionProps) {
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

      {/* Meeting list */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-1"
      >
        {meetings.map((meeting) => (
          <motion.div key={meeting.id} variants={staggerItem}>
            <MeetingListItem
              meeting={meeting}
              onViewRecap={() => onSelectMeeting(meeting)}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
