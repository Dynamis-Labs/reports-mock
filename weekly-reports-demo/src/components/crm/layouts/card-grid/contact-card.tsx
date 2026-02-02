import { motion } from "motion/react";
import { Calendar, Sparkles } from "lucide-react";
import { cn } from "../../../../lib/utils";
import { formatRelativeTime } from "../../../../lib/date-utils";
import { ContactAvatar } from "../../shared/contact-avatar";
import { RelationshipIndicator } from "../../shared/relationship-indicator";
import { Badge } from "../../../ui/badge";
import { springs, staggerItem } from "../../../../lib/motion";
import type { Contact } from "../../../../types/contact";

interface ContactCardProps {
  contact: Contact;
  isSelected: boolean;
  onClick: () => void;
}

export function ContactCard({
  contact,
  isSelected,
  onClick,
}: ContactCardProps) {
  const fullName = `${contact.firstName} ${contact.lastName}`;
  const isOverdue = contact.nextFollowUp && contact.nextFollowUp <= new Date();

  // Warmth-based accent colors
  const warmthAccent =
    contact.warmth === "hot"
      ? "from-rose-500/20 via-orange-500/10"
      : contact.warmth === "warm"
        ? "from-amber-500/15 via-yellow-500/5"
        : contact.warmth === "cool"
          ? "from-sky-500/10 via-blue-500/5"
          : "from-slate-500/5 via-slate-400/5";

  return (
    <motion.button
      variants={staggerItem}
      onClick={onClick}
      className={cn(
        "group relative text-left w-full rounded-2xl overflow-hidden",
        "bg-surface border transition-all duration-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        isSelected
          ? "border-accent shadow-lg ring-2 ring-accent/20"
          : "border-border-subtle hover:border-border hover:shadow-md",
      )}
      whileHover={{
        y: -6,
        scale: 1.02,
        transition: springs.quick,
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Warmth gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          warmthAccent,
        )}
      />

      {/* Content */}
      <div className="relative p-5">
        {/* Header: Avatar + Name + Company */}
        <div className="flex items-start gap-4 mb-4">
          <ContactAvatar contact={contact} size="lg" showWarmthRing />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="font-semibold text-heading text-foreground truncate">
                {fullName}
              </h3>
              {isOverdue && (
                <span className="size-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
              )}
            </div>
            <p className="text-ui text-muted-foreground truncate">
              {contact.company}
            </p>
            <p className="text-caption text-muted-foreground/60 truncate">
              {contact.title}
            </p>
          </div>
        </div>

        {/* AI Summary - Pokedex tagline */}
        <div className="relative mb-4">
          <div className="flex items-start gap-2">
            <Sparkles className="size-3.5 text-accent mt-0.5 shrink-0" />
            <p className="text-caption text-muted-foreground leading-relaxed line-clamp-2">
              {contact.insights.aiSummary}
            </p>
          </div>
        </div>

        {/* Role badges - compact */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {contact.roleBadges.slice(0, 2).map((badge) => (
            <Badge key={badge} variant="accent" className="text-micro">
              {badge}
            </Badge>
          ))}
          {contact.tags.slice(0, 1).map((tag) => (
            <Badge key={tag} variant="outline" className="text-micro">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Footer: Last contacted + relationship strength */}
        <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
          <div className="flex items-center gap-1.5 text-caption text-muted-foreground">
            <Calendar className="size-3" />
            <span className="tabular-nums">
              {formatRelativeTime(contact.lastContacted)}
            </span>
          </div>

          <div className="w-24">
            <RelationshipIndicator
              score={contact.relationshipScore}
              warmth={contact.warmth}
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* Hover shine effect */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          "bg-gradient-to-tr from-transparent via-white/5 to-white/10",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        )}
      />
    </motion.button>
  );
}
