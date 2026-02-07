import { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Calendar01Icon,
  Clock01Icon,
  Link03Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@lib/utils";
import { modalContentVariants, springs, staggerContainer } from "@lib/motion";
import { Button } from "@components/ui/button";
import { VisibilityBadge, PlatformIndicator, AttendeeChips } from "./shared";
import { ContactDrawer } from "@components/crm/layouts/card-grid/contact-drawer";
import {
  findContactForAttendee,
  createContactFromAttendee,
} from "@lib/contact-meeting-utils";
import { mockContacts } from "@data/contacts";
import { MeetingBriefContent } from "./detail/meeting-brief-content";
import { MeetingRecapContent } from "./detail/meeting-recap-content";
import type { Meeting, MeetingAttendee } from "@types/meeting";
import type { Contact } from "@types/contact";
import type { MeetingDetailMode } from "@stores/meetings-store";

/**
 * Meeting Detail Modal
 *
 * Centered popup for viewing meeting details (both brief and recap modes).
 * Matches the review-actions-modal pattern:
 * - Portal-based rendering
 * - Backdrop with blur
 * - Escape key / outside click to close
 * - Body scroll lock
 * - Focus trap
 */

interface MeetingDetailModalProps {
  meeting: Meeting | null;
  mode: MeetingDetailMode | null;
  isOpen: boolean;
  onClose: () => void;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  }
  return `${hours}h ${remainingMinutes}m`;
}

export function MeetingDetailModal({
  meeting,
  mode,
  isOpen,
  onClose,
}: MeetingDetailModalProps) {
  const [selectedAttendee, setSelectedAttendee] = useState<Contact | null>(
    null,
  );
  const [isAttendeeDrawerOpen, setIsAttendeeDrawerOpen] = useState(false);

  // Handle attendee click to open contact drawer
  const handleAttendeeClick = useCallback((attendee: MeetingAttendee) => {
    const contact = findContactForAttendee(attendee, mockContacts);
    if (contact) {
      setSelectedAttendee(contact);
    } else {
      setSelectedAttendee(createContactFromAttendee(attendee));
    }
    setIsAttendeeDrawerOpen(true);
  }, []);

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  // Focus trap
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        const modal = document.getElementById("meeting-detail-modal");
        const firstFocusable = modal?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        firstFocusable?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleJoin = () => {
    if (meeting?.meetingUrl) {
      window.open(meeting.meetingUrl, "_blank");
    }
  };

  const content = (
    <AnimatePresence>
      {isOpen && meeting && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal container */}
          <div
            id="meeting-detail-modal"
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="meeting-detail-title"
          >
            {/* Modal content */}
            <motion.div
              className="relative w-full bg-surface-elevated rounded-xl shadow-float border border-border pointer-events-auto max-w-lg max-h-[80vh] flex flex-col"
              variants={modalContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={springs.default}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="shrink-0 px-6 py-5 border-b border-border-subtle">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Badges */}
                    <div className="flex items-center gap-2 mb-2">
                      <VisibilityBadge visibility={meeting.visibility} />
                      <PlatformIndicator
                        platform={meeting.platform}
                        location={meeting.location}
                      />
                    </div>

                    {/* Title */}
                    <h2
                      id="meeting-detail-title"
                      className="text-lg font-semibold text-foreground truncate"
                    >
                      {meeting.title}
                    </h2>

                    {/* Metadata row */}
                    <div className="flex items-center gap-3 text-caption text-muted-foreground mt-2">
                      <div className="flex items-center gap-1.5">
                        <HugeiconsIcon
                          icon={Calendar01Icon}
                          size={14}
                          strokeWidth={1.5}
                        />
                        <span>{formatDate(meeting.date)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <HugeiconsIcon
                          icon={Clock01Icon}
                          size={14}
                          strokeWidth={1.5}
                        />
                        <span>{meeting.startTime}</span>
                      </div>
                      <span className="text-border">&middot;</span>
                      <span>{formatDuration(meeting.duration)}</span>
                    </div>
                  </div>

                  {/* Close button */}
                  <button
                    type="button"
                    onClick={onClose}
                    className={cn(
                      "size-8 rounded-[var(--radius-lg)] flex items-center justify-center shrink-0",
                      "text-muted-foreground hover:text-foreground",
                      "hover:bg-muted transition-colors duration-150",
                    )}
                    aria-label="Close meeting details"
                  >
                    <HugeiconsIcon
                      icon={Cancel01Icon}
                      size={16}
                      strokeWidth={1.5}
                    />
                  </button>
                </div>

                {/* Attendees */}
                <div className="mt-3">
                  <AttendeeChips attendees={meeting.attendees} maxDisplay={6} />
                </div>

                {/* Join button (for upcoming meetings) */}
                {mode === "brief" && meeting.meetingUrl && (
                  <div className="mt-4">
                    <Button variant="default" onClick={handleJoin}>
                      Join Meeting
                      <HugeiconsIcon icon={Link03Icon} size={16} />
                    </Button>
                  </div>
                )}
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  {mode === "brief" ? (
                    <MeetingBriefContent
                      meeting={meeting}
                      onAttendeeClick={handleAttendeeClick}
                    />
                  ) : (
                    <MeetingRecapContent meeting={meeting} />
                  )}
                </motion.div>
              </div>

              {/* Footer */}
              <div className="shrink-0 px-6 py-4 border-t border-border-subtle flex items-center justify-end">
                <Button variant="outline" size="sm" onClick={onClose}>
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {createPortal(content, document.body)}
      <ContactDrawer
        contact={selectedAttendee}
        isOpen={isAttendeeDrawerOpen}
        onClose={() => setIsAttendeeDrawerOpen(false)}
      />
    </>
  );
}
