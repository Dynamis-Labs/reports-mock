import { motion } from "motion/react";
import { Users } from "lucide-react";
import { ContactCard } from "./contact-card";
import { ContactDrawer } from "./contact-drawer";
import { useCrmStore } from "../../../../stores/crm-store";
import { staggerContainer } from "../../../../lib/motion";
import type { Contact } from "../../../../types/contact";

/**
 * Card Grid Layout
 *
 * Visual card grid with slide-in drawer for contact details.
 * Features: Responsive auto-fill grid, staggered reveal, drawer integration.
 */

interface CardGridLayoutProps {
  contacts: Contact[];
}

export function CardGridLayout({ contacts }: CardGridLayoutProps) {
  const { selectedContactId, isDrawerOpen, openDrawer, closeDrawer } =
    useCrmStore();

  // Find selected contact
  const selectedContact =
    contacts.find((c) => c.id === selectedContactId) ?? null;

  // Empty state
  if (contacts.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center max-w-sm px-6">
          <div className="size-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-5">
            <Users className="size-7 text-muted-foreground/40" />
          </div>
          <h3 className="font-semibold text-heading text-foreground mb-2">
            No contacts found
          </h3>
          <p className="text-caption text-muted-foreground/70">
            Try adjusting your search or filters to find contacts.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-full overflow-y-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="p-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5"
        >
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              isSelected={contact.id === selectedContactId && isDrawerOpen}
              onClick={() => openDrawer(contact.id)}
            />
          ))}
        </motion.div>
      </div>

      <ContactDrawer
        contact={selectedContact}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
      />
    </>
  );
}
