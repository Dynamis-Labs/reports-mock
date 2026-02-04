import { useRef, useCallback, useMemo, useEffect, useState } from "react";
import { motion } from "motion/react";
import { CalendarDays, ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { MemoryTimelineCard } from "./memory-timeline-card";
import { useMemoryStore } from "../../stores/memory-store";
import type { MemoryEvent } from "../../types/memory";

/**
 * Memory Timeline - Extended Horizontal Swimlane
 *
 * 16-week horizontal timeline (8 weeks past + 8 weeks future):
 * - Week columns scroll horizontally
 * - Auto-scrolls to "This Week" on load
 * - Clicking a card opens the detail panel below
 * - Navigation buttons for smooth scrolling
 * - Today indicator with pulsing dot
 */

const WEEK_COLUMN_WIDTH = 180; // px per week column

// Generate week labels for the range
function generateWeekRange(): {
  label: string;
  dateRange: string;
  weekOffset: number;
  isCurrentWeek: boolean;
  isFuture: boolean;
}[] {
  const weeks: {
    label: string;
    dateRange: string;
    weekOffset: number;
    isCurrentWeek: boolean;
    isFuture: boolean;
  }[] = [];

  const now = new Date();
  const currentWeekStart = new Date(now);
  currentWeekStart.setDate(now.getDate() - now.getDay()); // Start of current week (Sunday)
  currentWeekStart.setHours(0, 0, 0, 0);

  // Generate 8 weeks in the past + current week + 8 weeks in the future = 17 weeks
  for (let offset = -8; offset <= 8; offset++) {
    const weekStart = new Date(currentWeekStart);
    weekStart.setDate(currentWeekStart.getDate() + offset * 7);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const startStr = weekStart.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const endStr = weekEnd.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    let label: string;
    if (offset === 0) {
      label = "This Week";
    } else if (offset === -1) {
      label = "Last Week";
    } else if (offset === 1) {
      label = "Next Week";
    } else if (offset < 0) {
      label = `${Math.abs(offset)} Weeks Ago`;
    } else {
      label = `In ${offset} Weeks`;
    }

    weeks.push({
      label,
      dateRange: `${startStr} - ${endStr}`,
      weekOffset: offset,
      isCurrentWeek: offset === 0,
      isFuture: offset > 0,
    });
  }

  return weeks;
}

// Map events to week offset based on date
function getWeekOffset(eventDate: Date): number {
  const now = new Date();
  const currentWeekStart = new Date(now);
  currentWeekStart.setDate(now.getDate() - now.getDay());
  currentWeekStart.setHours(0, 0, 0, 0);

  const eventWeekStart = new Date(eventDate);
  eventWeekStart.setDate(eventDate.getDate() - eventDate.getDay());
  eventWeekStart.setHours(0, 0, 0, 0);

  const diffMs = eventWeekStart.getTime() - currentWeekStart.getTime();
  return Math.round(diffMs / (7 * 24 * 60 * 60 * 1000));
}

interface WeekColumnProps {
  weekData: {
    label: string;
    dateRange: string;
    weekOffset: number;
    isCurrentWeek: boolean;
    isFuture: boolean;
  };
  events: MemoryEvent[];
  isLast: boolean;
}

function WeekColumn({ weekData, events, isLast }: WeekColumnProps) {
  return (
    <div
      className={cn(
        "shrink-0 flex flex-col h-full",
        !isLast && "border-r border-dashed border-border/30",
      )}
      style={{ width: WEEK_COLUMN_WIDTH }}
    >
      {/* Week Header */}
      <div
        className={cn(
          "px-3 py-3 text-center border-b shrink-0",
          weekData.isCurrentWeek
            ? "bg-accent/5 border-accent/20"
            : weekData.isFuture
              ? "bg-muted/20 border-border/20"
              : "border-border/30",
        )}
      >
        <div className="flex items-center justify-center gap-1.5">
          {weekData.isCurrentWeek && (
            <Circle className="size-2 fill-accent text-accent animate-pulse" />
          )}
          <p
            className={cn(
              "text-micro font-semibold uppercase tracking-wider",
              weekData.isCurrentWeek
                ? "text-accent"
                : weekData.isFuture
                  ? "text-muted-foreground/50"
                  : "text-muted-foreground/70",
            )}
          >
            {weekData.label}
          </p>
        </div>
        <p
          className={cn(
            "text-[10px] mt-0.5",
            weekData.isCurrentWeek
              ? "text-accent/70"
              : "text-muted-foreground/40",
          )}
        >
          {weekData.dateRange}
        </p>
      </div>

      {/* Events Column */}
      <div
        className={cn(
          "flex-1 flex flex-col items-center py-4 gap-3 overflow-y-auto",
          weekData.isFuture && "opacity-60",
        )}
      >
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.03,
              duration: 0.25,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <MemoryTimelineCard event={event} compact />
          </motion.div>
        ))}
        {events.length === 0 && (
          <p className="text-[10px] text-muted-foreground/20 italic py-8">
            No events
          </p>
        )}
      </div>
    </div>
  );
}

export function MemoryTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasScrolledToToday, setHasScrolledToToday] = useState(false);

  const selectedInitiativeId = useMemoryStore(
    (state) => state.selectedInitiativeId,
  );
  const getEventsForInitiative = useMemoryStore(
    (state) => state.getEventsForInitiative,
  );

  // Get events for selected initiative
  const events = selectedInitiativeId
    ? getEventsForInitiative(selectedInitiativeId)
    : [];

  // Generate all weeks in range
  const weeks = useMemo(() => generateWeekRange(), []);

  // Group events by week offset
  const eventsByWeekOffset = useMemo(() => {
    const grouped = new Map<number, MemoryEvent[]>();

    // Initialize all weeks
    for (const week of weeks) {
      grouped.set(week.weekOffset, []);
    }

    // Group events
    for (const event of events) {
      const offset = getWeekOffset(event.date);
      if (offset >= -8 && offset <= 8) {
        const existing = grouped.get(offset) || [];
        grouped.set(offset, [...existing, event]);
      }
    }

    return grouped;
  }, [events, weeks]);

  // Find the index of "This Week" for initial scroll
  const currentWeekIndex = useMemo(
    () => weeks.findIndex((w) => w.isCurrentWeek),
    [weeks],
  );

  // Auto-scroll to "This Week" on mount
  useEffect(() => {
    if (scrollRef.current && !hasScrolledToToday && currentWeekIndex >= 0) {
      // Calculate scroll position to center "This Week"
      const containerWidth = scrollRef.current.clientWidth;
      const targetScroll =
        currentWeekIndex * WEEK_COLUMN_WIDTH -
        containerWidth / 2 +
        WEEK_COLUMN_WIDTH / 2;

      scrollRef.current.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: "auto", // Instant on initial load
      });
      setHasScrolledToToday(true);
    }
  }, [currentWeekIndex, hasScrolledToToday]);

  const scrollLeft = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -WEEK_COLUMN_WIDTH * 2,
        behavior: "smooth",
      });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: WEEK_COLUMN_WIDTH * 2,
        behavior: "smooth",
      });
    }
  }, []);

  const scrollToToday = useCallback(() => {
    if (scrollRef.current && currentWeekIndex >= 0) {
      const containerWidth = scrollRef.current.clientWidth;
      const targetScroll =
        currentWeekIndex * WEEK_COLUMN_WIDTH -
        containerWidth / 2 +
        WEEK_COLUMN_WIDTH / 2;

      scrollRef.current.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: "smooth",
      });
    }
  }, [currentWeekIndex]);

  if (!selectedInitiativeId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-surface/20">
        <div className="text-center">
          <CalendarDays
            className="size-12 mx-auto mb-4 text-muted-foreground/20"
            strokeWidth={1}
          />
          <p className="text-muted-foreground font-medium">
            Select an initiative
          </p>
          <p className="text-sm text-muted-foreground/50 mt-1">
            Choose from the sidebar to view timeline
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-surface/20 relative">
      {/* Header with navigation */}
      <div className="px-6 py-3 flex items-center justify-between border-b border-border/30 shrink-0 bg-background/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <h3 className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">
            Timeline
          </h3>
          <span className="text-[10px] text-muted-foreground/40">
            {weeks.length} weeks • Scroll to explore
          </span>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollLeft}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            title="Scroll left (past)"
          >
            <ChevronLeft className="size-4" strokeWidth={1.5} />
          </button>

          <Button
            variant="outline"
            size="sm"
            onClick={scrollToToday}
            className="h-7 px-2.5 text-xs gap-1.5"
          >
            <Circle className="size-2 fill-accent text-accent" />
            Today
          </Button>

          <button
            type="button"
            onClick={scrollRight}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            title="Scroll right (future)"
          >
            <ChevronRight className="size-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Timeline Content */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-x-auto overflow-y-hidden"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "var(--color-border) transparent",
        }}
      >
        {/* Horizontal dotted line connecting weeks */}
        <div className="relative h-full">
          <div className="absolute top-[52px] left-0 right-0 h-[1px] pointer-events-none z-10">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <line
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                stroke="var(--color-border)"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.3"
              />
            </svg>
          </div>

          {/* Week Columns */}
          <div className="flex h-full" style={{ minWidth: "max-content" }}>
            {weeks.map((weekData, index) => (
              <WeekColumn
                key={weekData.weekOffset}
                weekData={weekData}
                events={eventsByWeekOffset.get(weekData.weekOffset) || []}
                isLast={index === weeks.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Gradient fade indicators for scroll direction */}
      <div className="absolute left-0 top-[52px] bottom-0 w-8 bg-gradient-to-r from-surface/80 to-transparent pointer-events-none z-20" />
      <div className="absolute right-0 top-[52px] bottom-0 w-8 bg-gradient-to-l from-surface/80 to-transparent pointer-events-none z-20" />
    </div>
  );
}
