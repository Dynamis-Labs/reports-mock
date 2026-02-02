import { ContactSidebar } from "./contact-sidebar";
import { ContactDetailPane } from "./contact-detail-pane";
import { useCrmStore } from "../../../../stores/crm-store";
import type { Contact } from "../../../../types/contact";

/**
 * Master-Detail Layout
 *
 * Split view with sidebar contact list and full detail pane.
 * Matches the existing Reports section pattern.
 */

interface MasterDetailLayoutProps {
  contacts: Contact[];
}

export function MasterDetailLayout({ contacts }: MasterDetailLayoutProps) {
  const { selectedContactId } = useCrmStore();

  // Find selected contact
  const selectedContact =
    contacts.find((c) => c.id === selectedContactId) ?? null;

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar */}
      <div className="w-[240px] shrink-0">
        <ContactSidebar contacts={contacts} />
      </div>

      {/* Detail Pane */}
      <div className="flex-1 overflow-hidden">
        <ContactDetailPane contact={selectedContact} />
      </div>
    </div>
  );
}
