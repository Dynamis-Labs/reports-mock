import { useEffect, useRef } from "react";
import { Calendar } from "lucide-react";
import { PageBreadcrumbHeader } from "../layout/page-breadcrumb-header";
import { MeetingsHeaderActions } from "./meetings-header";
import { PastSection, UpNextSection, LaterSection } from "./sections";
import { MeetingDetailModal } from "./meeting-detail-modal";
import { useMeetingsStore } from "../../stores/meetings-store";
import { mockMeetings } from "../../data/mock-meetings";
import { categorizeMeetings } from "../../lib/date-utils";
import type { Meeting } from "../../types/meeting";

/**
 * Main Meetings page component
 *
 * Shows past meetings, up next, and later sections in a vertically
 * scrollable layout. Clicking a meeting opens a centered modal popup.
 *
 * Auto-scrolls to "Up Next" section on load so the user always starts
 * with the most relevant upcoming meeting centered.
 */
export function MeetingsPage() {
  const { selectedMeetingId, detailMode, selectMeeting, clearSelection } =
    useMeetingsStore();

  const upNextRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hasScrolled = useRef(false);

  const { pastToday, pastOlder, upNext, later } =
    categorizeMeetings(mockMeetings);

  const selectedMeeting = selectedMeetingId
    ? (mockMeetings.find((m) => m.id === selectedMeetingId) ?? null)
    : null;

  // Auto-scroll to "Up Next" on mount
  useEffect(() => {
    if (
      upNextRef.current &&
      scrollContainerRef.current &&
      !hasScrolled.current
    ) {
      // Calculate position to center the "Up Next" section
      const container = scrollContainerRef.current;
      const upNextElement = upNextRef.current;

      const containerHeight = container.clientHeight;
      const elementTop = upNextElement.offsetTop;
      const elementHeight = upNextElement.clientHeight;

      // Scroll so "Up Next" is roughly centered
      const targetScroll = elementTop - containerHeight / 2 + elementHeight / 2;

      container.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: "auto",
      });

      hasScrolled.current = true;
    }
  }, []);

  // Handler for selecting a past meeting (shows recap)
  const handleSelectPastMeeting = (meeting: Meeting) => {
    selectMeeting(meeting.id, "recap");
  };

  // Handler for selecting an upcoming meeting (shows brief)
  const handleSelectUpcomingMeeting = (meeting: Meeting) => {
    selectMeeting(meeting.id, "brief");
  };

  // Combine past meetings (older first, then today's past)
  const allPastMeetings = [...pastOlder, ...pastToday];

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb Header */}
      <PageBreadcrumbHeader
        items={[{ label: "Meetings", icon: Calendar }]}
        actions={<MeetingsHeaderActions />}
      />

      {/* Main Content - Scrollable */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "var(--color-border) transparent",
        }}
      >
        <div className="max-w-2xl mx-auto px-6 py-8">
          {/* Past meetings (all, including older) */}
          <PastSection
            meetings={allPastMeetings}
            onSelectMeeting={handleSelectPastMeeting}
          />

          {/* Up Next - Featured card (this is the anchor point) */}
          <div ref={upNextRef}>
            <UpNextSection
              meeting={upNext}
              onViewBrief={handleSelectUpcomingMeeting}
            />
          </div>

          {/* Later meetings */}
          <LaterSection
            meetings={later}
            onSelectMeeting={handleSelectUpcomingMeeting}
          />

          {/* Bottom spacer for scroll comfort */}
          <div className="h-32" />
        </div>
      </div>

      {/* Meeting Detail Modal */}
      <MeetingDetailModal
        meeting={selectedMeeting}
        mode={detailMode}
        isOpen={selectedMeetingId !== null && detailMode !== null}
        onClose={clearSelection}
      />
    </div>
  );
}
