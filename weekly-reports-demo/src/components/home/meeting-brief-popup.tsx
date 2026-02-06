/**
 * Meeting Brief Popup
 *
 * AI-generated brief showing meeting context and key points.
 * Features:
 * - Meeting context (why this matters)
 * - Key points to prepare
 * - Discussion topics
 * - Clean modal design
 */

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Target, MessageSquare, CheckCircle } from "lucide-react";
import { cn } from "../../lib/utils";
import { springs } from "../../lib/motion";
import { useHomeStore } from "../../stores/home-store";
import { mockMeetingBriefs } from "../../data/mock-home";
import { mockMeetings } from "../../data/mock-meetings";

export function MeetingBriefPopup() {
  const isOpen = useHomeStore((state) => state.isBriefPopupOpen);
  const selectedMeetingId = useHomeStore((state) => state.selectedMeetingId);
  const closePopup = useHomeStore((state) => state.closeBriefPopup);

  const meeting = mockMeetings.find((m) => m.id === selectedMeetingId);
  const brief = selectedMeetingId ? mockMeetingBriefs[selectedMeetingId] : null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePopup();
      }
    },
    [closePopup],
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

  if (!meeting) return null;

  // Generate a fallback brief if none exists
  const displayBrief = brief || {
    meetingId: meeting.id,
    context:
      meeting.description ||
      meeting.summary ||
      "No additional context available.",
    keyPoints:
      meeting.keyTakeaways?.slice(0, 3).map((kt) => ({
        id: kt.id,
        text: kt.text,
      })) || [],
    discussionTopics: [],
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={closePopup}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={springs.default}
            className={cn(
              "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-full max-w-lg max-h-[85vh]",
              "bg-background rounded-xl shadow-float border border-border",
              "flex flex-col z-50",
            )}
          >
            {/* Header */}
            <header className="shrink-0 px-6 py-4 border-b border-border/40">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* AI badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={cn(
                        "flex items-center gap-1.5 px-2 py-1 rounded-md",
                        "bg-accent-muted",
                      )}
                    >
                      <Sparkles
                        className="size-3.5 text-accent"
                        strokeWidth={1.5}
                      />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                        AI Brief
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="font-semibold text-lg text-foreground">
                    {meeting.title}
                  </h2>

                  {/* Time info */}
                  <p className="text-caption text-muted-foreground mt-1">
                    {meeting.startTime} · {meeting.duration} minutes
                  </p>
                </div>

                {/* Close button */}
                <button
                  onClick={closePopup}
                  className="p-2 -m-2 text-muted-foreground/50 hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <X className="size-5" strokeWidth={1.5} />
                </button>
              </div>
            </header>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {/* Context */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Target
                    className="size-4 text-muted-foreground"
                    strokeWidth={1.5}
                  />
                  <h3 className="text-micro font-medium text-muted-foreground/60 uppercase tracking-wider">
                    Context
                  </h3>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {displayBrief.context}
                </p>
              </section>

              {/* Key Points */}
              {displayBrief.keyPoints.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle
                      className="size-4 text-muted-foreground"
                      strokeWidth={1.5}
                    />
                    <h3 className="text-micro font-medium text-muted-foreground/60 uppercase tracking-wider">
                      Key Points
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {displayBrief.keyPoints.map((point) => (
                      <li
                        key={point.id}
                        className="flex items-start gap-3 text-sm text-foreground/90"
                      >
                        <span className="size-1.5 rounded-full bg-accent shrink-0 mt-2" />
                        <span>{point.text}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Discussion Topics */}
              {displayBrief.discussionTopics.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare
                      className="size-4 text-muted-foreground"
                      strokeWidth={1.5}
                    />
                    <h3 className="text-micro font-medium text-muted-foreground/60 uppercase tracking-wider">
                      Discussion Topics
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {displayBrief.discussionTopics.map((topic, index) => (
                      <li
                        key={topic.id}
                        className="flex items-start gap-3 text-sm text-foreground/90"
                      >
                        <span className="text-muted-foreground/60 font-medium tabular-nums">
                          {index + 1}.
                        </span>
                        <span>{topic.text}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Prep Items */}
              {displayBrief.prepItems && displayBrief.prepItems.length > 0 && (
                <section className="pt-4 border-t border-border/40">
                  <h3 className="text-micro font-medium text-muted-foreground/60 uppercase tracking-wider mb-3">
                    Before the Meeting
                  </h3>
                  <ul className="space-y-2">
                    {displayBrief.prepItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-start gap-3 text-sm text-foreground/90"
                      >
                        <span className="size-1.5 rounded-full bg-muted-foreground/30 shrink-0 mt-2" />
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
