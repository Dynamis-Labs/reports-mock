import { motion } from "motion/react";
import { ContactListItem } from "./contact-list-item";
import { useCrmStore } from "../../../../stores/crm-store";
import { staggerContainer } from "../../../../lib/motion";
import type { Contact } from "../../../../types/contact";

/**
 * Accordion Layout
 *
 * Full-width contact list with inline expand pattern.
 * Clicking a contact reveals detailed information.
 */

interface AccordionLayoutProps {
  contacts: Contact[];
}

export function AccordionLayout({ contacts }: AccordionLayoutProps) {
  const { expandedContactIds, toggleExpanded } = useCrmStore();

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
