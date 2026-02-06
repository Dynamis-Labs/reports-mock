import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Contact,
  ContactCategory,
  ContactSortField,
  SortDirection,
} from "../types/contact";
import { mockContacts } from "../data/mock-contacts";

/**
 * CRM Store
 *
 * Manages state for the CRM page with card-grid layout:
 * - Tracks selected contact and drawer open state
 * - Manages filtering and sorting
 *
 * View preferences are persisted to localStorage.
 */

interface CrmState {
  // ─── Contact Data ────────────────────────────────────────────────────────
  /** All contacts (mutable copy of mock data) */
  contacts: Contact[];

  // ─── View Configuration ──────────────────────────────────────────────────
  /** Sort field */
  sortField: ContactSortField;

  /** Sort direction */
  sortDirection: SortDirection;

  // ─── Selection State ─────────────────────────────────────────────────────
  /** Currently selected contact ID */
  selectedContactId: string | null;

  /** Whether the detail drawer is open */
  isDrawerOpen: boolean;

  // ─── Filtering ───────────────────────────────────────────────────────────
  /** Search query */
  searchQuery: string;

  /** Selected filter tags */
  selectedTags: string[];

  /** Selected relationship types filter */
  selectedRelationships: string[];

  /** Selected category filters (investor, client, other) */
  selectedCategories: ContactCategory[];

  // ─── UI State ────────────────────────────────────────────────────────────
  /** Whether filters panel is expanded */
  isFiltersPanelOpen: boolean;

  /** Pinned contact IDs (float to top) */
  pinnedContactIds: string[];

  // ─── Actions ─────────────────────────────────────────────────────────────
  // View actions
  setSortField: (field: ContactSortField) => void;
  setSortDirection: (direction: SortDirection) => void;
  toggleSortDirection: () => void;

  // Selection actions
  selectContact: (id: string | null) => void;

  // Drawer actions
  openDrawer: (contactId: string) => void;
  closeDrawer: () => void;

  // Filter actions
  setSearchQuery: (query: string) => void;
  toggleTag: (tag: string) => void;
  setSelectedTags: (tags: string[]) => void;
  toggleRelationship: (relationship: string) => void;
  toggleCategory: (category: ContactCategory) => void;
  clearFilters: () => void;

  // UI actions
  toggleFiltersPanel: () => void;
  setFiltersPanelOpen: (open: boolean) => void;

  // Contact data actions
  updateContactTags: (contactId: string, tags: string[]) => void;

  // Pin actions
  togglePin: (contactId: string) => void;

  // Derived data
  getAllUniqueTags: () => string[];

  // Utility
  reset: () => void;
}

const initialState = {
  contacts: mockContacts,
  sortField: "lastContacted" as ContactSortField,
  sortDirection: "desc" as SortDirection,
  selectedContactId: null,
  isDrawerOpen: false,
  searchQuery: "",
  selectedTags: [] as string[],
  selectedRelationships: [] as string[],
  selectedCategories: [] as ContactCategory[],
  isFiltersPanelOpen: false,
  pinnedContactIds: [] as string[],
};

export const useCrmStore = create<CrmState>()(
  persist(
    (set) => ({
      ...initialState,

      // ─── View Actions ──────────────────────────────────────────────────────
      setSortField: (field) => set({ sortField: field }),

      setSortDirection: (direction) => set({ sortDirection: direction }),

      toggleSortDirection: () =>
        set((state) => ({
          sortDirection: state.sortDirection === "asc" ? "desc" : "asc",
        })),

      // ─── Selection Actions ─────────────────────────────────────────────────
      selectContact: (id) => set({ selectedContactId: id }),

      // ─── Drawer Actions ────────────────────────────────────────────────────
      openDrawer: (contactId) =>
        set({
          selectedContactId: contactId,
          isDrawerOpen: true,
        }),

      closeDrawer: () => set({ isDrawerOpen: false }),

      // ─── Filter Actions ────────────────────────────────────────────────────
      setSearchQuery: (query) => set({ searchQuery: query }),

      toggleTag: (tag) =>
        set((state) => ({
          selectedTags: state.selectedTags.includes(tag)
            ? state.selectedTags.filter((t) => t !== tag)
            : [...state.selectedTags, tag],
        })),

      setSelectedTags: (tags) => set({ selectedTags: tags }),

      toggleRelationship: (relationship) =>
        set((state) => ({
          selectedRelationships: state.selectedRelationships.includes(
            relationship,
          )
            ? state.selectedRelationships.filter((r) => r !== relationship)
            : [...state.selectedRelationships, relationship],
        })),

      toggleCategory: (category) =>
        set((state) => ({
          selectedCategories: state.selectedCategories.includes(category)
            ? state.selectedCategories.filter((c) => c !== category)
            : [...state.selectedCategories, category],
        })),

      clearFilters: () =>
        set({
          searchQuery: "",
          selectedTags: [],
          selectedRelationships: [],
          selectedCategories: [],
        }),

      // ─── UI Actions ────────────────────────────────────────────────────────
      toggleFiltersPanel: () =>
        set((state) => ({ isFiltersPanelOpen: !state.isFiltersPanelOpen })),

      setFiltersPanelOpen: (open) => set({ isFiltersPanelOpen: open }),

      // ─── Contact Data Actions ───────────────────────────────────────────────
      updateContactTags: (contactId, tags) =>
        set((state) => ({
          contacts: state.contacts.map((contact) =>
            contact.id === contactId
              ? { ...contact, tags, updatedAt: new Date() }
              : contact,
          ),
        })),

      // ─── Pin Actions ────────────────────────────────────────────────────────
      togglePin: (contactId) =>
        set((state) => ({
          pinnedContactIds: state.pinnedContactIds.includes(contactId)
            ? state.pinnedContactIds.filter((id) => id !== contactId)
            : [...state.pinnedContactIds, contactId],
        })),

      // ─── Derived Data ───────────────────────────────────────────────────────
      getAllUniqueTags: () => {
        const state = useCrmStore.getState();
        const tagSet = new Set<string>();
        state.contacts.forEach((contact) => {
          contact.tags.forEach((tag) => tagSet.add(tag));
          contact.roleBadges.forEach((badge) => tagSet.add(badge));
        });
        return Array.from(tagSet).sort();
      },

      // ─── Utility ───────────────────────────────────────────────────────────
      reset: () => set({ ...initialState }),
    }),
    {
      name: "crm-data",
      version: 3, // Bump version to clear old localStorage data
      // Persist only user preferences, not contact data
      partialize: (state) => ({
        sortField: state.sortField,
        sortDirection: state.sortDirection,
        pinnedContactIds: state.pinnedContactIds,
      }),
    },
  ),
);

// ─────────────────────────────────────────────────────────────────────────────
// Selector Hooks (for optimized re-renders)
// ─────────────────────────────────────────────────────────────────────────────

/** Check if a contact is selected */
export function useIsContactSelected(contactId: string): boolean {
  return useCrmStore((state) => state.selectedContactId === contactId);
}

/** Check if any filters are active */
export function useHasActiveFilters(): boolean {
  return useCrmStore(
    (state) =>
      state.searchQuery !== "" ||
      state.selectedTags.length > 0 ||
      state.selectedRelationships.length > 0 ||
      state.selectedCategories.length > 0,
  );
}
