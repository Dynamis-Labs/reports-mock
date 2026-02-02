import { useMemo } from "react";
import { Users } from "lucide-react";
import { CrmHeader } from "./crm-header";
import { AccordionLayout, MasterDetailLayout, CardGridLayout } from "./layouts";
import { useCrmStore } from "../../stores/crm-store";
import { mockContacts } from "../../data/mock-contacts";

/**
 * CRM Page
 *
 * Main container for the CRM section with three switchable view layouts:
 * - Accordion: Inline expand pattern
 * - Master-Detail: Sidebar + detail pane
 * - Card Grid: Visual cards with drawer
 */

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
              <CardGridLayout contacts={filteredContacts} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
