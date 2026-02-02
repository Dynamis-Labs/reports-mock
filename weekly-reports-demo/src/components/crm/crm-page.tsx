import { useMemo } from "react";
import { motion } from "motion/react";
import { Users } from "lucide-react";
import { CrmHeader } from "./crm-header";
import { AccordionLayout } from "./layouts/accordion";
import { MasterDetailLayout } from "./layouts/master-detail";
import { useCrmStore } from "../../stores/crm-store";
import { mockContacts } from "../../data/mock-contacts";
import { staggerContainer, staggerItem } from "../../lib/motion";
import type { Contact } from "../../types/contact";

/**
 * CRM Page
 *
 * Main container for the CRM section with three switchable view layouts:
 * - Accordion: Inline expand pattern
 * - Master-Detail: Sidebar + detail pane
 * - Card Grid: Visual cards with drawer
 */

// ─────────────────────────────────────────────────────────────────────────────
// Placeholder: Card Grid Layout (to be built in Task 5)
// ─────────────────────────────────────────────────────────────────────────────

function CardGridLayout({ contacts }: { contacts: Contact[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="p-6 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4"
    >
      {contacts.map((contact) => (
        <motion.button
          key={contact.id}
          variants={staggerItem}
          className="text-left p-5 rounded-xl border border-border-subtle bg-surface hover:bg-surface-elevated hover:border-border transition-all"
        >
          <div className="flex items-start gap-4 mb-3">
            <div className="size-12 rounded-full bg-accent-muted flex items-center justify-center text-accent font-medium text-lg">
              {contact.firstName[0]}
              {contact.lastName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-heading text-foreground truncate">
                {contact.firstName} {contact.lastName}
              </p>
              <p className="text-ui text-muted-foreground truncate">
                {contact.company}
              </p>
            </div>
          </div>
          <p className="text-caption text-muted-foreground line-clamp-2">
            {contact.insights.aiSummary}
          </p>
        </motion.button>
      ))}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main CRM Page Component
// ─────────────────────────────────────────────────────────────────────────────

export function CrmPage() {
  const { viewMode, searchQuery, selectedTags, selectedRelationships } =
    useCrmStore();

  // Filter contacts based on search and filters
  const filteredContacts = useMemo(() => {
    return mockContacts.filter((contact) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = [
          contact.firstName,
          contact.lastName,
          contact.company,
          contact.title,
          contact.email,
          contact.insights.aiSummary,
        ]
          .join(" ")
          .toLowerCase();
        if (!searchableText.includes(query)) return false;
      }

      // Tag filter
      if (selectedTags.length > 0) {
        const contactTags = [...contact.tags, ...contact.roleBadges];
        if (!selectedTags.some((tag) => contactTags.includes(tag))) {
          return false;
        }
      }

      // Relationship filter
      if (selectedRelationships.length > 0) {
        if (!selectedRelationships.includes(contact.relationship)) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedTags, selectedRelationships]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      <CrmHeader contactCount={filteredContacts.length} />

      <div className="flex-1 overflow-hidden">
        {filteredContacts.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Users className="size-12 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-muted-foreground">No contacts found</p>
              <p className="text-caption text-muted-foreground/60 mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          </div>
        ) : (
          <>
            {viewMode === "accordion" && (
              <AccordionLayout contacts={filteredContacts} />
            )}
            {viewMode === "master-detail" && (
              <MasterDetailLayout contacts={filteredContacts} />
            )}
            {viewMode === "card-grid" && (
              <div className="h-full overflow-y-auto">
                <CardGridLayout contacts={filteredContacts} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
