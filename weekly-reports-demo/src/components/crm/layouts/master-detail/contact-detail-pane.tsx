import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  ExternalLink,
  Linkedin,
  MessageSquare,
  Sparkles,
  User,
  Clock,
  Activity,
  AlertCircle,
  CheckCircle,
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
 * Contact Detail Pane
 *
 * Full profile view with magazine-style layout.
 * Features elegant header, comprehensive sections, and smooth transitions.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Empty State
// ─────────────────────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center max-w-sm px-6">
        {/* Decorative line */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto mb-8" />

        <div className="size-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-5">
          <User className="size-7 text-muted-foreground/40" />
        </div>

        <h3 className="font-semibold text-heading text-foreground mb-2">
          Select a contact
        </h3>
        <p className="text-caption text-muted-foreground/70 leading-relaxed">
          Choose a contact from the sidebar to view their profile, conversation
          history, and relationship insights.
        </p>

        {/* Decorative line */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto mt-8" />
      </div>
    </div>
  );
}

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
    <div className="flex items-center gap-2 mb-4">
      <Icon className="size-4 text-accent" />
      <h3 className="font-semibold text-ui text-foreground">{title}</h3>
    </div>
  );
}

function InfoRow({
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
        <p className="text-ui text-foreground truncate">{value}</p>
      </div>
      {href && <ExternalLink className="size-3.5 text-muted-foreground/40" />}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:bg-muted/50 -mx-3 px-3 rounded-lg transition-colors"
      >
        {content}
      </a>
    );
  }

  return content;
}

// ─────────────────────────────────────────────────────────────────────────────
// Profile Header
// ─────────────────────────────────────────────────────────────────────────────

function ProfileHeader({ contact }: { contact: Contact }) {
  const fullName = `${contact.firstName} ${contact.lastName}`;

  return (
    <motion.header
      variants={staggerItem}
      className="relative pb-8 mb-8 border-b border-border-subtle"
    >
      {/* Background gradient accent */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-accent/5 to-transparent -mx-8 -mt-8 pointer-events-none" />

      <div className="relative flex items-start gap-6">
        {/* Large Avatar */}
        <ContactAvatar contact={contact} size="xl" showWarmthRing />

        {/* Info */}
        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-semibold text-display text-foreground tracking-tight truncate">
              {fullName}
            </h1>
            {contact.relationship === "champion" && (
              <Badge variant="accent" className="shrink-0">
                Champion
              </Badge>
            )}
            {contact.relationship === "blocker" && (
              <Badge
                variant="outline"
                className="shrink-0 border-amber-500/50 text-amber-600 dark:text-amber-400"
              >
                Blocker
              </Badge>
            )}
            {contact.relationship === "decision_maker" && (
              <Badge variant="outline" className="shrink-0">
                Decision Maker
              </Badge>
            )}
          </div>

          <p className="text-title text-muted-foreground mb-4">
            {contact.title} at{" "}
            <span className="text-foreground font-medium">
              {contact.company}
            </span>
          </p>

          {/* Role badges */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {contact.roleBadges.map((badge) => (
              <Badge key={badge} variant="accent" className="text-micro">
                {badge}
              </Badge>
            ))}
            {contact.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="outline" className="text-micro">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Relationship strength */}
          <div className="max-w-xs">
            <RelationshipIndicator
              score={contact.relationshipScore}
              warmth={contact.warmth}
              size="md"
              showLabel
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="shrink-0 flex flex-col gap-2">
          <Button variant="default" size="sm" className="w-full">
            <Mail className="size-4 mr-2" />
            Email
          </Button>
          <Button variant="secondary" size="sm" className="w-full">
            <Calendar className="size-4 mr-2" />
            Schedule
          </Button>
          <Button variant="ghost" size="sm" className="w-full">
            <Phone className="size-4 mr-2" />
            Call
          </Button>
        </div>
      </div>
    </motion.header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Detail Content
// ─────────────────────────────────────────────────────────────────────────────

function DetailContent({ contact }: { contact: Contact }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <ProfileHeader contact={contact} />

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        {/* Left column - Primary content */}
        <div className="space-y-8">
          {/* AI Insight - The Pokedex Tagline */}
          <motion.section variants={staggerItem}>
            <SectionTitle icon={Sparkles} title="AI Insight" />
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-transparent rounded-full" />
              <p className="text-body text-foreground leading-relaxed">
                {contact.insights.aiSummary}
              </p>
            </div>

            {/* Strengths & Risks */}
            {(contact.insights.strengths || contact.insights.risks) && (
              <div className="grid grid-cols-2 gap-4 mt-5">
                {contact.insights.strengths &&
                  contact.insights.strengths.length > 0 && (
                    <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="size-3.5 text-emerald-500" />
                        <span className="text-micro font-medium text-emerald-600 dark:text-emerald-400">
                          Strengths
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {contact.insights.strengths.map((s, i) => (
                          <li
                            key={i}
                            className="text-caption text-muted-foreground"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {contact.insights.risks &&
                  contact.insights.risks.length > 0 && (
                    <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="size-3.5 text-amber-500" />
                        <span className="text-micro font-medium text-amber-600 dark:text-amber-400">
                          Risks
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {contact.insights.risks.map((r, i) => (
                          <li
                            key={i}
                            className="text-caption text-muted-foreground"
                          >
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            )}
          </motion.section>

          {/* Notes */}
          {contact.notes.customSummary && (
            <motion.section variants={staggerItem}>
              <SectionTitle icon={MessageSquare} title="Notes" />
              <p className="text-ui text-muted-foreground leading-relaxed">
                {contact.notes.customSummary}
              </p>

              {contact.notes.quickFacts &&
                contact.notes.quickFacts.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {contact.notes.quickFacts.map((fact, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-caption text-muted-foreground"
                      >
                        <span className="size-1 rounded-full bg-accent mt-1.5 shrink-0" />
                        {fact}
                      </li>
                    ))}
                  </ul>
                )}

              {contact.notes.personalDetails && (
                <p className="mt-4 text-caption text-muted-foreground/70 italic">
                  {contact.notes.personalDetails}
                </p>
              )}
            </motion.section>
          )}

          {/* Recent Topics */}
          {contact.recentTopics.length > 0 && (
            <motion.section variants={staggerItem}>
              <SectionTitle icon={MessageSquare} title="Recent Topics" />
              <div className="flex flex-wrap gap-2">
                {contact.recentTopics.map((topic) => (
                  <span
                    key={topic}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-caption",
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
            <SectionTitle icon={Activity} title="Activity History" />
            <ActivityTimeline
              interactions={contact.interactions}
              limit={8}
              animated={false}
            />
          </motion.section>
        </div>

        {/* Right column - Sidebar info */}
        <div className="space-y-6">
          {/* Contact Info Card */}
          <motion.div
            variants={staggerItem}
            className="p-4 rounded-xl bg-muted/30 border border-border-subtle"
          >
            <h4 className="font-medium text-caption text-muted-foreground uppercase tracking-wider mb-3">
              Contact Info
            </h4>
            <div className="space-y-1">
              <InfoRow icon={Mail} label="Email" value={contact.email} />
              {contact.phone && (
                <InfoRow icon={Phone} label="Phone" value={contact.phone} />
              )}
              {contact.location && (
                <InfoRow
                  icon={MapPin}
                  label="Location"
                  value={contact.location}
                />
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
          </motion.div>

          {/* Timing Card */}
          <motion.div
            variants={staggerItem}
            className="p-4 rounded-xl bg-muted/30 border border-border-subtle"
          >
            <h4 className="font-medium text-caption text-muted-foreground uppercase tracking-wider mb-3">
              Timing
            </h4>
            <div className="space-y-3">
              {contact.insights.bestReachTime && (
                <div>
                  <p className="text-micro text-muted-foreground/60 mb-1">
                    Best time to reach
                  </p>
                  <p className="text-caption text-foreground">
                    {contact.insights.bestReachTime}
                  </p>
                </div>
              )}
              {contact.nextFollowUp && (
                <div>
                  <p className="text-micro text-muted-foreground/60 mb-1">
                    Next follow-up
                  </p>
                  <p
                    className={cn(
                      "text-caption font-medium",
                      contact.nextFollowUp <= new Date()
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-foreground",
                    )}
                  >
                    {contact.nextFollowUp <= new Date()
                      ? "Overdue"
                      : contact.nextFollowUp.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Talking Points */}
          {contact.insights.talkingPoints &&
            contact.insights.talkingPoints.length > 0 && (
              <motion.div
                variants={staggerItem}
                className="p-4 rounded-xl bg-accent/5 border border-accent/10"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="size-4 text-accent" />
                  <h4 className="font-medium text-caption text-accent uppercase tracking-wider">
                    Talking Points
                  </h4>
                </div>
                <ul className="space-y-2">
                  {contact.insights.talkingPoints.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-caption text-foreground"
                    >
                      <span className="size-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Export
// ─────────────────────────────────────────────────────────────────────────────

interface ContactDetailPaneProps {
  contact: Contact | null;
}

export function ContactDetailPane({ contact }: ContactDetailPaneProps) {
  return (
    <div className="h-full overflow-y-auto bg-background">
      <AnimatePresence mode="wait">
        {contact ? (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={springs.quick}
            className="max-w-4xl mx-auto px-8 py-8"
          >
            <DetailContent contact={contact} />
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full"
          >
            <EmptyState />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
