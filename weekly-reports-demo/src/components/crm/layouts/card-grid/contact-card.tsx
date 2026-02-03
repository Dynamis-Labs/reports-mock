import { motion } from "motion/react";
import { cn } from "../../../../lib/utils";
import { formatRelativeTime } from "../../../../lib/date-utils";
import { staggerItem } from "../../../../lib/motion";
import type { Contact } from "../../../../types/contact";

/**
 * Contact Card
 *
 * Square-ish dossier card with prominent photo.
 * Layout: Tall photo on left → stacked info on right
 * Info: Name, Title @ Company, Last Contact, Status
 */

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
  const initials = `${contact.firstName[0]}${contact.lastName[0]}`;
  const isOverdue = contact.nextFollowUp && contact.nextFollowUp <= new Date();

  // Warmth-based status
  const statusConfig = {
    hot: { label: "Active", color: "bg-emerald-500" },
    warm: { label: "Engaged", color: "bg-emerald-400" },
    cool: { label: "Cooling", color: "bg-amber-500" },
    cold: { label: "At Risk", color: "bg-red-400" },
    new: { label: "New", color: "bg-blue-500" },
  };
  const status = statusConfig[contact.warmth];

  return (
    <motion.button
      variants={staggerItem}
      onClick={onClick}
      className={cn(
        "group relative text-left w-full rounded-xl overflow-hidden",
        "bg-white dark:bg-surface/50",
        "border transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        isSelected
          ? "border-foreground/20 shadow-md"
          : "border-border/40 hover:border-border hover:shadow-sm",
      )}
    >
      <div className="flex">
        {/* Tall profile photo - left side */}
        <div className="w-24 shrink-0 bg-gradient-to-br from-muted to-muted/50 relative">
          {contact.avatarUrl ? (
            <img
              src={contact.avatarUrl}
              alt={fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-xl font-medium text-muted-foreground/60 uppercase">
                {initials}
              </span>
            </div>
          )}
          {/* Status indicator dot */}
          <div
            className={cn(
              "absolute bottom-2 right-2 size-2.5 rounded-full",
              status.color,
              "ring-2 ring-white dark:ring-surface/50",
            )}
            title={status.label}
          />
        </div>

        {/* Info section - right side */}
        <div className="flex-1 p-4 flex flex-col justify-between min-h-[120px]">
          {/* Top: Name and role */}
          <div>
            <h3 className="font-medium text-sm text-foreground truncate leading-tight">
              {fullName}
            </h3>
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {contact.title}
            </p>
            <p className="text-xs text-muted-foreground/60 truncate">
              {contact.company}
            </p>
          </div>

          {/* Bottom: Last contact + overdue indicator */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">
                Last contact
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {isOverdue && (
                <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
              )}
              <span className="text-xs font-medium text-muted-foreground tabular-nums">
                {formatRelativeTime(contact.lastContacted)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
