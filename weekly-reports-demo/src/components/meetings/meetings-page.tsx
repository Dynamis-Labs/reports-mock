import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { PageBreadcrumbHeader } from "@components/layout/page-breadcrumb-header";
import { MeetingsHeaderActions } from "./meetings-header";
import { PastSection, UpNextSection, LaterSection } from "./sections";
import { MeetingDetailModal } from "./meeting-detail-modal";
import { ContactDrawer } from "@components/crm/layouts/card-grid/contact-drawer";
import { useMeetingsStore } from "@stores/meetings-store";
import { mockMeetings } from "@data/mock-meetings";
import { mockContacts } from "@data/contacts";
import { categorizeMeetings } from "@lib/date-utils";
import { cn } from "@lib/utils";
import {
  findContactForAttendee,
  createContactFromAttendee,
} from "@lib/contact-meeting-utils";
import type { Meeting, MeetingAttendee } from "@types/meeting";
import type { Contact } from "@types/contact";

/**
 * Filters meetings by a search query.
 * Matches against title, description, and attendee names (case-insensitive).
 */
function filterMeetings(meetings: Meeting[], query: string): Meeting[] {
  if (!query.trim()) return meetings;

  const lower = query.toLowerCase().trim();

  return meetings.filter((meeting) => {
    if (meeting.title.toLowerCase().includes(lower)) return true;
    if (meeting.description?.toLowerCase().includes(lower)) return true;
    if (meeting.attendees.some((a) => a.name.toLowerCase().includes(lower))) {
      return true;
    }
    return false;
  });
}

/**
 * Main Meetings page component
 *
 * Default view shows: title, short description, and clickable attendee names.
 * Clicking a name opens the ContactDrawer on the right to show who the person is.
 * Clicking the card itself opens the meeting detail modal.
 *
 * A search box at the top filters meetings by title, description, or attendee name.
 * Auto-scrolls to "Up Next" section on load.
 */
export function MeetingsPage() {
  const {
    selectedMeetingId,
    detailMode,
    searchQuery,
    selectMeeting,
    clearSelection,
    setSearchQuery,
  } = useMeetingsStore();

  const upNextRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hasScrolled = useRef(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Contact drawer state for attendee clicks
  const [selectedAttendee, setSelectedAttendee] = useState<Contact | null>(
    null,
  );
  const [isAttendeeDrawerOpen, setIsAttendeeDrawerOpen] = useState(false);

  // Filter meetings by search query, then categorize
  const filteredMeetings = useMemo(
    () => filterMeetings(mockMeetings, searchQuery),
    [searchQuery],
  );

  const { pastToday, pastOlder, upNext, later } = useMemo(
    () => categorizeMeetings(filteredMeetings),
    [filteredMeetings],
  );

  const selectedMeeting = selectedMeetingId
    ? (mockMeetings.find((m) => m.id === selectedMeetingId) ?? null)
    : null;

  // Auto-scroll to "Up Next" on mount (only when not searching)
  useEffect(() => {
    if (
      upNextRef.current &&
      scrollContainerRef.current &&
      !hasScrolled.current &&
      !searchQuery
    ) {
      const container = scrollContainerRef.current;
      const upNextElement = upNextRef.current;

      const containerHeight = container.clientHeight;
      const elementTop = upNextElement.offsetTop;
      const elementHeight = upNextElement.clientHeight;

      const targetScroll = elementTop - containerHeight / 2 + elementHeight / 2;

      container.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: "auto",
      });

      hasScrolled.current = true;
    }
  }, [searchQuery]);

  const handleSelectPastMeeting = useCallback(
    (meeting: Meeting) => {
      selectMeeting(meeting.id, "recap");
    },
    [selectMeeting],
  );

  const handleSelectUpcomingMeeting = useCallback(
    (meeting: Meeting) => {
      selectMeeting(meeting.id, "brief");
    },
    [selectMeeting],
  );

  const handleAttendeeClick = useCallback((attendee: MeetingAttendee) => {
    const contact = findContactForAttendee(attendee, mockContacts);
    if (contact) {
      setSelectedAttendee(contact);
    } else {
      setSelectedAttendee(createContactFromAttendee(attendee));
    }
    setIsAttendeeDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsAttendeeDrawerOpen(false);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  }, [setSearchQuery]);

  const allPastMeetings = useMemo(
    () => [...pastOlder, ...pastToday],
    [pastOlder, pastToday],
  );

  const isSearching = searchQuery.trim().length > 0;
  const noResults =
    isSearching &&
    allPastMeetings.length === 0 &&
    !upNext &&
    later.length === 0;

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb Header */}
      <PageBreadcrumbHeader
        items={[{ label: "Meetings" }]}
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
          {/* Search box */}
          <div className="relative mb-6">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none">
              <HugeiconsIcon icon={Search01Icon} size={16} strokeWidth={1.5} />
            </span>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search meetings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full h-9 pl-9 pr-9 rounded-[var(--radius-lg)]",
                "bg-muted/40 border border-transparent",
                "text-ui text-foreground placeholder:text-muted-foreground/40",
                "focus:outline-none focus:bg-background focus:border-border",
                "transition-all duration-200",
              )}
            />
            {isSearching && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 size-5 rounded flex items-center justify-center text-muted-foreground/50 hover:text-foreground transition-colors"
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  size={14}
                  strokeWidth={1.5}
                />
              </button>
            )}
          </div>

          {/* No results state */}
          {noResults && (
            <div className="py-16 text-center">
              <span className="text-muted-foreground/30 mx-auto mb-3 flex justify-center">
                <HugeiconsIcon icon={Search01Icon} size={32} strokeWidth={1} />
              </span>
              <p className="text-ui text-muted-foreground">
                No meetings match &ldquo;{searchQuery}&rdquo;
              </p>
            </div>
          )}

          {/* Past meetings */}
          {!noResults && (
            <>
              <PastSection
                meetings={allPastMeetings}
                onSelectMeeting={handleSelectPastMeeting}
                onAttendeeClick={handleAttendeeClick}
              />

              {/* Up Next */}
              <div ref={upNextRef}>
                <UpNextSection
                  meeting={upNext}
                  onViewBrief={handleSelectUpcomingMeeting}
                  onAttendeeClick={handleAttendeeClick}
                />
              </div>

              {/* Later meetings */}
              <LaterSection
                meetings={later}
                onSelectMeeting={handleSelectUpcomingMeeting}
                onAttendeeClick={handleAttendeeClick}
              />
            </>
          )}

          {/* Bottom spacer */}
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

      {/* Contact Drawer — opens when clicking an attendee name */}
      <ContactDrawer
        contact={selectedAttendee}
        isOpen={isAttendeeDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}
