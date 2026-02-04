import { useMemo } from "react";
import { Users } from "lucide-react";
import { CrmHeader } from "./crm-header";
import { CardGridLayout } from "./layouts";
import { useCrmStore } from "../../stores/crm-store";

/**
 * CRM Page
 *
 * Clean, full-width contact management page with card grid layout.
 * Editorial design aesthetic - generous spacing, refined typography.
 */

export function CrmPage() {
  const { contacts, searchQuery, selectedTags, selectedRelationships } =
    useCrmStore();

  // Filter contacts based on search and filters
  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
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
  }, [contacts, searchQuery, selectedTags, selectedRelationships]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      <CrmHeader />

      <div className="flex-1 overflow-hidden">
        {filteredContacts.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Users
                className="size-12 mx-auto mb-4 text-muted-foreground/20"
                strokeWidth={1}
              />
              <p className="text-muted-foreground font-medium">
                No contacts found
              </p>
              <p className="text-sm text-muted-foreground/50 mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          </div>
        ) : (
          <CardGridLayout contacts={filteredContacts} />
        )}
      </div>
    </div>
  );
}
