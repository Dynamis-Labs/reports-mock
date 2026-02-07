import type { Contact } from "@types/contact";
import { investorContacts } from "./investor-contacts";
import { clientContacts } from "./client-contacts";
import { otherContacts } from "./other-contacts";

/**
 * Mock CRM Contacts
 *
 * 38 contacts organized into three categories:
 * - Investors (12): VCs, angels, board members
 * - Clients (14): Enterprise customers, prospects
 * - Other (12): Advisors, partners, industry contacts
 */
export const mockContacts: Contact[] = [
  ...investorContacts,
  ...clientContacts,
  ...otherContacts,
];

// ─────────────────────────────────────────────────────────────────────────────
// Utility Functions
// ─────────────────────────────────────────────────────────────────────────────

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  mockContacts.forEach((contact) => {
    contact.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

export function getContactsNeedingFollowUp(): Contact[] {
  const now = new Date();
  return mockContacts.filter((c) => c.nextFollowUp && c.nextFollowUp <= now);
}

export function getContactsByCategory(
  category: Contact["category"],
): Contact[] {
  return mockContacts.filter((c) => c.category === category);
}
