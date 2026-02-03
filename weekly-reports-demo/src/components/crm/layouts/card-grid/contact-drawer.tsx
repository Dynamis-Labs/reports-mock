import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Linkedin,
  Sparkles,
  ChevronDown,
  Pencil,
  Check,
} from "lucide-react";
import { cn } from "../../../../lib/utils";
import { Badge } from "../../../ui/badge";
import { Button } from "../../../ui/button";
import { ContactAvatar } from "../../shared/contact-avatar";
import { SectionHeader } from "../../shared/section-header";
import { InfoRow } from "../../shared/info-row";
import { ActivityTimeline } from "../../shared/activity-timeline";
import { springs, staggerContainer, staggerItem } from "../../../../lib/motion";
import type { Contact } from "../../../../types/contact";

/**
 * Contact Drawer
 *
 * 500px wide slide-out panel with refined, editorial aesthetic.
 * Features: editable notes, collapsible activity timeline, badge-style actions.
 * No backdrop blur - clean slide from right.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Drawer Content
// ─────────────────────────────────────────────────────────────────────────────

function DrawerContent({ contact }: { contact: Contact }) {
  const fullName = `${contact.firstName} ${contact.lastName}`;
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);
  const [notes, setNotes] = useState(contact.notes.customSummary || "");
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  // Reset notes when contact changes
  useEffect(() => {
    setNotes(contact.notes.customSummary || "");
    setIsEditingNotes(false);
    setIsTimelineExpanded(false);
  }, [contact.id, contact.notes.customSummary]);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Profile Header - Clean and minimal */}
      <motion.header
        variants={staggerItem}
        className="text-center pb-8 border-b border-border/40"
      >
        <div className="flex justify-center mb-5">
          <ContactAvatar contact={contact} size="2xl" />
        </div>

        <h2 className="font-medium text-2xl text-foreground tracking-tight mb-1">
          {fullName}
        </h2>
        <p className="text-base text-muted-foreground">
          {contact.title}
        </p>
        <p className="text-sm text-muted-foreground/60">
          {contact.company}
        </p>
      </motion.header>

      {/* AI Insight - Simplified */}
      <motion.section variants={staggerItem}>
        <SectionHeader icon={Sparkles} title="AI Insight" />
        <p className="text-sm text-foreground/80 leading-relaxed">
          {contact.insights.aiSummary}
        </p>
      </motion.section>

      {/* Contact Info */}
      <motion.section
        variants={staggerItem}
        className="p-4 rounded-xl bg-muted/20 border border-border/40"
      >
        <h4 className="font-medium text-xs text-muted-foreground/60 uppercase tracking-wider mb-3">
          Contact
        </h4>
        <div className="space-y-1">
          <InfoRow icon={Mail} label="Email" value={contact.email} />
          {contact.phone && (
            <InfoRow icon={Phone} label="Phone" value={contact.phone} />
          )}
          {contact.location && (
            <InfoRow icon={MapPin} label="Location" value={contact.location} />
          )}
          {contact.linkedIn && (
            <InfoRow
              icon={Linkedin}
              label="LinkedIn"
              value="View Profile"
              href={`https://${contact.linkedIn}`}
            />
          )}
        </div>
      </motion.section>

      {/* Editable Notes */}
      <motion.section variants={staggerItem}>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-xs text-muted-foreground/60 uppercase tracking-wider">
            Notes
          </h4>
          {!isEditingNotes && (
            <button
              onClick={() => setIsEditingNotes(true)}
              className="text-muted-foreground/50 hover:text-foreground transition-colors"
            >
              <Pencil className="size-3.5" />
            </button>
          )}
        </div>

        {isEditingNotes ? (
          <div className="space-y-3">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your notes about this contact..."
              className={cn(
                "w-full min-h-[120px] p-3 rounded-xl resize-none",
                "bg-background border border-border/60",
                "text-sm placeholder:text-muted-foreground/40",
                "focus:outline-none focus:border-border",
                "transition-colors duration-200",
              )}
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setNotes(contact.notes.customSummary || "");
                  setIsEditingNotes(false);
                }}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => setIsEditingNotes(false)}
                className="text-xs"
              >
                <Check className="size-3 mr-1" />
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => setIsEditingNotes(true)}
            className={cn(
              "cursor-pointer rounded-xl p-4 min-h-[80px]",
              "border border-dashed border-border/40",
              "hover:border-border/60 hover:bg-muted/10",
              "transition-colors duration-200",
            )}
          >
            <p className="text-sm text-muted-foreground/70">
              {notes || "Click to add notes..."}
            </p>
          </div>
        )}
      </motion.section>

      {/* Talking Points - "What they've been up to" */}
      {contact.insights.talkingPoints &&
        contact.insights.talkingPoints.length > 0 && (
          <motion.section variants={staggerItem}>
            <h4 className="font-medium text-xs text-muted-foreground/60 uppercase tracking-wider mb-3">
              What They've Been Up To
            </h4>
            <ul className="space-y-2.5">
              {contact.insights.talkingPoints.slice(0, 4).map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-foreground/80"
                >
                  <span className="size-1 rounded-full bg-foreground/30 mt-2 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.section>
        )}

      {/* Collapsible Activity Timeline */}
      <motion.section variants={staggerItem}>
        <button
          onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}
          className="flex items-center justify-between w-full group"
        >
          <h4 className="font-medium text-xs text-muted-foreground/60 uppercase tracking-wider">
            Recent Activity
          </h4>
          <motion.div
            animate={{ rotate: isTimelineExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-muted-foreground/40 group-hover:text-muted-foreground transition-colors"
          >
            <ChevronDown className="size-4" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isTimelineExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-4">
                <ActivityTimeline interactions={contact.interactions} limit={5} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Quick Actions as Badges */}
      <motion.section
        variants={staggerItem}
        className="pt-6 border-t border-border/40"
      >
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className={cn(
              "cursor-pointer px-4 py-2 rounded-lg",
              "border-border/50 hover:border-border hover:bg-muted/30",
              "transition-colors duration-200",
            )}
          >
            <Mail className="size-3.5 mr-2 opacity-60" />
            Email
          </Badge>
          <Badge
            variant="outline"
            className={cn(
              "cursor-pointer px-4 py-2 rounded-lg",
              "border-border/50 hover:border-border hover:bg-muted/30",
              "transition-colors duration-200",
            )}
          >
            <Calendar className="size-3.5 mr-2 opacity-60" />
            Schedule
          </Badge>
          <Badge
            variant="outline"
            className={cn(
              "cursor-pointer px-4 py-2 rounded-lg",
              "border-border/50 hover:border-border hover:bg-muted/30",
              "transition-colors duration-200",
            )}
          >
            <Phone className="size-3.5 mr-2 opacity-60" />
            Call
          </Badge>
        </div>
      </motion.section>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Drawer Component
// ─────────────────────────────────────────────────────────────────────────────

interface ContactDrawerProps {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ContactDrawer({
  contact,
  isOpen,
  onClose,
}: ContactDrawerProps) {
  // Close on escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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

  return createPortal(
    <AnimatePresence>
      {isOpen && contact && (
        <>
          {/* Backdrop - subtle, no blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
          />

          {/* Drawer - 500px, clean slide */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={springs.default}
            className={cn(
              "fixed right-0 top-0 bottom-0 w-[500px] max-w-[calc(100vw-2rem)]",
              "bg-background",
              "border-l border-border/60 shadow-2xl z-50",
              "flex flex-col",
            )}
          >
            {/* Header */}
            <header className="shrink-0 px-6 py-4 border-b border-border/40 flex items-center justify-between">
              <h3 className="font-medium text-sm text-muted-foreground">
                Contact Details
              </h3>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-muted-foreground/50 hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
              >
                <X className="size-4" />
              </button>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={springs.quick}
                >
                  <DrawerContent contact={contact} />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
