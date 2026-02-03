import { motion } from "motion/react";
import { cn } from "../../../../lib/utils";
import { ContactAvatar } from "../../shared/contact-avatar";
import { staggerItem } from "../../../../lib/motion";
import type { Contact } from "../../../../types/contact";

/**
 * Contact Card
 *
 * Minimal, editorial-style contact card. The photo is the visual anchor.
 * Clean typography hierarchy: name → title → company.
 * Restrained interactions: subtle border change on hover, no bouncy effects.
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

  return (
    <motion.button
      variants={staggerItem}
      onClick={onClick}
      className={cn(
        "group relative text-left w-full rounded-2xl overflow-hidden",
        "bg-white dark:bg-surface/50",
        "border transition-colors duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        isSelected
          ? "border-foreground/20 shadow-sm"
          : "border-border/40 hover:border-border",
      )}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Large avatar - the visual anchor */}
          <ContactAvatar contact={contact} size="xl" />

          <div className="flex-1 min-w-0 pt-0.5">
            {/* Name - primary */}
            <h3 className="font-medium text-base text-foreground truncate">
              {fullName}
            </h3>

            {/* Title - secondary */}
            <p className="text-sm text-muted-foreground truncate mt-0.5">
              {contact.title}
            </p>

            {/* Company - tertiary */}
            <p className="text-sm text-muted-foreground/60 truncate">
              {contact.company}
            </p>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
