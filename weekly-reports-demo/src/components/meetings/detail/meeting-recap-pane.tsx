import { useState } from "react";
import { motion } from "motion/react";
import {
  PlayCircle,
  ListChecks,
  AlertCircle,
  Mail,
  ThumbsUp,
  ThumbsDown,
  Send,
  FileText,
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { MeetingDetailHeader } from "./meeting-detail-header";
import { staggerContainer, staggerItem, springs } from "../../../lib/motion";
// Button is available if needed for future actions
import type { Meeting } from "../../../types/meeting";

interface MeetingRecapPaneProps {
  meeting: Meeting;
  onBack: () => void;
}

const aiActions = [
  { id: "summarize", icon: ListChecks, label: "Summarize action items" },
  { id: "concerns", icon: AlertCircle, label: "Find concerns raised" },
  { id: "followup", icon: Mail, label: "Draft follow-up email" },
];

/**
 * Meeting recap view for past meetings
 * Shows recording, overview, key takeaways, and AI actions
 */
export function MeetingRecapPane({
  meeting,
  onBack: _onBack,
}: MeetingRecapPaneProps) {
  const [followUpText, setFollowUpText] = useState("");
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const handleAiAction = (actionId: string) => {
    // Placeholder for AI action handling
    console.log("AI action triggered:", actionId);
  };

  const handleFollowUp = () => {
    if (followUpText.trim()) {
      console.log("Follow-up submitted:", followUpText);
      setFollowUpText("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-6">
      {/* Header */}
      <MeetingDetailHeader meeting={meeting} />

      {/* Content sections */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mt-8 space-y-8"
      >
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
                <p className="text-body font-medium text-foreground">
                  Watch Recording
                </p>
                <p className="text-caption text-muted-foreground">
                  {meeting.duration} minutes
                </p>
              </div>
            </a>
          </motion.section>
        )}

        {/* Overview section */}
        {meeting.overview && (
          <motion.section variants={staggerItem}>
            <h2 className="text-micro font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Overview
            </h2>
            <p className="text-body text-foreground leading-relaxed">
              {meeting.overview}
            </p>
          </motion.section>
        )}

        {/* Key Takeaways section */}
        {meeting.keyTakeaways.length > 0 && (
          <motion.section variants={staggerItem}>
            <h2 className="text-micro font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Key Takeaways
            </h2>
            <div className="space-y-3">
              {meeting.keyTakeaways.map((takeaway, index) => (
                <div key={takeaway.id} className="flex items-start gap-3">
                  <span
                    className={cn(
                      "size-6 rounded-full flex items-center justify-center shrink-0",
                      "bg-accent-muted text-accent text-caption font-semibold",
                    )}
                  >
                    {index + 1}
                  </span>
                  <p className="text-body text-foreground pt-0.5">
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
            <div className="flex items-center gap-2 mb-3">
              <FileText className="size-4 text-muted-foreground" />
              <h2 className="text-micro font-medium text-muted-foreground uppercase tracking-wider">
                Transcript Preview
              </h2>
            </div>
            <pre className="text-caption text-muted-foreground whitespace-pre-wrap bg-muted/30 p-4 rounded-lg max-h-40 overflow-y-auto">
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
                  "flex items-center gap-2 px-4 py-2 rounded-lg",
                  "border border-border hover:border-accent/50",
                  "text-ui text-foreground hover:text-accent",
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
            <span className="text-ui text-muted-foreground">
              Is this helpful?
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setFeedback(feedback === "up" ? null : "up")}
                className={cn(
                  "size-8 rounded-md flex items-center justify-center",
                  "transition-colors duration-150",
                  feedback === "up"
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600"
                    : "hover:bg-muted text-foreground/60 hover:text-white",
                )}
              >
                <ThumbsUp className="size-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => setFeedback(feedback === "down" ? null : "down")}
                className={cn(
                  "size-8 rounded-md flex items-center justify-center",
                  "transition-colors duration-150",
                  feedback === "down"
                    ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600"
                    : "hover:bg-muted text-foreground/60 hover:text-white",
                )}
              >
                <ThumbsDown className="size-4" strokeWidth={1.5} />
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
              onKeyDown={(e) => e.key === "Enter" && handleFollowUp()}
              className={cn(
                "w-full h-12 pl-4 pr-12 rounded-xl",
                "bg-muted/30 border border-border/50",
                "text-ui text-foreground placeholder:text-muted-foreground/50",
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
                "size-8 rounded-lg flex items-center justify-center",
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
      </motion.div>
    </div>
  );
}
