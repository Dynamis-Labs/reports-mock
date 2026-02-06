import { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  PlayCircle,
  ListChecks,
  AlertCircle,
  Mail,
  ThumbsUp,
  ThumbsDown,
  Send,
  FileText,
  Users,
  Link2,
  Calendar,
  Clock,
  ExternalLink,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "../../lib/utils";
import {
  modalContentVariants,
  springs,
  staggerContainer,
  staggerItem,
} from "../../lib/motion";
import { Button } from "../ui/button";
import { VisibilityBadge, PlatformIndicator, AttendeeChips } from "./shared";
import { ContactDrawer } from "../crm/layouts/card-grid/contact-drawer";
import {
  findContactForAttendee,
  createContactFromAttendee,
} from "../../lib/contact-meeting-utils";
import { mockContacts } from "../../data/mock-contacts";
import type { Meeting, MeetingAttendee } from "../../types/meeting";
import type { Contact } from "../../types/contact";
import type { MeetingDetailMode } from "../../stores/meetings-store";

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

const aiActions = [
  { id: "summarize", icon: ListChecks, label: "Summarize action items" },
  { id: "concerns", icon: AlertCircle, label: "Find concerns raised" },
  { id: "followup", icon: Mail, label: "Draft follow-up email" },
];

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
  const [followUpText, setFollowUpText] = useState("");
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [selectedAttendee, setSelectedAttendee] = useState<Contact | null>(
    null,
  );
  const [isAttendeeDrawerOpen, setIsAttendeeDrawerOpen] = useState(false);

  // Handle attendee click to open contact drawer
  const handleAttendeeClick = (attendee: MeetingAttendee) => {
    const contact = findContactForAttendee(attendee, mockContacts);
    if (contact) {
      setSelectedAttendee(contact);
    } else {
      setSelectedAttendee(createContactFromAttendee(attendee));
    }
    setIsAttendeeDrawerOpen(true);
  };

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

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFollowUpText("");
      setFeedback(null);
    }
  }, [isOpen]);

  const handleAiAction = (_actionId: string) => {
    // TODO: Implement AI action handling
  };

  const handleFollowUp = () => {
    if (followUpText.trim()) {
      // TODO: Implement follow-up submission
      setFollowUpText("");
    }
  };

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
                        <Calendar className="size-3.5" strokeWidth={1.5} />
                        <span>{formatDate(meeting.date)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="size-3.5" strokeWidth={1.5} />
                        <span>{meeting.startTime}</span>
                      </div>
                      <span className="text-border">·</span>
                      <span>{formatDuration(meeting.duration)}</span>
                    </div>
                  </div>

                  {/* Close button */}
                  <button
                    type="button"
                    onClick={onClose}
                    className={cn(
                      "size-8 rounded-lg flex items-center justify-center shrink-0",
                      "text-muted-foreground hover:text-foreground",
                      "hover:bg-muted transition-colors duration-150",
                    )}
                    aria-label="Close meeting details"
                  >
                    <X className="size-4" strokeWidth={1.5} />
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
                      <ExternalLink className="size-4 ml-1.5" />
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
                    // Brief mode content
                    <>
                      {/* Agenda section */}
                      {meeting.agenda && (
                        <motion.section variants={staggerItem}>
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="size-4 text-muted-foreground" />
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
                            <FileText className="size-4 text-muted-foreground" />
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
                          <Users className="size-4 text-muted-foreground" />
                          <h3 className="text-micro font-medium text-muted-foreground uppercase tracking-wider">
                            Attendees ({meeting.attendees.length})
                          </h3>
                        </div>
                        <div className="space-y-2">
                          {meeting.attendees.map((attendee) => (
                            <button
                              key={attendee.id}
                              type="button"
                              onClick={() => handleAttendeeClick(attendee)}
                              className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors w-full text-left cursor-pointer"
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
                            <Link2 className="size-4 text-muted-foreground" />
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
                  ) : (
                    // Recap mode content
                    <>
                      {/* Recording banner */}
                      {meeting.hasRecording && meeting.recordingUrl && (
                        <motion.section variants={staggerItem}>
                          <a
                            href={meeting.recordingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              "flex items-center gap-3 p-4 rounded-xl",
                              "bg-accent/10 border border-accent/20",
                              "hover:bg-accent/15 transition-colors cursor-pointer",
                            )}
                          >
                            <div className="size-10 rounded-full bg-accent/20 flex items-center justify-center">
                              <PlayCircle className="size-5 text-accent" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                Watch Recording
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {meeting.duration} minutes
                              </p>
                            </div>
                          </a>
                        </motion.section>
                      )}

                      {/* Overview section */}
                      {meeting.overview && (
                        <motion.section variants={staggerItem}>
                          <h3 className="text-micro font-medium text-muted-foreground uppercase tracking-wider mb-2">
                            Overview
                          </h3>
                          <p className="text-sm text-foreground leading-relaxed">
                            {meeting.overview}
                          </p>
                        </motion.section>
                      )}

                      {/* Key Takeaways section */}
                      {meeting.keyTakeaways.length > 0 && (
                        <motion.section variants={staggerItem}>
                          <h3 className="text-micro font-medium text-muted-foreground uppercase tracking-wider mb-3">
                            Key Takeaways
                          </h3>
                          <div className="space-y-3">
                            {meeting.keyTakeaways.map((takeaway, index) => (
                              <div
                                key={takeaway.id}
                                className="flex items-start gap-3"
                              >
                                <span
                                  className={cn(
                                    "size-6 rounded-full flex items-center justify-center shrink-0",
                                    "bg-accent-muted text-accent text-xs font-semibold",
                                  )}
                                >
                                  {index + 1}
                                </span>
                                <p className="text-sm text-foreground pt-0.5">
                                  {takeaway.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        </motion.section>
                      )}

                      {/* Transcript preview (if available) */}
                      {meeting.transcript && (
                        <motion.section variants={staggerItem}>
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="size-4 text-muted-foreground" />
                            <h3 className="text-micro font-medium text-muted-foreground uppercase tracking-wider">
                              Transcript Preview
                            </h3>
                          </div>
                          <pre className="text-xs text-muted-foreground whitespace-pre-wrap bg-muted/30 p-4 rounded-lg max-h-32 overflow-y-auto">
                            {meeting.transcript}
                          </pre>
                        </motion.section>
                      )}

                      {/* AI Actions */}
                      <motion.section variants={staggerItem}>
                        <div className="flex flex-wrap gap-2">
                          {aiActions.map(({ id, icon: Icon, label }) => (
                            <motion.button
                              key={id}
                              type="button"
                              onClick={() => handleAiAction(id)}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2 rounded-lg",
                                "border border-border hover:border-accent/50",
                                "text-xs text-foreground hover:text-accent",
                                "transition-colors duration-150",
                              )}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              transition={springs.quick}
                            >
                              <Icon className="size-4" strokeWidth={1.5} />
                              <span>{label}</span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.section>

                      {/* Feedback */}
                      <motion.section variants={staggerItem}>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground">
                            Is this helpful?
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                setFeedback(feedback === "up" ? null : "up")
                              }
                              className={cn(
                                "size-8 rounded-md flex items-center justify-center",
                                "transition-colors duration-150",
                                feedback === "up"
                                  ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600"
                                  : "hover:bg-muted text-foreground/60 hover:text-foreground",
                              )}
                            >
                              <ThumbsUp className="size-4" strokeWidth={1.5} />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setFeedback(feedback === "down" ? null : "down")
                              }
                              className={cn(
                                "size-8 rounded-md flex items-center justify-center",
                                "transition-colors duration-150",
                                feedback === "down"
                                  ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600"
                                  : "hover:bg-muted text-foreground/60 hover:text-foreground",
                              )}
                            >
                              <ThumbsDown
                                className="size-4"
                                strokeWidth={1.5}
                              />
                            </button>
                          </div>
                        </div>
                      </motion.section>

                      {/* Follow-up input */}
                      <motion.section variants={staggerItem}>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Ask a follow-up..."
                            value={followUpText}
                            onChange={(e) => setFollowUpText(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleFollowUp()
                            }
                            className={cn(
                              "w-full h-11 pl-4 pr-12 rounded-xl",
                              "bg-muted/30 border border-border/50",
                              "text-sm text-foreground placeholder:text-muted-foreground/50",
                              "focus:outline-none focus:border-border focus:bg-background",
                              "transition-colors duration-150",
                            )}
                          />
                          <button
                            type="button"
                            onClick={handleFollowUp}
                            disabled={!followUpText.trim()}
                            className={cn(
                              "absolute right-2 top-1/2 -translate-y-1/2",
                              "size-7 rounded-lg flex items-center justify-center",
                              "transition-colors duration-150",
                              followUpText.trim()
                                ? "bg-accent text-accent-foreground hover:bg-accent/90"
                                : "text-muted-foreground/30",
                            )}
                          >
                            <Send className="size-4" strokeWidth={1.5} />
                          </button>
                        </div>
                      </motion.section>
                    </>
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
