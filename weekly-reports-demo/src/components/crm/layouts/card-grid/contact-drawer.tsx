import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ExternalLink,
  Linkedin,
  Sparkles,
  MessageSquare,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { cn } from "../../../../lib/utils";
import { Badge } from "../../../ui/badge";
import { Button } from "../../../ui/button";
import { ContactAvatar } from "../../shared/contact-avatar";
import { RelationshipIndicator } from "../../shared/relationship-indicator";
import { ActivityTimeline } from "../../shared/activity-timeline";
import { springs, staggerContainer, staggerItem } from "../../../../lib/motion";
import type { Contact } from "../../../../types/contact";

/**
 * Contact Drawer
 *
 * Slide-in detail drawer for card grid layout.
 * Features: Backdrop blur, spring animation, magazine-style content.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Section Components
// ─────────────────────────────────────────────────────────────────────────────

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: typeof Sparkles;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className="size-4 text-accent" />
      <h4 className="font-semibold text-ui text-foreground">{title}</h4>
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-3 py-2">
      <Icon className="size-4 text-muted-foreground/60 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-micro text-muted-foreground/60 mb-0.5">{label}</p>
        <p className="text-caption text-foreground truncate">{value}</p>
      </div>
      {href && <ExternalLink className="size-3 text-muted-foreground/40" />}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:bg-muted/50 -mx-2 px-2 rounded-lg transition-colors"
      >
        {content}
      </a>
    );
  }

  return content;
}

// ─────────────────────────────────────────────────────────────────────────────
// Drawer Content
// ─────────────────────────────────────────────────────────────────────────────

function DrawerContent({ contact }: { contact: Contact }) {
  const fullName = `${contact.firstName} ${contact.lastName}`;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Profile Header */}
      <motion.header
        variants={staggerItem}
        className="text-center pb-6 border-b border-border-subtle"
      >
        <div className="mb-4">
          <ContactAvatar contact={contact} size="xl" showWarmthRing />
        </div>

        <h2 className="font-semibold text-display text-foreground tracking-tight mb-1">
          {fullName}
        </h2>
        <p className="text-title text-muted-foreground mb-4">
          {contact.title} at{" "}
          <span className="text-foreground font-medium">{contact.company}</span>
        </p>

        {/* Role badges */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-5">
          {contact.roleBadges.map((badge) => (
            <Badge key={badge} variant="accent" className="text-micro">
              {badge}
            </Badge>
          ))}
          {contact.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-micro">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Relationship strength */}
        <div className="max-w-xs mx-auto">
          <RelationshipIndicator
            score={contact.relationshipScore}
            warmth={contact.warmth}
            size="md"
            showLabel
          />
        </div>
      </motion.header>

      {/* AI Summary */}
      <motion.section variants={staggerItem}>
        <SectionTitle icon={Sparkles} title="AI Insight" />
        <div className="relative pl-4">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-transparent rounded-full" />
          <p className="text-ui text-foreground leading-relaxed">
            {contact.insights.aiSummary}
          </p>
        </div>

        {/* Strengths & Risks */}
        {(contact.insights.strengths || contact.insights.risks) && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            {contact.insights.strengths &&
              contact.insights.strengths.length > 0 && (
                <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                  <div className="flex items-center gap-1.5 mb-2">
                    <CheckCircle className="size-3 text-emerald-500" />
                    <span className="text-micro font-medium text-emerald-600 dark:text-emerald-400">
                      Strengths
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {contact.insights.strengths.slice(0, 2).map((s, i) => (
                      <li key={i} className="text-micro text-muted-foreground">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {contact.insights.risks && contact.insights.risks.length > 0 && (
              <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                <div className="flex items-center gap-1.5 mb-2">
                  <AlertCircle className="size-3 text-amber-500" />
                  <span className="text-micro font-medium text-amber-600 dark:text-amber-400">
                    Risks
                  </span>
                </div>
                <ul className="space-y-1">
                  {contact.insights.risks.slice(0, 2).map((r, i) => (
                    <li key={i} className="text-micro text-muted-foreground">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </motion.section>

      {/* Contact Info */}
      <motion.section
        variants={staggerItem}
        className="p-4 rounded-xl bg-muted/30 border border-border-subtle"
      >
        <h4 className="font-medium text-micro text-muted-foreground uppercase tracking-wider mb-2">
          Contact Info
        </h4>
        <div className="space-y-0.5">
          <InfoItem icon={Mail} label="Email" value={contact.email} />
          {contact.phone && (
            <InfoItem icon={Phone} label="Phone" value={contact.phone} />
          )}
          {contact.location && (
            <InfoItem icon={MapPin} label="Location" value={contact.location} />
          )}
          {contact.linkedIn && (
            <InfoItem
              icon={Linkedin}
              label="LinkedIn"
              value="View Profile"
              href={`https://${contact.linkedIn}`}
            />
          )}
        </div>
      </motion.section>

      {/* Notes */}
      {contact.notes.customSummary && (
        <motion.section variants={staggerItem}>
          <SectionTitle icon={MessageSquare} title="Notes" />
          <p className="text-caption text-muted-foreground leading-relaxed">
            {contact.notes.customSummary}
          </p>
          {contact.notes.quickFacts && contact.notes.quickFacts.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {contact.notes.quickFacts.slice(0, 3).map((fact, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-micro text-muted-foreground"
                >
                  <span className="size-1 rounded-full bg-accent mt-1.5 shrink-0" />
                  {fact}
                </li>
              ))}
            </ul>
          )}
        </motion.section>
      )}

      {/* Talking Points */}
      {contact.insights.talkingPoints &&
        contact.insights.talkingPoints.length > 0 && (
          <motion.section
            variants={staggerItem}
            className="p-4 rounded-xl bg-accent/5 border border-accent/10"
          >
            <div className="flex items-center gap-2 mb-3">
              <Clock className="size-4 text-accent" />
              <h4 className="font-medium text-micro text-accent uppercase tracking-wider">
                Talking Points
              </h4>
            </div>
            <ul className="space-y-2">
              {contact.insights.talkingPoints.slice(0, 4).map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-caption text-foreground"
                >
                  <span className="size-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.section>
        )}

      {/* Recent Topics */}
      {contact.recentTopics.length > 0 && (
        <motion.section variants={staggerItem}>
          <SectionTitle icon={MessageSquare} title="Recent Topics" />
          <div className="flex flex-wrap gap-1.5">
            {contact.recentTopics.map((topic) => (
              <span
                key={topic}
                className={cn(
                  "px-2.5 py-1 rounded-md text-micro",
                  "bg-muted/60 text-muted-foreground",
                  "border border-border-subtle",
                )}
              >
                {topic}
              </span>
            ))}
          </div>
        </motion.section>
      )}

      {/* Activity Timeline */}
      <motion.section variants={staggerItem}>
        <SectionTitle icon={Activity} title="Recent Activity" />
        <ActivityTimeline interactions={contact.interactions} limit={5} />
      </motion.section>

      {/* Quick Actions */}
      <motion.section
        variants={staggerItem}
        className="pt-4 border-t border-border-subtle"
      >
        <div className="flex gap-2">
          <Button variant="default" size="sm" className="flex-1">
            <Mail className="size-4 mr-2" />
            Email
          </Button>
          <Button variant="secondary" size="sm" className="flex-1">
            <Calendar className="size-4 mr-2" />
            Schedule
          </Button>
          <Button variant="ghost" size="sm">
            <Phone className="size-4" />
          </Button>
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%", opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.8 }}
            transition={springs.default}
            className={cn(
              "fixed right-0 top-0 bottom-0 w-[420px] max-w-[calc(100vw-2rem)]",
              "bg-background/95 backdrop-blur-xl",
              "border-l border-border shadow-2xl z-50",
              "flex flex-col",
            )}
          >
            {/* Header */}
            <header className="shrink-0 px-5 py-4 border-b border-border-subtle flex items-center justify-between bg-background/80">
              <h3 className="font-semibold text-ui text-foreground">
                Contact Details
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="size-8"
              >
                <X className="size-4" />
              </Button>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
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
