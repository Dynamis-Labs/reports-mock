import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Calendar,
  Plus,
  X,
  Check,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import type { LayoutProps } from "./types";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { springs } from "../../../lib/motion";
import type { Participant } from "../../../types/action";

export function AccordionLayout({
  action,
  onUpdateDraft,
  onAddParticipant,
  onRemoveParticipant,
  onCycleRecipientType,
}: LayoutProps) {
  const [recipientsExpanded, setRecipientsExpanded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const isEmail = action.type === "email";
  const participants = isEmail ? action.recipients : action.participants;
  const Icon = isEmail ? Mail : Calendar;
  const typeLabel = isEmail ? "Send Email" : "Schedule Meeting";
  const participantLabel = isEmail ? "Recipients" : "Participants";

  // Auto-resize textarea
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.style.height = "auto";
      messageRef.current.style.height = `${Math.max(messageRef.current.scrollHeight, 180)}px`;
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
    setIsAdding(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddParticipant();
    } else if (e.key === "Escape") {
      setIsAdding(false);
      setNewName("");
      setNewEmail("");
    }
  };

  return (
    <div className="space-y-3">
      {/* Action header card */}
      <div className="bg-surface rounded-lg border border-border-subtle px-4 py-3">
        <div className="flex items-center gap-2">
          <Icon className="size-4 text-muted-foreground shrink-0" />
          <span className="text-modal-label text-muted-foreground">
            {typeLabel}
          </span>
          <span className="text-muted-foreground/50">·</span>
          <span className="text-modal-ui font-medium text-foreground truncate">
            {action.title}
          </span>
        </div>

        {/* Calendar warning for meetings */}
        {!isEmail && !action.calendarConnected && (
          <p className="mt-2 text-modal-micro text-muted-foreground flex items-center gap-1.5">
            <AlertTriangle className="size-3" />
            <span>
              Calendar not connected —{" "}
              <button className="underline hover:text-foreground transition-colors">
                connect
              </button>
            </span>
          </p>
        )}
      </div>

      {/* Recipients accordion */}
      <div className="bg-surface rounded-lg border border-border-subtle overflow-hidden">
        <button
          onClick={() => setRecipientsExpanded(!recipientsExpanded)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-modal-label font-medium text-muted-foreground uppercase tracking-wider">
              {participantLabel}
            </span>
            <span className="text-modal-micro text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
              {participants.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Add button - only in header */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setRecipientsExpanded(true);
                setIsAdding(true);
              }}
              className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              aria-label={`Add ${participantLabel.toLowerCase()}`}
            >
              <Plus className="size-3.5" />
            </button>

            <motion.div
              animate={{ rotate: recipientsExpanded ? 90 : 0 }}
              transition={springs.quick}
            >
              <ChevronRight className="size-4 text-muted-foreground" />
            </motion.div>
          </div>
        </button>

        {/* Collapsed preview - show first recipient */}
        {!recipientsExpanded && participants.length > 0 && (
          <div className="px-4 pb-3 -mt-1">
            <span className="text-modal-ui text-muted-foreground">
              {participants[0].name}
              {participants[0].email && ` <${participants[0].email}>`}
              {participants.length > 1 && (
                <span className="text-modal-micro">
                  {" "}
                  +{participants.length - 1} more
                </span>
              )}
            </span>
          </div>
        )}

        {/* Expanded content */}
        <AnimatePresence>
          {recipientsExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={springs.quick}
              className="border-t border-border-subtle"
            >
              <div className="p-3">
                <AnimatePresence mode="popLayout">
                  {participants.map((participant) => (
                    <motion.div
                      key={participant.id}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={springs.quick}
                      className="group flex items-center justify-between py-2 px-2 rounded hover:bg-muted/50 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-modal-ui text-foreground">
                            {participant.name}
                          </span>
                          {participant.email && (
                            <span className="text-modal-micro text-muted-foreground truncate">
                              {participant.email}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 ml-2">
                        {isEmail && (
                          <button
                            onClick={() => onCycleRecipientType(participant.id)}
                            className={`text-modal-micro uppercase tracking-wide transition-colors ${
                              participant.recipientType === "to" ||
                              !participant.recipientType
                                ? "text-muted-foreground/40 hover:text-muted-foreground"
                                : "px-1.5 py-0.5 rounded bg-muted text-muted-foreground hover:bg-muted/80"
                            }`}
                          >
                            {participant.recipientType ?? "to"}
                          </button>
                        )}

                        <button
                          onClick={() => onRemoveParticipant(participant.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-muted transition-all"
                          aria-label={`Remove ${participant.name}`}
                        >
                          <X className="size-3.5 text-muted-foreground" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Inline add form */}
                {isAdding && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 py-2 px-2"
                  >
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Name"
                      className="flex-1 bg-transparent border-0 border-b border-border-subtle focus:border-foreground text-modal-ui px-0 py-1 outline-none transition-colors"
                      autoFocus
                    />
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="email@example.com"
                      className="flex-1 bg-transparent border-0 border-b border-border-subtle focus:border-foreground text-modal-micro text-muted-foreground px-0 py-1 outline-none transition-colors"
                    />
                    <button
                      onClick={handleAddParticipant}
                      disabled={!newName.trim()}
                      className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
                    >
                      <Check className="size-4" />
                    </button>
                    <button
                      onClick={() => {
                        setIsAdding(false);
                        setNewName("");
                        setNewEmail("");
                      }}
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="size-4" />
                    </button>
                  </motion.div>
                )}

                {participants.length === 0 && !isAdding && (
                  <div className="py-3 text-center text-modal-micro text-muted-foreground">
                    No {participantLabel.toLowerCase()} yet
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content section - always expanded */}
      <div className="bg-surface rounded-lg border border-border-subtle px-4 py-4 space-y-4">
        <div className="text-modal-label font-medium text-muted-foreground uppercase tracking-wider">
          {isEmail ? "Email Content" : "Meeting Details"}
        </div>

        {/* Subject / Meeting Name */}
        <div className="space-y-1.5">
          <label className="block text-modal-micro text-muted-foreground">
            {isEmail ? "Subject" : "Meeting Name"}
          </label>
          <Input
            value={isEmail ? action.subject : action.meetingName}
            onChange={(e) =>
              onUpdateDraft(
                isEmail
                  ? { subject: e.target.value }
                  : { meetingName: e.target.value },
              )
            }
            placeholder={isEmail ? "Enter subject" : "Enter meeting name"}
            className="h-9 text-modal-ui bg-muted/30 border-0 focus:bg-muted/50 px-3"
          />
        </div>

        {/* Message / Description */}
        <div className="space-y-1.5">
          <label className="block text-modal-micro text-muted-foreground">
            {isEmail ? "Message" : "Description"}
          </label>
          <Textarea
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
              isEmail ? "Enter email message" : "Enter meeting description"
            }
            className="min-h-[180px] text-modal-ui bg-muted/30 border-0 focus:bg-muted/50 resize-none px-3 py-2.5"
          />
        </div>
      </div>
    </div>
  );
}
