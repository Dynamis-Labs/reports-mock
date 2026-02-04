import { motion } from "motion/react";
import { FileText, Users, Link2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { MeetingDetailHeader } from "./meeting-detail-header";
import { staggerContainer, staggerItem } from "../../../lib/motion";
import type { Meeting } from "../../../types/meeting";

interface MeetingBriefPaneProps {
  meeting: Meeting;
  onBack: () => void;
}

/**
 * Pre-meeting brief view for upcoming meetings
 * Shows agenda, attendees, and related context
 */
export function MeetingBriefPane({
  meeting,
  onBack: _onBack,
}: MeetingBriefPaneProps) {
  return (
    <div className="max-w-2xl mx-auto py-8 px-6">
      {/* Header */}
      <MeetingDetailHeader meeting={meeting} showJoinButton />

      {/* Content sections */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mt-8 space-y-8"
      >
        {/* Agenda section */}
        {meeting.agenda && (
          <motion.section variants={staggerItem}>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="size-4 text-muted-foreground" />
              <h2 className="text-micro font-medium text-muted-foreground uppercase tracking-wider">
                Agenda
              </h2>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{meeting.agenda}</ReactMarkdown>
            </div>
          </motion.section>
        )}

        {/* Description (if no agenda) */}
        {!meeting.agenda && meeting.description && (
          <motion.section variants={staggerItem}>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="size-4 text-muted-foreground" />
              <h2 className="text-micro font-medium text-muted-foreground uppercase tracking-wider">
                Description
              </h2>
            </div>
            <p className="text-body text-foreground leading-relaxed">
              {meeting.description}
            </p>
          </motion.section>
        )}

        {/* Attendees section */}
        <motion.section variants={staggerItem}>
          <div className="flex items-center gap-2 mb-3">
            <Users className="size-4 text-muted-foreground" />
            <h2 className="text-micro font-medium text-muted-foreground uppercase tracking-wider">
              Attendees ({meeting.attendees.length})
            </h2>
          </div>
          <div className="space-y-2">
            {meeting.attendees.map((attendee) => (
              <div
                key={attendee.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
              >
                <span className="size-8 rounded-full bg-accent/20 text-accent flex items-center justify-center text-ui font-medium">
                  {attendee.initials}
                </span>
                <div>
                  <p className="text-body font-medium">{attendee.name}</p>
                  <p className="text-caption text-muted-foreground">
                    {attendee.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Meeting link (if available) */}
        {meeting.meetingUrl && (
          <motion.section variants={staggerItem}>
            <div className="flex items-center gap-2 mb-3">
              <Link2 className="size-4 text-muted-foreground" />
              <h2 className="text-micro font-medium text-muted-foreground uppercase tracking-wider">
                Meeting Link
              </h2>
            </div>
            <a
              href={meeting.meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-body text-accent hover:underline break-all"
            >
              {meeting.meetingUrl}
            </a>
          </motion.section>
        )}
      </motion.div>
    </div>
  );
}
