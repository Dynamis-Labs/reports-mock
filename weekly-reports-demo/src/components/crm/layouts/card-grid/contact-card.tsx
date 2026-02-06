import { motion } from "motion/react";
import { Pin } from "lucide-react";
import { cn } from "../../../../lib/utils";
import { formatRelativeTime } from "../../../../lib/date-utils";
import { staggerItem } from "../../../../lib/motion";
import { useCrmStore } from "../../../../stores/crm-store";
import type { Contact } from "../../../../types/contact";

/**
 * Contact Card
 *
 * Square-ish dossier card with prominent photo.
 * Shows tags as small pills, time since contact in corner.
 * Pin indicator when contact is pinned.
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

  const { pinnedContactIds, togglePin } = useCrmStore();
  const isPinned = pinnedContactIds?.includes(contact.id) ?? false;

  // Get display tags (filter out section tags)
  const displayTags = contact.tags.filter(
    (tag) =>
      !tag.startsWith("@") && !tag.startsWith("#") && !tag.startsWith("["),
  );

  const handlePinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    togglePin?.(contact.id);
  };

  return (
    <motion.button
      variants={staggerItem}
      onClick={onClick}
      className={cn(
        "group relative text-left w-full rounded-lg overflow-hidden",
        "bg-surface-elevated",
        "border transition-all duration-200",
        "focus:outline-none",
        "border-border hover:border-border-subtle hover:shadow-sm",
        isPinned && "border-amber-400/40",
      )}
    >
      {/* Pin indicator */}
      <button
        onClick={handlePinClick}
        className={cn(
          "absolute top-2 right-2 z-10",
          "transition-all duration-200",
          isPinned
            ? "text-amber-500 dark:text-amber-400"
            : "opacity-0 group-hover:opacity-100 text-muted-foreground/40 hover:text-amber-500",
        )}
      >
        <Pin
          className="size-3.5"
          strokeWidth={1.5}
          fill={isPinned ? "currentColor" : "none"}
        />
      </button>

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

          {/* Tags */}
          {displayTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {displayTags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 text-[9px] rounded bg-muted/50 text-muted-foreground truncate max-w-[70px]"
                >
                  {tag}
                </span>
              ))}
              {displayTags.length > 3 && (
                <span className="text-[9px] text-muted-foreground/50">
                  +{displayTags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Bottom: Time in corner */}
          <div className="flex items-center justify-end mt-2 pt-2 border-t border-border/30">
            <span className="text-[10px] text-muted-foreground/60 tabular-nums">
              {formatRelativeTime(contact.lastContacted)}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
