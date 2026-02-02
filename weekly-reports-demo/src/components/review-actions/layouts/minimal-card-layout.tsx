import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Calendar, Plus, X, AlertTriangle } from "lucide-react";
import type { LayoutProps } from "./types";
import { springs } from "../../../lib/motion";
import type { Participant } from "../../../types/action";

export function MinimalCardLayout({
  action,
  onUpdateDraft,
  onAddParticipant,
  onRemoveParticipant,
  onCycleRecipientType,
}: LayoutProps) {
  const [isAddingRecipient, setIsAddingRecipient] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const isEmail = action.type === "email";
  const participants = isEmail ? action.recipients : action.participants;
  const Icon = isEmail ? Mail : Calendar;
  const typeLabel = isEmail ? "Send Email" : "Schedule Meeting";

  // Auto-resize textarea
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.style.height = "auto";
      messageRef.current.style.height = `${Math.max(messageRef.current.scrollHeight, 160)}px`;
    }
  }, [isEmail ? action.message : action.description]);

  const handleAddParticipant = () => {
    if (!newName.trim()) return;
    const participant: Participant = {
      id: crypto.randomUUID(),
      name: newName.trim(),
      email: newEmail.trim(),
      matchStatus: "manual",
    };
    onAddParticipant(participant);
    setNewName("");
    setNewEmail("");
    setIsAddingRecipient(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddParticipant();
    } else if (e.key === "Escape") {
      setIsAddingRecipient(false);
      setNewName("");
      setNewEmail("");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Card container */}
      <div className="bg-surface rounded-lg border border-border-subtle p-6 space-y-4">
        {/* Action header */}
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-modal-label text-muted-foreground">
            <Icon className="size-3.5" />
            <span>{typeLabel}</span>
          </div>
          <h3 className="font-semibold text-modal-title text-foreground">
            {action.title}
          </h3>
        </div>

        {/* Calendar warning for meetings */}
        {!isEmail && !action.calendarConnected && (
          <p className="text-modal-micro text-muted-foreground flex items-center gap-1.5">
            <AlertTriangle className="size-3" />
            <span>
              Calendar not connected —{" "}
              <button className="underline hover:text-foreground transition-colors">
                connect
              </button>
            </span>
          </p>
        )}

        {/* Divider */}
        <div className="border-t border-border-subtle" />

        {/* Recipients/Participants as chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-modal-label text-muted-foreground shrink-0">
            {isEmail ? "To:" : "With:"}
          </span>

          <AnimatePresence mode="popLayout">
            {participants.map((participant) => (
              <motion.span
                key={participant.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={springs.quick}
                className="inline-flex items-center gap-1 pl-2.5 pr-1 py-1 bg-muted rounded-full text-modal-ui group"
              >
                <span className="text-foreground">{participant.name}</span>

                {/* CC/BCC badge inline */}
                {isEmail &&
                  participant.recipientType &&
                  participant.recipientType !== "to" && (
                    <button
                      onClick={() => onCycleRecipientType(participant.id)}
                      className="text-modal-micro uppercase text-muted-foreground bg-surface px-1 py-0.5 rounded hover:bg-muted/80 transition-colors"
                    >
                      {participant.recipientType}
                    </button>
                  )}

                {isEmail && participant.recipientType === "to" && (
                  <button
                    onClick={() => onCycleRecipientType(participant.id)}
                    className="text-modal-micro text-muted-foreground/40 hover:text-muted-foreground transition-colors"
                  >
                    to
                  </button>
                )}

                <button
                  onClick={() => onRemoveParticipant(participant.id)}
                  className="p-0.5 rounded-full hover:bg-surface transition-colors text-muted-foreground hover:text-foreground"
                  aria-label={`Remove ${participant.name}`}
                >
                  <X className="size-3" />
                </button>
              </motion.span>
            ))}
          </AnimatePresence>

          {/* Add recipient inline */}
          {isAddingRecipient ? (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              className="inline-flex items-center gap-1.5"
            >
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Name"
                className="w-24 bg-transparent border-b border-border-subtle focus:border-foreground text-modal-ui px-0 py-0.5 outline-none"
                autoFocus
              />
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => {
                  if (!newName.trim()) {
                    setIsAddingRecipient(false);
                  }
                }}
                placeholder="email"
                className="w-28 bg-transparent border-b border-border-subtle focus:border-foreground text-modal-micro text-muted-foreground px-0 py-0.5 outline-none"
              />
              {newName.trim() && (
                <button
                  onClick={handleAddParticipant}
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  <Plus className="size-4" />
                </button>
              )}
            </motion.div>
          ) : (
            <button
              onClick={() => setIsAddingRecipient(true)}
              className="inline-flex items-center gap-0.5 text-modal-label text-muted-foreground hover:text-foreground transition-colors"
            >
              <Plus className="size-3.5" />
            </button>
          )}
        </div>

        {/* Subject line - inline style */}
        <div className="flex items-baseline gap-2">
          <span className="text-modal-label text-muted-foreground shrink-0">
            {isEmail ? "Subject:" : "Name:"}
          </span>
          <input
            type="text"
            value={isEmail ? action.subject : action.meetingName}
            onChange={(e) =>
              onUpdateDraft(
                isEmail
                  ? { subject: e.target.value }
                  : { meetingName: e.target.value },
              )
            }
            placeholder={isEmail ? "Enter subject" : "Enter meeting name"}
            className="flex-1 bg-transparent border-0 text-modal-ui text-foreground outline-none placeholder:text-muted-foreground/50"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-border-subtle" />

        {/* Message body - document-like */}
        <textarea
          ref={messageRef}
          value={isEmail ? action.message : action.description}
          onChange={(e) =>
            onUpdateDraft(
              isEmail
                ? { message: e.target.value }
                : { description: e.target.value },
            )
          }
          placeholder={
            isEmail ? "Write your message..." : "Describe the meeting agenda..."
          }
          className="w-full min-h-[160px] bg-transparent border-0 text-modal-ui text-foreground outline-none resize-none placeholder:text-muted-foreground/50 leading-relaxed"
        />
      </div>
    </div>
  );
}
