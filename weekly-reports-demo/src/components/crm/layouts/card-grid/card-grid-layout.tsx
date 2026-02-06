import { useMemo } from "react";
import { Users } from "lucide-react";
import { motion } from "motion/react";
import { ContactCard } from "./contact-card";
import { ContactDrawer } from "./contact-drawer";
import { useCrmStore } from "../../../../stores/crm-store";
import { staggerContainer } from "../../../../lib/motion";
import type { Contact } from "../../../../types/contact";

/**
 * Card Grid Layout
 *
 * Flat grid of all contact cards — no category accordion sections.
 * Pinned contacts float to top, others sorted by last contacted.
 */

interface CardGridLayoutProps {
  contacts: Contact[];
}

export function CardGridLayout({ contacts }: CardGridLayoutProps) {
  const {
    contacts: allContacts,
    selectedContactId,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    pinnedContactIds,
  } = useCrmStore();

  // Get selected contact from full store contacts (not filtered)
  const selectedContact =
    allContacts.find((c) => c.id === selectedContactId) ?? null;

  // Sort contacts: pinned first, then by last contacted
  const sortedContacts = useMemo(() => {
    return [...contacts].sort((a, b) => {
      const aPinned = pinnedContactIds.includes(a.id);
      const bPinned = pinnedContactIds.includes(b.id);

      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;

      return (
        new Date(b.lastContacted).getTime() -
        new Date(a.lastContacted).getTime()
      );
    });
  }, [contacts, pinnedContactIds]);

  if (contacts.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center max-w-sm px-6">
          <div className="size-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-5">
            <Users
              className="size-7 text-muted-foreground/40"
              strokeWidth={1.5}
            />
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
      <div className="h-full overflow-y-auto p-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
        >
          {sortedContacts.map((contact) => (
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
