import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";
import { cn } from "../../../../lib/utils";
import { formatRelativeTime } from "../../../../lib/date-utils";
import { ContactAvatar } from "../../shared/contact-avatar";
import { RelationshipIndicator } from "../../shared/relationship-indicator";
import { ContactExpandedContent } from "./contact-expanded-content";
import { Badge } from "../../../ui/badge";
import { springs, staggerItem } from "../../../../lib/motion";
import type { Contact } from "../../../../types/contact";

interface ContactListItemProps {
  contact: Contact;
  isExpanded: boolean;
  onToggle: () => void;
}

export function ContactListItem({
  contact,
  isExpanded,
  onToggle,
}: ContactListItemProps) {
  const fullName = `${contact.firstName} ${contact.lastName}`;
  const isOverdue = contact.nextFollowUp && contact.nextFollowUp <= new Date();

  return (
    <motion.div
      variants={staggerItem}
      layout="position"
      className={cn(
        "rounded-xl border overflow-hidden",
        "transition-all duration-200",
        isExpanded
          ? "bg-surface-elevated border-border shadow-md"
          : "bg-surface border-border-subtle hover:border-border hover:shadow-sm",
      )}
    >
      {/* Collapsed Header - Always Visible */}
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        className={cn(
          "w-full text-left",
          "px-5 py-4",
          "flex items-center gap-4",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
          "transition-colors duration-150",
        )}
      >
        {/* Avatar with warmth ring */}
        <ContactAvatar contact={contact} size="lg" showWarmthRing />

        {/* Main Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-semibold text-ui text-foreground truncate">
              {fullName}
            </span>
            {contact.relationship === "champion" && (
              <Badge variant="accent" className="text-micro px-1.5 py-0">
                Champion
              </Badge>
            )}
            {contact.relationship === "blocker" && (
              <Badge
                variant="outline"
                className="text-micro px-1.5 py-0 border-amber-500/50 text-amber-600 dark:text-amber-400"
              >
                Blocker
              </Badge>
            )}
            {isOverdue && (
              <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
            )}
          </div>

          <div className="flex items-center gap-2 text-caption text-muted-foreground">
            <span className="truncate">{contact.title}</span>
            <span className="text-border">•</span>
            <span className="truncate font-medium text-foreground/80">
              {contact.company}
            </span>
          </div>
        </div>

        {/* Right side info */}
        <div className="hidden sm:flex items-center gap-6">
          {/* Relationship strength */}
          <div className="w-24">
            <RelationshipIndicator
              score={contact.relationshipScore}
              warmth={contact.warmth}
              size="sm"
              showLabel={false}
            />
          </div>

          {/* Last contacted */}
          <div className="text-right w-20">
            <p className="text-micro text-muted-foreground/60 mb-0.5">
              Last contact
            </p>
            <p className="text-caption text-muted-foreground tabular-nums">
              {formatRelativeTime(contact.lastContacted)}
            </p>
          </div>
        </div>

        {/* Expand indicator */}
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={springs.quick}
          className="shrink-0 ml-2"
        >
          <ChevronRight
            className={cn(
              "size-4",
              isExpanded ? "text-accent" : "text-muted-foreground/50",
            )}
          />
        </motion.div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {isExpanded && <ContactExpandedContent contact={contact} />}
      </AnimatePresence>
    </motion.div>
  );
}
