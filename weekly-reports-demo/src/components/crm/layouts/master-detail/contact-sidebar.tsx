import { motion } from "motion/react";
import { Search, X } from "lucide-react";
import { cn } from "../../../../lib/utils";
import { ContactAvatar } from "../../shared/contact-avatar";
import { useCrmStore } from "../../../../stores/crm-store";
import { springs, staggerContainer, staggerItem } from "../../../../lib/motion";
import type { Contact } from "../../../../types/contact";

/**
 * Contact Sidebar
 *
 * Condensed contact list for master-detail view.
 * Features search, selection state, and subtle hover animations.
 */

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "1d";
  if (days < 7) return `${days}d`;
  if (days < 30) return `${Math.floor(days / 7)}w`;
  return `${Math.floor(days / 30)}mo`;
}

interface ContactSidebarProps {
  contacts: Contact[];
}

export function ContactSidebar({ contacts }: ContactSidebarProps) {
  const { selectedContactId, selectContact, searchQuery, setSearchQuery } =
    useCrmStore();

  return (
    <div className="h-full flex flex-col bg-sidebar border-r border-border">
      {/* Header */}
      <header className="shrink-0 p-4 border-b border-border-subtle">
        <h2 className="font-semibold text-ui text-foreground mb-3">Contacts</h2>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className={cn(
              "w-full h-8 pl-8 pr-8 rounded-md",
              "bg-muted/50 border-0",
              "text-caption placeholder:text-muted-foreground/60",
              "focus:outline-none focus:ring-1 focus:ring-accent",
            )}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground"
            >
              <X className="size-3" />
            </button>
          )}
        </div>
      </header>

      {/* Contact List */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex-1 overflow-y-auto p-2 space-y-0.5"
      >
        {contacts.map((contact) => {
          const isSelected = contact.id === selectedContactId;
          const fullName = `${contact.firstName} ${contact.lastName}`;
          const isOverdue =
            contact.nextFollowUp && contact.nextFollowUp <= new Date();

          return (
            <motion.button
              key={contact.id}
              variants={staggerItem}
              onClick={() => selectContact(contact.id)}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-lg",
                "transition-all duration-150",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
                isSelected ? "bg-accent-muted shadow-sm" : "hover:bg-muted/70",
              )}
              whileHover={{ x: isSelected ? 0 : 2 }}
              transition={springs.quick}
            >
              <div className="flex items-center gap-3">
                <ContactAvatar contact={contact} size="sm" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "font-medium text-[13px] truncate",
                        isSelected
                          ? "text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {fullName}
                    </span>
                    {isOverdue && (
                      <span className="size-1.5 rounded-full bg-amber-500 shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[11px] text-muted-foreground/60 truncate">
                      {contact.company}
                    </span>
                    <span className="text-muted-foreground/30">·</span>
                    <span className="text-[11px] text-muted-foreground/60 tabular-nums shrink-0">
                      {formatRelativeTime(contact.lastContacted)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}

        {contacts.length === 0 && (
          <div className="px-3 py-8 text-center">
            <p className="text-caption text-muted-foreground/60">
              No contacts found
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
