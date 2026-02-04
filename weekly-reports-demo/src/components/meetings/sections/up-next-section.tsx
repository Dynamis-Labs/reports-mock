import { motion } from "motion/react";
import { UpNextCard } from "../cards";
import type { Meeting } from "../../../types/meeting";

interface UpNextSectionProps {
  meeting: Meeting | null;
  onViewBrief: (meeting: Meeting) => void;
}

/**
 * Featured section for the next upcoming meeting
 * Shows green accent divider and prominent card
 */
export function UpNextSection({ meeting, onViewBrief }: UpNextSectionProps) {
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
      {/* Neutral divider with badge */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="h-px flex-1 bg-border-subtle" />
        <span className="text-micro font-medium uppercase tracking-wider text-muted-foreground px-2">
          Up Next
        </span>
        <div className="h-px flex-1 bg-border-subtle" />
      </motion.div>

      {/* Featured card */}
      <UpNextCard meeting={meeting} onViewBrief={() => onViewBrief(meeting)} />
    </section>
  );
}
