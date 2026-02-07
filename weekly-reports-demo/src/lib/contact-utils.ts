import type { Contact } from "@types/contact";

/** Get full name from contact */
export function getFullName(contact: Contact): string {
  return `${contact.firstName} ${contact.lastName}`;
}
