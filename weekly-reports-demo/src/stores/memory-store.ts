import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  MemoryEvent,
  MemoryEventType,
  MemorySource,
  Initiative,
} from "../types/memory";
import {
  mockMemoryEvents,
  getEventsByWeek,
  getOrderedWeekLabels,
} from "../data/mock-memories";
import { mockInitiatives } from "../data/mock-initiatives";

/**
 * Memory Store
 *
 * Manages state for the Memory timeline page:
 * - Initiatives (swimlanes) and events data
 * - Initiative and event selection
 * - Sources panel state
 * - Sidebar accordion state (ACTIVE/BLOCKED sections)
 *
 * View preferences (expandedSections) are persisted.
 */

type SidebarSection = "active" | "blocked";

interface MemoryState {
  // ─── Data ────────────────────────────────────────────────────────────────
  /** All memory events */
  events: MemoryEvent[];

  /** All initiatives (swimlanes) */
  initiatives: Initiative[];

  // ─── Selection State ─────────────────────────────────────────────────────
  /** Currently selected initiative ID */
  selectedInitiativeId: string | null;

  /** Currently selected event ID (within the selected initiative) */
  selectedEventId: string | null;

  // ─── Sources Panel State ─────────────────────────────────────────────────
  /** Whether the sources panel is open */
  isSourcesPanelOpen: boolean;

  /** Sources to display in the panel */
  sourcePanelSources: MemorySource[];

  // ─── Sidebar State ───────────────────────────────────────────────────────
  /** Sidebar sections that are expanded (ACTIVE, BLOCKED) */
  expandedSections: SidebarSection[];

  // ─── Legacy State (for compatibility) ────────────────────────────────────
  /** Search query */
  searchQuery: string;

  /** Selected event types to filter by */
  selectedTypes: MemoryEventType[];

  /** Week labels that are expanded (legacy) */
  expandedWeeks: string[];

  /** Whether the detail popup is open (legacy) */
  isPopupOpen: boolean;

  // ─── Initiative Actions ──────────────────────────────────────────────────
  selectInitiative: (id: string | null) => void;

  // ─── Event Actions ───────────────────────────────────────────────────────
  selectEvent: (id: string | null) => void;
  clearSelection: () => void;

  // ─── Sources Panel Actions ───────────────────────────────────────────────
  openSourcesPanel: (sources: MemorySource[]) => void;
  closeSourcesPanel: () => void;

  // ─── Sidebar Actions ─────────────────────────────────────────────────────
  toggleSection: (section: SidebarSection) => void;
  expandAllSections: () => void;
  collapseAllSections: () => void;

  // ─── Legacy Actions (for compatibility) ──────────────────────────────────
  openPopup: (eventId: string) => void;
  closePopup: () => void;
  setSearchQuery: (query: string) => void;
  toggleEventType: (type: MemoryEventType) => void;
  clearFilters: () => void;
  toggleWeekExpanded: (weekLabel: string) => void;
  expandAllWeeks: () => void;
  collapseAllWeeks: () => void;
  toggleActionItem: (eventId: string, actionItemId: string) => void;

  // ─── Computed / Derived Data ─────────────────────────────────────────────
  /** Get initiatives grouped by status */
  getInitiativesByStatus: () => {
    active: Initiative[];
    blocked: Initiative[];
  };

  /** Get events for a specific initiative */
  getEventsForInitiative: (initiativeId: string) => MemoryEvent[];

  /** Get the selected initiative object */
  getSelectedInitiative: () => Initiative | null;

  /** Get the selected event object */
  getSelectedEvent: () => MemoryEvent | null;

  /** Get events grouped by week for timeline display */
  getEventsByWeekForInitiative: (
    initiativeId: string,
  ) => Map<string, MemoryEvent[]>;

  /** Get ordered week labels for an initiative */
  getWeekLabelsForInitiative: (initiativeId: string) => string[];

  // Legacy computed
  getFilteredEvents: () => MemoryEvent[];
  getEventsByWeekGrouped: () => Map<string, MemoryEvent[]>;
  getOrderedWeeks: () => string[];

  // ─── Utility ─────────────────────────────────────────────────────────────
  reset: () => void;
}

const initialState = {
  events: mockMemoryEvents,
  initiatives: mockInitiatives,
  selectedInitiativeId: mockInitiatives[0]?.id || null, // Select first initiative by default
  selectedEventId: null as string | null,
  isSourcesPanelOpen: false,
  sourcePanelSources: [] as MemorySource[],
  expandedSections: ["active"] as SidebarSection[], // ACTIVE expanded by default
  // Legacy
  searchQuery: "",
  selectedTypes: [] as MemoryEventType[],
  expandedWeeks: ["This Week", "Last Week"],
  isPopupOpen: false,
};

export const useMemoryStore = create<MemoryState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // ═══════════════════════════════════════════════════════════════════════
      // Initiative Actions
      // ═══════════════════════════════════════════════════════════════════════

      selectInitiative: (id) =>
        set({
          selectedInitiativeId: id,
          selectedEventId: null, // Clear event selection when changing initiative
        }),

      // ═══════════════════════════════════════════════════════════════════════
      // Event Actions
      // ═══════════════════════════════════════════════════════════════════════

      selectEvent: (id) => set({ selectedEventId: id }),

      clearSelection: () =>
        set({ selectedEventId: null, selectedInitiativeId: null }),

      // ═══════════════════════════════════════════════════════════════════════
      // Sources Panel Actions
      // ═══════════════════════════════════════════════════════════════════════

      openSourcesPanel: (sources) =>
        set({
          isSourcesPanelOpen: true,
          sourcePanelSources: sources,
        }),

      closeSourcesPanel: () =>
        set({
          isSourcesPanelOpen: false,
          sourcePanelSources: [],
        }),

      // ═══════════════════════════════════════════════════════════════════════
      // Sidebar Actions
      // ═══════════════════════════════════════════════════════════════════════

      toggleSection: (section) =>
        set((state) => {
          const expanded = state.expandedSections.includes(section)
            ? state.expandedSections.filter((s) => s !== section)
            : [...state.expandedSections, section];
          return { expandedSections: expanded };
        }),

      expandAllSections: () => set({ expandedSections: ["active", "blocked"] }),

      collapseAllSections: () => set({ expandedSections: [] }),

      // ═══════════════════════════════════════════════════════════════════════
      // Legacy Actions (for compatibility with existing components)
      // ═══════════════════════════════════════════════════════════════════════

      openPopup: (eventId) =>
        set({
          selectedEventId: eventId,
          isPopupOpen: true,
        }),

      closePopup: () => set({ isPopupOpen: false }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      toggleEventType: (type) =>
        set((state) => {
          const types = state.selectedTypes.includes(type)
            ? state.selectedTypes.filter((t) => t !== type)
            : [...state.selectedTypes, type];
          return { selectedTypes: types };
        }),

      clearFilters: () =>
        set({
          searchQuery: "",
          selectedTypes: [],
        }),

      toggleWeekExpanded: (weekLabel) =>
        set((state) => {
          const expanded = state.expandedWeeks.includes(weekLabel)
            ? state.expandedWeeks.filter((w) => w !== weekLabel)
            : [...state.expandedWeeks, weekLabel];
          return { expandedWeeks: expanded };
        }),

      expandAllWeeks: () =>
        set((state) => ({
          expandedWeeks: getOrderedWeekLabels(state.events),
        })),

      collapseAllWeeks: () => set({ expandedWeeks: [] }),

      toggleActionItem: (eventId, actionItemId) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === eventId
              ? {
                  ...event,
                  actionItems: event.actionItems.map((item) =>
                    item.id === actionItemId
                      ? { ...item, isCompleted: !item.isCompleted }
                      : item,
                  ),
                  updatedAt: new Date(),
                }
              : event,
          ),
        })),

      // ═══════════════════════════════════════════════════════════════════════
      // Computed / Derived Data
      // ═══════════════════════════════════════════════════════════════════════

      getInitiativesByStatus: () => {
        const { initiatives } = get();
        const active: Initiative[] = [];
        const blocked: Initiative[] = [];

        for (const initiative of initiatives) {
          if (initiative.status === "active") {
            active.push(initiative);
          } else if (initiative.status === "blocked") {
            blocked.push(initiative);
          }
        }

        return { active, blocked };
      },

      getEventsForInitiative: (initiativeId) => {
        const { events } = get();
        return events
          .filter((e) => e.initiativeId === initiativeId)
          .sort((a, b) => a.date.getTime() - b.date.getTime()); // Oldest first for timeline
      },

      getSelectedInitiative: () => {
        const { initiatives, selectedInitiativeId } = get();
        return initiatives.find((i) => i.id === selectedInitiativeId) || null;
      },

      getSelectedEvent: () => {
        const { events, selectedEventId } = get();
        return events.find((e) => e.id === selectedEventId) || null;
      },

      getEventsByWeekForInitiative: (initiativeId) => {
        const events = get().getEventsForInitiative(initiativeId);
        return getEventsByWeek(events);
      },

      getWeekLabelsForInitiative: (initiativeId) => {
        const events = get().getEventsForInitiative(initiativeId);
        return getOrderedWeekLabels(events);
      },

      // Legacy computed
      getFilteredEvents: () => {
        const { events, searchQuery, selectedTypes } = get();

        return events.filter((event) => {
          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const searchableText = [
              event.title,
              event.summary,
              event.category,
              ...event.tags,
              ...event.participants.map((p) => p.name),
            ]
              .join(" ")
              .toLowerCase();
            if (!searchableText.includes(query)) return false;
          }

          if (selectedTypes.length > 0) {
            if (!selectedTypes.includes(event.type)) return false;
          }

          return true;
        });
      },

      getEventsByWeekGrouped: () => {
        const filteredEvents = get().getFilteredEvents();
        return getEventsByWeek(filteredEvents);
      },

      getOrderedWeeks: () => {
        const filteredEvents = get().getFilteredEvents();
        return getOrderedWeekLabels(filteredEvents);
      },

      // ═══════════════════════════════════════════════════════════════════════
      // Utility
      // ═══════════════════════════════════════════════════════════════════════

      reset: () => set(initialState),
    }),
    {
      name: "memory-storage",
      version: 2, // Bump version for new structure
      partialize: (state) => ({
        // Only persist view preferences
        expandedSections: state.expandedSections,
        expandedWeeks: state.expandedWeeks,
      }),
    },
  ),
);

// ═══════════════════════════════════════════════════════════════════════════
// Selector Hooks (for optimized re-renders)
// ═══════════════════════════════════════════════════════════════════════════

export function useIsInitiativeSelected(initiativeId: string): boolean {
  return useMemoryStore((state) => state.selectedInitiativeId === initiativeId);
}

export function useIsEventSelected(eventId: string): boolean {
  return useMemoryStore((state) => state.selectedEventId === eventId);
}

export function useIsSectionExpanded(section: SidebarSection): boolean {
  return useMemoryStore((state) => state.expandedSections.includes(section));
}

export function useIsWeekExpanded(weekLabel: string): boolean {
  return useMemoryStore((state) => state.expandedWeeks.includes(weekLabel));
}

export function useHasActiveFilters(): boolean {
  return useMemoryStore(
    (state) => state.searchQuery !== "" || state.selectedTypes.length > 0,
  );
}
