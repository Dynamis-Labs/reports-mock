import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  ChevronDown,
  Pencil,
  Check,
  Heart,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { cn } from "../../../../lib/utils";
import { Button } from "../../../ui/button";
import { ContactAvatar } from "../../shared/contact-avatar";
import { ActivityTimeline } from "../../shared/activity-timeline";
import { TagEditor } from "../../shared/tag-editor";
import { springs, staggerContainer, staggerItem } from "../../../../lib/motion";
import { useCrmStore } from "../../../../stores/crm-store";
import type { Contact } from "../../../../types/contact";

/**
 * Contact Drawer
 *
 * Redesigned with relationship-centric hierarchy:
 * 1. Profile Header
 * 2. Tags (compact, less prominent)
 * 3. Relationship Status (renamed from AI Insight)
 * 4. Personal Notes
 * 5. What They've Been Up To (with source links)
 * 6. Contact Info (compact, at bottom)
 */

// ─────────────────────────────────────────────────────────────────────────────
// Compact Contact Info Row
// ─────────────────────────────────────────────────────────────────────────────

function CompactContactInfo({ contact }: { contact: Contact }) {
  const items = [
    { icon: Mail, value: contact.email, href: `mailto:${contact.email}` },
    contact.phone && {
      icon: Phone,
      value: contact.phone,
      href: `tel:${contact.phone}`,
    },
    contact.location && { icon: MapPin, value: contact.location },
    contact.linkedIn && {
      icon: Linkedin,
      value: "LinkedIn",
      href: `https://${contact.linkedIn}`,
      external: true,
    },
  ].filter(Boolean) as Array<{
    icon: typeof Mail;
    value: string;
    href?: string;
    external?: boolean;
  }>;

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item, i) => {
        const Icon = item.icon;
        const content = (
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <Icon className="size-3.5 opacity-60" strokeWidth={1.5} />
            <span className="truncate max-w-[140px]">{item.value}</span>
            {item.external && <ExternalLink className="size-2.5 opacity-40" />}
          </span>
        );

        return item.href ? (
          <a
            key={i}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="hover:underline underline-offset-2"
          >
            {content}
          </a>
        ) : (
          <span key={i}>{content}</span>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Drawer Content
// ─────────────────────────────────────────────────────────────────────────────

function DrawerContent({ contact }: { contact: Contact }) {
  const fullName = `${contact.firstName} ${contact.lastName}`;
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);
  const [notes, setNotes] = useState(contact.notes.customSummary || "");
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const { updateContactTags, getAllUniqueTags } = useCrmStore();
  const allTags = getAllUniqueTags();

  // Reset state when contact changes
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
      className="space-y-6"
    >
      {/* ═══════════════════════════════════════════════════════════════════════
          1. Profile Header
          ═══════════════════════════════════════════════════════════════════════ */}
      <motion.header
        variants={staggerItem}
        className="text-center pb-6 border-b border-border/40"
      >
        <div className="flex justify-center mb-4">
          <ContactAvatar contact={contact} size="2xl" />
        </div>

        <h2 className="font-medium text-2xl text-foreground tracking-tight mb-1">
          {fullName}
        </h2>
        <p className="text-base text-muted-foreground">{contact.title}</p>
        <p className="text-sm text-muted-foreground/60">{contact.company}</p>
      </motion.header>

      {/* ═══════════════════════════════════════════════════════════════════════
          2. Tags (compact, less prominent)
          ═══════════════════════════════════════════════════════════════════════ */}
      <motion.section variants={staggerItem}>
        <TagEditor
          tags={contact.tags}
          allTags={allTags}
          onTagsChange={(tags) => updateContactTags(contact.id, tags)}
          compact
        />
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════════════════
          3. Relationship Status (formerly AI Insight)
          ═══════════════════════════════════════════════════════════════════════ */}
      <motion.section variants={staggerItem}>
        <div className="flex items-center gap-2 mb-2">
          <Heart
            className="size-3.5 text-muted-foreground/60"
            strokeWidth={1.5}
          />
          <h4 className="font-medium text-xs text-muted-foreground/60 uppercase tracking-wider">
            Relationship Status
          </h4>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">
          {contact.insights.aiSummary}
        </p>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════════════════
          4. Personal Notes (editable)
          ═══════════════════════════════════════════════════════════════════════ */}
      <motion.section variants={staggerItem}>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-xs text-muted-foreground/60 uppercase tracking-wider">
            Personal Notes
          </h4>
          {!isEditingNotes && (
            <button
              onClick={() => setIsEditingNotes(true)}
              className="text-muted-foreground/50 hover:text-foreground transition-colors"
            >
              <Pencil className="size-3.5" strokeWidth={1.5} />
            </button>
          )}
        </div>

        {isEditingNotes ? (
          <div className="space-y-3">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your personal notes..."
              className={cn(
                "w-full min-h-[100px] p-3 rounded-lg resize-none",
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
                className="text-xs h-7"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => setIsEditingNotes(false)}
                className="text-xs h-7"
              >
                <Check className="size-3 mr-1" strokeWidth={1.5} />
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => setIsEditingNotes(true)}
            className={cn(
              "cursor-pointer rounded-lg p-3 min-h-[60px]",
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

      {/* ═══════════════════════════════════════════════════════════════════════
          5. What They've Been Up To (with source links)
          ═══════════════════════════════════════════════════════════════════════ */}
      {contact.insights.talkingPoints &&
        contact.insights.talkingPoints.length > 0 && (
          <motion.section variants={staggerItem}>
            <h4 className="font-medium text-xs text-muted-foreground/60 uppercase tracking-wider mb-2">
              What They've Been Up To
            </h4>
            <ul className="space-y-2">
              {contact.insights.talkingPoints.slice(0, 4).map((point, i) => {
                // Try to find a related interaction with sourceUrl
                const relatedInteraction = contact.interactions.find(
                  (int) =>
                    int.keyTopics?.some((topic) =>
                      point.toLowerCase().includes(topic.toLowerCase()),
                    ) ||
                    int.summary
                      ?.toLowerCase()
                      .includes(point.toLowerCase().slice(0, 20)),
                );
                const sourceUrl = relatedInteraction?.sourceUrl;

                return (
                  <li
                    key={i}
                    className="group flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <span className="size-1 rounded-full bg-foreground/30 mt-2 shrink-0" />
                    <span className="flex-1">{point}</span>
                    {(sourceUrl || relatedInteraction) && (
                      <a
                        href={sourceUrl || "#"}
                        target={sourceUrl ? "_blank" : undefined}
                        rel={sourceUrl ? "noopener noreferrer" : undefined}
                        onClick={(e) => {
                          if (!sourceUrl) {
                            e.preventDefault();
                            setIsTimelineExpanded(true);
                          }
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                        title={sourceUrl ? "View source" : "View in activity"}
                      >
                        <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.section>
        )}

      {/* ═══════════════════════════════════════════════════════════════════════
          6. Recent Activity (collapsible)
          ═══════════════════════════════════════════════════════════════════════ */}
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
            <ChevronDown className="size-4" strokeWidth={1.5} />
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
              <div className="pt-3">
                <ActivityTimeline
                  interactions={contact.interactions}
                  limit={5}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════════════════
          7. Contact Info (compact, at bottom)
          ═══════════════════════════════════════════════════════════════════════ */}
      <motion.section
        variants={staggerItem}
        className="pt-4 border-t border-border/40"
      >
        <h4 className="font-medium text-xs text-muted-foreground/60 uppercase tracking-wider mb-3">
          Contact
        </h4>
        <CompactContactInfo contact={contact} />
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={springs.default}
            className={cn(
              "fixed right-0 top-0 bottom-0 w-[480px] max-w-[calc(100vw-2rem)]",
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
                className="p-2 -mr-2 text-muted-foreground/50 hover:text-foreground rounded-lg hover:bg-muted/50 hover:text-white transition-colors"
              >
                <X className="size-4" strokeWidth={1.5} />
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
