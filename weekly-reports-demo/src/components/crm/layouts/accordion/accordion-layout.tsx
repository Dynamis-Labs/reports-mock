import { motion } from "motion/react";
import { Users } from "lucide-react";
import { ContactListItem } from "./contact-list-item";
import { useCrmStore } from "../../../../stores/crm-store";
import { staggerContainer } from "../../../../lib/motion";
import type { Contact } from "../../../../types/contact";

/**
 * Accordion Layout
 *
 * Full-width contact list with inline expand pattern.
 * Clicking a contact reveals detailed "pokedex" information.
 */

interface AccordionLayoutProps {
  contacts: Contact[];
}

export function AccordionLayout({ contacts }: AccordionLayoutProps) {
  const { expandedContactIds, toggleExpanded } = useCrmStore();

  if (contacts.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Users className="size-12 mx-auto mb-4 text-muted-foreground/30" />
          <p className="text-muted-foreground">No contacts found</p>
          <p className="text-caption text-muted-foreground/60 mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="p-6 space-y-3 max-w-5xl mx-auto"
      >
        {contacts.map((contact) => (
          <ContactListItem
            key={contact.id}
            contact={contact}
            isExpanded={expandedContactIds.has(contact.id)}
            onToggle={() => toggleExpanded(contact.id)}
          />
        ))}
      </motion.div>
    </div>
  );
}
