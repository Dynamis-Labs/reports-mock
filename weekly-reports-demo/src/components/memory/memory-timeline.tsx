import { useRef, useCallback, useMemo, useEffect, useState, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Circle,
  GitBranch,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { MemoryTimelineCard } from "./memory-timeline-card";
import { ConnectionLines } from "./connection-lines";
import {
  useMemoryStore,
  useIsFocusMode,
  useConnectionVisualizationMode,
} from "../../stores/memory-store";
import type { MemoryEvent } from "../../types/memory";

/**
 * Memory Timeline - Extended Horizontal Swimlane
 *
 * Redesigned 16-week horizontal timeline (8 weeks past + 8 weeks future):
 * - Scalable columns with zoom control
 * - Focus mode with dark overlay and connection highlighting
 * - Toggle between "dim-only" and "dim-with-lines" visualization modes
 * - Keyboard support (Escape to exit focus mode)
 * - Solid vertical lines between weeks
 */

// Zoom levels for the timeline
const ZOOM_LEVELS = [0.6, 0.75, 0.85, 1.0, 1.15];
const DEFAULT_ZOOM_INDEX = 3; // Start at 1.0 (100%)
const BASE_COLUMN_WIDTH = 300; // Base width at zoom 1.0

// Week data structure for timeline columns
interface WeekData {
  label: string;
  dateRange: string;
  weekOffset: number;
  isCurrentWeek: boolean;
  isFuture: boolean;
}

// Generate week labels for the range
function generateWeekRange(): WeekData[] {
  const weeks: WeekData[] = [];

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
  weekData: WeekData;
  events: MemoryEvent[];
  isLast: boolean;
  columnWidth: number;
  zoomLevel: number;
}

const WeekColumn = memo(function WeekColumn({
  weekData,
  events,
  isLast,
  columnWidth,
  zoomLevel,
}: WeekColumnProps) {
  return (
    <div
      className={cn(
        "shrink-0 flex flex-col h-full",
        // Add solid border between weeks
        !isLast && "border-r border-border/40",
      )}
      style={{ width: columnWidth }}
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
              "font-semibold uppercase tracking-wider",
              weekData.isCurrentWeek
                ? "text-accent"
                : weekData.isFuture
                  ? "text-muted-foreground/50"
                  : "text-muted-foreground/70",
            )}
            style={{ fontSize: `${10 * zoomLevel}px` }}
          >
            {weekData.label}
          </p>
        </div>
        <p
          className={cn(
            "mt-0.5",
            weekData.isCurrentWeek
              ? "text-accent/70"
              : "text-muted-foreground/40",
          )}
          style={{ fontSize: `${9 * zoomLevel}px` }}
        >
          {weekData.dateRange}
        </p>
      </div>

      {/* Events Column */}
      <div
        className={cn(
          "flex-1 flex flex-col items-center py-4 px-2 overflow-y-auto",
          weekData.isFuture && "opacity-70",
        )}
        style={{ gap: Math.round(12 * zoomLevel) }}
      >
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.04,
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <MemoryTimelineCard event={event} zoomLevel={zoomLevel} />
          </motion.div>
        ))}
        {events.length === 0 && (
          <p
            className="text-muted-foreground/30 italic py-8"
            style={{ fontSize: `${11 * zoomLevel}px` }}
          >
            No events
          </p>
        )}
      </div>
    </div>
  );
});

/**
 * Focus Mode Overlay
 *
 * Dark overlay that appears when in focus mode.
 * Uses pointer-events-none to allow scroll pass-through.
 * Cards handle their own click events for exit.
 */
function FocusModeOverlay() {
  const isFocusMode = useIsFocusMode();

  return (
    <AnimatePresence>
      {isFocusMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute inset-0 bg-black z-20 pointer-events-none"
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}

/**
 * Current Week Indicator
 *
 * A glowing white/cyan bar that marks the current week in focus mode.
 * Helps users orient themselves and indicates that anything to the right
 * (future weeks) is tentative and subject to change.
 */
interface CurrentWeekIndicatorProps {
  currentWeekIndex: number;
  columnWidth: number;
}

function CurrentWeekIndicator({
  currentWeekIndex,
  columnWidth,
}: CurrentWeekIndicatorProps) {
  const isFocusMode = useIsFocusMode();

  if (!isFocusMode) return null;

  // Position at the right edge of the current week column
  const leftPosition = (currentWeekIndex + 1) * columnWidth;

  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute top-0 bottom-0 z-25 pointer-events-none"
      style={{ left: leftPosition - 2 }}
    >
      {/* Main indicator line */}
      <div className="relative h-full w-1">
        {/* Glow effect */}
        <div className="absolute inset-0 w-1 bg-white/30 blur-sm" />
        {/* Solid core */}
        <div className="absolute inset-0 w-[2px] bg-white/70 left-[1px]" />
        {/* Accent highlight */}
        <div className="absolute inset-0 w-[1px] bg-accent/50 left-[2px]" />
      </div>

      {/* "Now" label */}
      <div className="absolute top-2 -translate-x-1/2 left-1/2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.2 }}
          className="px-1.5 py-0.5 bg-white/90 dark:bg-white/80 rounded text-[9px] font-bold uppercase tracking-wider text-black shadow-lg"
        >
          Now
        </motion.div>
      </div>

      {/* "Future" indicator on right side */}
      <div className="absolute top-2 left-4">
        <motion.div
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ delay: 0.25, duration: 0.2 }}
          className="text-[8px] font-medium uppercase tracking-wider text-white/50 whitespace-nowrap"
        >
          Tentative →
        </motion.div>
      </div>
    </motion.div>
  );
}

export function MemoryTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasScrolledToToday, setHasScrolledToToday] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(DEFAULT_ZOOM_INDEX);

  const selectedInitiativeId = useMemoryStore(
    (state) => state.selectedInitiativeId,
  );
  const getEventsForInitiative = useMemoryStore(
    (state) => state.getEventsForInitiative,
  );
  const exitFocusMode = useMemoryStore((state) => state.exitFocusMode);
  const toggleVisualizationMode = useMemoryStore(
    (state) => state.toggleVisualizationMode,
  );
  const isFocusMode = useIsFocusMode();
  const visualizationMode = useConnectionVisualizationMode();

  // Current zoom level
  const zoomLevel = ZOOM_LEVELS[zoomIndex];
  const columnWidth = BASE_COLUMN_WIDTH * zoomLevel;

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
        currentWeekIndex * columnWidth - containerWidth / 2 + columnWidth / 2;

      scrollRef.current.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: "auto", // Instant on initial load
      });
      setHasScrolledToToday(true);
    }
  }, [currentWeekIndex, hasScrolledToToday, columnWidth]);

  // Keyboard handler for Escape to exit focus mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFocusMode) {
        exitFocusMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocusMode, exitFocusMode]);

  const scrollLeft = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -columnWidth,
        behavior: "smooth",
      });
    }
  }, [columnWidth]);

  const scrollRight = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: columnWidth,
        behavior: "smooth",
      });
    }
  }, [columnWidth]);

  const scrollToToday = useCallback(() => {
    if (scrollRef.current && currentWeekIndex >= 0) {
      const containerWidth = scrollRef.current.clientWidth;
      const targetScroll =
        currentWeekIndex * columnWidth - containerWidth / 2 + columnWidth / 2;

      scrollRef.current.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: "smooth",
      });
    }
  }, [currentWeekIndex, columnWidth]);

  const zoomIn = useCallback(() => {
    setZoomIndex((prev) => Math.min(prev + 1, ZOOM_LEVELS.length - 1));
  }, []);

  const zoomOut = useCallback(() => {
    setZoomIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  if (!selectedInitiativeId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-surface/20">
        <div className="text-center">
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
      {/* Controls Bar - Above the swimlanes */}
      <div className="px-4 py-2 flex items-center justify-between border-b border-border/30 shrink-0 bg-background/80 backdrop-blur-sm z-40">
        {/* Left: Visualization toggle + Today button */}
        <div className="flex items-center gap-2">
          {/* Visualization Mode Toggle */}
          <button
            type="button"
            onClick={toggleVisualizationMode}
            className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-colors",
              visualizationMode === "dim-with-lines"
                ? "bg-accent/10 text-accent"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
            )}
            title="Toggle connection lines"
          >
            <GitBranch className="size-3.5" strokeWidth={1.5} />
            <span>
              {visualizationMode === "dim-with-lines"
                ? "Lines On"
                : "Lines Off"}
            </span>
          </button>

          <div className="w-px h-4 bg-border/50" />

          <Button
            variant="outline"
            size="sm"
            onClick={scrollToToday}
            className="h-6 px-2 text-[11px] gap-1"
          >
            <Circle className="size-1.5 fill-accent text-accent" />
            Today
          </Button>
        </div>

        {/* Right: Navigation + Zoom controls */}
        <div className="flex items-center gap-2">
          {/* Navigation */}
          <button
            type="button"
            onClick={scrollLeft}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            title="Scroll left (past)"
          >
            <ChevronLeft className="size-4" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={scrollRight}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            title="Scroll right (future)"
          >
            <ChevronRight className="size-4" strokeWidth={1.5} />
          </button>

          <div className="w-px h-4 bg-border/50" />

          {/* Zoom Controls */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={zoomOut}
              disabled={zoomIndex === 0}
              className={cn(
                "p-1 rounded-md transition-colors",
                zoomIndex === 0
                  ? "text-muted-foreground/30 cursor-not-allowed"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
              title="Zoom out"
            >
              <ZoomOut className="size-3.5" strokeWidth={1.5} />
            </button>

            <span className="text-[10px] text-muted-foreground w-8 text-center tabular-nums">
              {Math.round(zoomLevel * 100)}%
            </span>

            <button
              type="button"
              onClick={zoomIn}
              disabled={zoomIndex === ZOOM_LEVELS.length - 1}
              className={cn(
                "p-1 rounded-md transition-colors",
                zoomIndex === ZOOM_LEVELS.length - 1
                  ? "text-muted-foreground/30 cursor-not-allowed"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
              title="Zoom in"
            >
              <ZoomIn className="size-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Focus Mode Overlay */}
        <FocusModeOverlay />

        {/* Scrollable Timeline */}
        <div
          ref={scrollRef}
          className="h-full overflow-x-auto overflow-y-hidden"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "var(--color-border) transparent",
          }}
        >
          <div className="relative h-full">
            {/* Connection Lines (SVG overlay for dim-with-lines mode) */}
            <ConnectionLines containerRef={scrollRef} />

            {/* Current Week Indicator (focus mode only) */}
            <AnimatePresence>
              {isFocusMode && (
                <CurrentWeekIndicator
                  currentWeekIndex={currentWeekIndex}
                  columnWidth={columnWidth}
                />
              )}
            </AnimatePresence>

            {/* Week Columns */}
            <div className="flex h-full" style={{ minWidth: "max-content" }}>
              {weeks.map((weekData, index) => (
                <WeekColumn
                  key={weekData.weekOffset}
                  weekData={weekData}
                  events={eventsByWeekOffset.get(weekData.weekOffset) || []}
                  isLast={index === weeks.length - 1}
                  columnWidth={columnWidth}
                  zoomLevel={zoomLevel}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Gradient fade indicators for scroll direction */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-surface/90 to-transparent pointer-events-none z-15" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-surface/90 to-transparent pointer-events-none z-15" />
      </div>
    </div>
  );
}
