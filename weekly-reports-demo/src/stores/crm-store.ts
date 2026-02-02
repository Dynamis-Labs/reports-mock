import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  CrmViewMode,
  ContactSortField,
  SortDirection,
} from "../types/contact";

/**
 * CRM Store
 *
 * Manages state for the CRM page across all three view modes:
 * - Accordion: tracks which contacts are expanded
 * - Master-Detail: tracks selected contact for detail pane
 * - Card Grid: tracks selected contact and drawer open state
 *
 * View preferences are persisted to localStorage.
 */

interface CrmState {
  // ─── View Configuration ──────────────────────────────────────────────────
  /** Current layout mode */
  viewMode: CrmViewMode;

  /** Sort field */
  sortField: ContactSortField;

  /** Sort direction */
  sortDirection: SortDirection;

  // ─── Selection State ─────────────────────────────────────────────────────
  /** Currently selected contact ID (for master-detail and card-grid) */
  selectedContactId: string | null;

  /** Expanded contact IDs (for accordion view - allows multiple) */
  expandedContactIds: Set<string>;

  /** Whether the detail drawer is open (for card-grid) */
  isDrawerOpen: boolean;

  // ─── Filtering ───────────────────────────────────────────────────────────
  /** Search query */
  searchQuery: string;

  /** Selected filter tags */
  selectedTags: string[];

  /** Selected relationship types filter */
  selectedRelationships: string[];

  /** Selected warmth filter */
  selectedWarmth: string[];

  // ─── UI State ────────────────────────────────────────────────────────────
  /** Whether filters panel is expanded */
  isFiltersPanelOpen: boolean;

  // ─── Actions ─────────────────────────────────────────────────────────────
  // View actions
  setViewMode: (mode: CrmViewMode) => void;
  setSortField: (field: ContactSortField) => void;
  setSortDirection: (direction: SortDirection) => void;
  toggleSortDirection: () => void;

  // Selection actions
  selectContact: (id: string | null) => void;
  toggleExpanded: (id: string) => void;
  expandContact: (id: string) => void;
  collapseContact: (id: string) => void;
  collapseAll: () => void;

  // Drawer actions (for card-grid view)
  openDrawer: (contactId: string) => void;
  closeDrawer: () => void;

  // Filter actions
  setSearchQuery: (query: string) => void;
  toggleTag: (tag: string) => void;
  setSelectedTags: (tags: string[]) => void;
  toggleRelationship: (relationship: string) => void;
  toggleWarmth: (warmth: string) => void;
  clearFilters: () => void;

  // UI actions
  toggleFiltersPanel: () => void;
  setFiltersPanelOpen: (open: boolean) => void;

  // Utility
  reset: () => void;
}

const initialState = {
  viewMode: "accordion" as CrmViewMode,
  sortField: "lastContacted" as ContactSortField,
  sortDirection: "desc" as SortDirection,
  selectedContactId: null,
  expandedContactIds: new Set<string>(),
  isDrawerOpen: false,
  searchQuery: "",
  selectedTags: [] as string[],
  selectedRelationships: [] as string[],
  selectedWarmth: [] as string[],
  isFiltersPanelOpen: false,
};

export const useCrmStore = create<CrmState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // ─── View Actions ──────────────────────────────────────────────────────
      setViewMode: (mode) => {
        // When switching views, close drawer and collapse all
        set({
          viewMode: mode,
          isDrawerOpen: false,
          expandedContactIds: new Set(),
        });
      },

      setSortField: (field) => set({ sortField: field }),

      setSortDirection: (direction) => set({ sortDirection: direction }),

      toggleSortDirection: () =>
        set((state) => ({
          sortDirection: state.sortDirection === "asc" ? "desc" : "asc",
        })),

      // ─── Selection Actions ─────────────────────────────────────────────────
      selectContact: (id) => set({ selectedContactId: id }),

      toggleExpanded: (id) =>
        set((state) => {
          const next = new Set(state.expandedContactIds);
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          return { expandedContactIds: next };
        }),

      expandContact: (id) =>
        set((state) => {
          const next = new Set(state.expandedContactIds);
          next.add(id);
          return { expandedContactIds: next };
        }),

      collapseContact: (id) =>
        set((state) => {
          const next = new Set(state.expandedContactIds);
          next.delete(id);
          return { expandedContactIds: next };
        }),

      collapseAll: () => set({ expandedContactIds: new Set() }),

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
            relationship
          )
            ? state.selectedRelationships.filter((r) => r !== relationship)
            : [...state.selectedRelationships, relationship],
        })),

      toggleWarmth: (warmth) =>
        set((state) => ({
          selectedWarmth: state.selectedWarmth.includes(warmth)
            ? state.selectedWarmth.filter((w) => w !== warmth)
            : [...state.selectedWarmth, warmth],
        })),

      clearFilters: () =>
        set({
          searchQuery: "",
          selectedTags: [],
          selectedRelationships: [],
          selectedWarmth: [],
        }),

      // ─── UI Actions ────────────────────────────────────────────────────────
      toggleFiltersPanel: () =>
        set((state) => ({ isFiltersPanelOpen: !state.isFiltersPanelOpen })),

      setFiltersPanelOpen: (open) => set({ isFiltersPanelOpen: open }),

      // ─── Utility ───────────────────────────────────────────────────────────
      reset: () =>
        set({
          ...initialState,
          // Preserve persisted preferences
          viewMode: get().viewMode,
        }),
    }),
    {
      name: "crm-preferences",
      // Only persist view preferences, not selection/filter state
      partialize: (state) => ({
        viewMode: state.viewMode,
        sortField: state.sortField,
        sortDirection: state.sortDirection,
      }),
      // Handle Set serialization for expandedContactIds
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          return {
            ...parsed,
            state: {
              ...parsed.state,
              expandedContactIds: new Set(),
            },
          };
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);

// ─────────────────────────────────────────────────────────────────────────────
// Selector Hooks (for optimized re-renders)
// ─────────────────────────────────────────────────────────────────────────────

/** Check if a contact is expanded */
export function useIsContactExpanded(contactId: string): boolean {
  return useCrmStore((state) => state.expandedContactIds.has(contactId));
}

/** Check if a contact is selected */
export function useIsContactSelected(contactId: string): boolean {
  return useCrmStore((state) => state.selectedContactId === contactId);
}

/** Get current view mode */
export function useViewMode(): CrmViewMode {
  return useCrmStore((state) => state.viewMode);
}

/** Check if any filters are active */
export function useHasActiveFilters(): boolean {
  return useCrmStore(
    (state) =>
      state.searchQuery !== "" ||
      state.selectedTags.length > 0 ||
      state.selectedRelationships.length > 0 ||
      state.selectedWarmth.length > 0
  );
}
