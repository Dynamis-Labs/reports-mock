import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  ContactSortField,
  SortDirection,
  CrmCardStyle,
} from "../types/contact";

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

  // ─── UI State ────────────────────────────────────────────────────────────
  /** Whether filters panel is expanded */
  isFiltersPanelOpen: boolean;

  /** Card display style */
  cardStyle: CrmCardStyle;

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
  clearFilters: () => void;

  // UI actions
  toggleFiltersPanel: () => void;
  setFiltersPanelOpen: (open: boolean) => void;

  // Card style actions
  setCardStyle: (style: CrmCardStyle) => void;

  // Utility
  reset: () => void;
}

const initialState = {
  sortField: "lastContacted" as ContactSortField,
  sortDirection: "desc" as SortDirection,
  selectedContactId: null,
  isDrawerOpen: false,
  searchQuery: "",
  selectedTags: [] as string[],
  selectedRelationships: [] as string[],
  isFiltersPanelOpen: false,
  cardStyle: "polaroid" as CrmCardStyle,
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

      clearFilters: () =>
        set({
          searchQuery: "",
          selectedTags: [],
          selectedRelationships: [],
        }),

      // ─── UI Actions ────────────────────────────────────────────────────────
      toggleFiltersPanel: () =>
        set((state) => ({ isFiltersPanelOpen: !state.isFiltersPanelOpen })),

      setFiltersPanelOpen: (open) => set({ isFiltersPanelOpen: open }),

      // ─── Card Style Actions ────────────────────────────────────────────────
      setCardStyle: (style) => set({ cardStyle: style }),

      // ─── Utility ───────────────────────────────────────────────────────────
      reset: () => set({ ...initialState }),
    }),
    {
      name: "crm-preferences",
      // Persist sort preferences and card style
      partialize: (state) => ({
        sortField: state.sortField,
        sortDirection: state.sortDirection,
        cardStyle: state.cardStyle,
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
      state.selectedRelationships.length > 0,
  );
}
