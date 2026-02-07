import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  File01Icon,
  UserGroupIcon,
  Link03Icon,
} from "@hugeicons/core-free-icons";
import ReactMarkdown from "react-markdown";
import { staggerItem } from "@lib/motion";
import type { Meeting, MeetingAttendee } from "@types/meeting";

interface MeetingBriefContentProps {
  meeting: Meeting;
  onAttendeeClick: (attendee: MeetingAttendee) => void;
}

/**
 * Brief mode content sections for the meeting detail modal.
 * Renders agenda/description, attendee list, and meeting link.
 */
export function MeetingBriefContent({
  meeting,
  onAttendeeClick,
}: MeetingBriefContentProps) {
  return (
    <>
      {/* Agenda section */}
      {meeting.agenda && (
        <motion.section variants={staggerItem}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-muted-foreground">
              <HugeiconsIcon icon={File01Icon} size={16} />
            </span>
            <h3 className="text-micro font-medium text-muted-foreground uppercase tracking-wider">
              Agenda
            </h3>
          </div>
          <div className="prose prose-sm max-w-none [&_*]:text-foreground [&_a]:text-accent [&_strong]:text-foreground [&_h1]:text-foreground [&_h2]:text-foreground [&_h3]:text-foreground">
            <ReactMarkdown>{meeting.agenda}</ReactMarkdown>
          </div>
        </motion.section>
      )}

      {/* Description (if no agenda) */}
      {!meeting.agenda && meeting.description && (
        <motion.section variants={staggerItem}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-muted-foreground">
              <HugeiconsIcon icon={File01Icon} size={16} />
            </span>
            <h3 className="text-micro font-medium text-muted-foreground uppercase tracking-wider">
              Description
            </h3>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            {meeting.description}
          </p>
        </motion.section>
      )}

      {/* Attendees section */}
      <motion.section variants={staggerItem}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-muted-foreground">
            <HugeiconsIcon icon={UserGroupIcon} size={16} />
          </span>
          <h3 className="text-micro font-medium text-muted-foreground uppercase tracking-wider">
            Attendees ({meeting.attendees.length})
          </h3>
        </div>
        <div className="space-y-2">
          {meeting.attendees.map((attendee) => (
            <button
              key={attendee.id}
              type="button"
              onClick={() => onAttendeeClick(attendee)}
              className="flex items-center gap-3 p-3 rounded-[var(--radius-lg)] bg-muted/30 hover:bg-muted/50 transition-colors w-full text-left cursor-pointer"
            >
              <span className="size-8 rounded-full bg-accent/20 text-accent flex items-center justify-center text-ui font-medium">
                {attendee.initials}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {attendee.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {attendee.email}
                </p>
              </div>
            </button>
          ))}
        </div>
      </motion.section>

      {/* Meeting link (if available) */}
      {meeting.meetingUrl && (
        <motion.section variants={staggerItem}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-muted-foreground">
              <HugeiconsIcon icon={Link03Icon} size={16} />
            </span>
            <h3 className="text-micro font-medium text-muted-foreground uppercase tracking-wider">
              Meeting Link
            </h3>
          </div>
          <a
            href={meeting.meetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent hover:underline break-all"
          >
            {meeting.meetingUrl}
          </a>
        </motion.section>
      )}
    </>
  );
}
