import { Brain } from "lucide-react";
import { PageBreadcrumbHeader } from "../layout/page-breadcrumb-header";
import { MemoryInitiativeSidebar } from "./memory-initiative-sidebar";
import { MemoryInitiativeHeader } from "./memory-initiative-header";
import { MemoryTimeline } from "./memory-timeline";
import { MemoryEventDetail } from "./memory-event-detail";
import { MemorySourcesPanel } from "./memory-sources-panel";
import { useMemoryStore } from "../../stores/memory-store";

/**
 * Memory Page
 *
 * Initiative-centric timeline view with:
 * - Left sidebar: Initiatives (swimlanes) grouped by ACTIVE/BLOCKED status
 * - Initiative header: Title, description, stakeholder avatars
 * - Horizontal timeline: Week markers with event cards
 * - Event detail panel: Slides up when event selected
 * - Sources panel: Slides in from right when sources button clicked
 *
 * Layout:
 * ┌────────────────────────────────────────────────────────────────┐
 * │ Breadcrumb Header                                              │
 * ├───────────┬────────────────────────────────────────────────────┤
 * │           │ Initiative Header                                  │
 * │  Sidebar  ├────────────────────────────────────────────────────┤
 * │  (220px)  │ Timeline (week columns with event cards)           │
 * │           ├────────────────────────────────────────────────────┤
 * │           │ Event Detail (when event selected)                 │
 * └───────────┴────────────────────────────────────────────────────┘
 */

export function MemoryPage() {
  // Get selected IDs from store
  const selectedInitiativeId = useMemoryStore(
    (state) => state.selectedInitiativeId,
  );
  const selectedEventId = useMemoryStore((state) => state.selectedEventId);

  // Get data from store
  const initiatives = useMemoryStore((state) => state.initiatives);
  const events = useMemoryStore((state) => state.events);

  // Derive selected objects
  const selectedInitiative =
    initiatives.find((i) => i.id === selectedInitiativeId) || null;
  const selectedEvent = events.find((e) => e.id === selectedEventId) || null;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background relative">
      {/* Breadcrumb Header */}
      <PageBreadcrumbHeader items={[{ label: "Memory", icon: Brain }]} />

      {/* Main Layout: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Initiative Swimlanes */}
        <MemoryInitiativeSidebar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* Initiative Header */}
          <MemoryInitiativeHeader initiative={selectedInitiative} />

          {/* Timeline with week markers */}
          <MemoryTimeline />

          {/* Event Detail Panel - Floating overlay positioned higher */}
          <MemoryEventDetail event={selectedEvent} />
        </main>
      </div>

      {/* Sources Panel (slides from right) */}
      <MemorySourcesPanel />
    </div>
  );
}
