import { useState, useMemo } from "react";
import {
  Users,
  ChevronDown,
  Briefcase,
  UserCircle,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ContactCard } from "./contact-card";
import { ContactDrawer } from "./contact-drawer";
import { useCrmStore } from "../../../../stores/crm-store";
import { staggerContainer } from "../../../../lib/motion";
import type { Contact, ContactCategory } from "../../../../types/contact";

/**
 * Card Grid Layout
 *
 * Grid of contact cards organized by category accordions:
 * Investors (top), Clients (middle), Other (bottom).
 * Pinned contacts float to top within each section.
 */

interface CardGridLayoutProps {
  contacts: Contact[];
}

const categoryConfig: Record<
  ContactCategory,
  { label: string; Icon: typeof Users }
> = {
  investor: { label: "Investors", Icon: Building2 },
  client: { label: "Clients", Icon: Briefcase },
  other: { label: "Other", Icon: UserCircle },
};

const categoryOrder: ContactCategory[] = ["investor", "client", "other"];

export function CardGridLayout({ contacts }: CardGridLayoutProps) {
  const {
    contacts: allContacts,
    selectedContactId,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    pinnedContactIds,
  } = useCrmStore();

  // Track which accordion sections are expanded (all expanded by default)
  const [expandedSections, setExpandedSections] = useState<
    Set<ContactCategory>
  >(new Set(categoryOrder));

  // Get selected contact from full store contacts (not filtered)
  const selectedContact =
    allContacts.find((c) => c.id === selectedContactId) ?? null;

  // Group and sort contacts by category
  const groupedContacts = useMemo(() => {
    const groups: Record<ContactCategory, Contact[]> = {
      investor: [],
      client: [],
      other: [],
    };

    // Group contacts by category
    for (const contact of contacts) {
      groups[contact.category].push(contact);
    }

    // Sort each group: pinned first, then by last contacted
    for (const category of categoryOrder) {
      groups[category].sort((a, b) => {
        const aPinned = pinnedContactIds.includes(a.id);
        const bPinned = pinnedContactIds.includes(b.id);

        if (aPinned && !bPinned) return -1;
        if (!aPinned && bPinned) return 1;

        // Both pinned or both not pinned - sort by last contacted
        return (
          new Date(b.lastContacted).getTime() -
          new Date(a.lastContacted).getTime()
        );
      });
    }

    return groups;
  }, [contacts, pinnedContactIds]);

  const toggleSection = (category: ContactCategory) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  // Get categories that have contacts
  const nonEmptyCategories = categoryOrder.filter(
    (cat) => groupedContacts[cat].length > 0,
  );

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
        <div className="space-y-6">
          {nonEmptyCategories.map((category) => {
            const config = categoryConfig[category];
            const categoryContacts = groupedContacts[category];
            const isExpanded = expandedSections.has(category);
            const { Icon } = config;

            return (
              <div key={category}>
                {/* Minimal Section Header - just text, no box */}
                <button
                  id={`crm-accordion-header-${category}`}
                  onClick={() => toggleSection(category)}
                  aria-expanded={isExpanded}
                  aria-controls={`crm-accordion-${category}`}
                  className="w-full flex items-center gap-2 mb-3 group"
                >
                  <div className="flex items-center gap-1.5">
                    <Icon
                      className="size-4 text-muted-foreground/60"
                      strokeWidth={1.5}
                    />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {config.label}
                    </span>
                    <span className="text-[11px] text-muted-foreground/50 tabular-nums">
                      {categoryContacts.length}
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-muted-foreground/50 group-hover:text-muted-foreground transition-colors"
                    >
                      <ChevronDown className="size-3.5" strokeWidth={1.5} />
                    </motion.div>
                  </div>
                  <div className="h-px flex-1 bg-border-subtle" />
                </button>

                {/* Section Content - no background, cards have their own borders */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={`crm-accordion-${category}`}
                      role="region"
                      aria-labelledby={`crm-accordion-header-${category}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
                      >
                        {categoryContacts.map((contact) => (
                          <ContactCard
                            key={contact.id}
                            contact={contact}
                            isSelected={
                              contact.id === selectedContactId && isDrawerOpen
                            }
                            onClick={() => openDrawer(contact.id)}
                          />
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <ContactDrawer
        contact={selectedContact}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
      />
    </>
  );
}
