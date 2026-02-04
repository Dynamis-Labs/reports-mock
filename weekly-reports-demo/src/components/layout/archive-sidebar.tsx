import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings, ChevronDown, Search } from "lucide-react";
import { cn } from "../../lib/utils";
import { springs, staggerContainer, staggerItem } from "../../lib/motion";
import { Button } from "../ui/button";
import { useSettingsStore } from "../../stores/settings-store";
import type { WeeklyReport } from "../../data/mock-reports";

interface ArchiveSidebarProps {
  reports: WeeklyReport[];
  selectedReportId: string | null;
  onSelectReport: (id: string) => void;
}

// Helper to get month name
function getMonthName(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long" });
}

// Helper to get year
function getYear(date: Date): number {
  return date.getFullYear();
}

// Helper to format short date (e.g., "Jan 26")
function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Group reports by month/year
interface MonthGroup {
  key: string;
  month: string;
  year: number;
  reports: WeeklyReport[];
}

function groupReportsByMonth(reports: WeeklyReport[]): MonthGroup[] {
  const groups = new Map<string, MonthGroup>();

  for (const report of reports) {
    const month = getMonthName(report.dateRange.start);
    const year = getYear(report.dateRange.start);
    const key = `${year}-${month}`;

    if (!groups.has(key)) {
      groups.set(key, { key, month, year, reports: [] });
    }
    groups.get(key)!.reports.push(report);
  }

  // Sort groups by date (most recent first)
  return Array.from(groups.values()).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return (
      MONTH_ORDER_REVERSED.indexOf(a.month) -
      MONTH_ORDER_REVERSED.indexOf(b.month)
    );
  });
}

// Get unique years from reports
function getUniqueYears(reports: WeeklyReport[]): number[] {
  const years = new Set(reports.map((r) => getYear(r.dateRange.start)));
  return Array.from(years).sort((a, b) => b - a);
}

// Shared month ordering
const MONTH_ORDER = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTH_ORDER_REVERSED = [...MONTH_ORDER].reverse();

// Get unique months from reports for a given year
function getUniqueMonths(reports: WeeklyReport[], year: number): string[] {
  const months = new Set(
    reports
      .filter((r) => getYear(r.dateRange.start) === year)
      .map((r) => getMonthName(r.dateRange.start)),
  );
  return Array.from(months).sort(
    (a, b) => MONTH_ORDER.indexOf(a) - MONTH_ORDER.indexOf(b),
  );
}

export function ArchiveSidebar({
  reports,
  selectedReportId,
  onSelectReport,
}: ArchiveSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const openSettings = useSettingsStore((state) => state.openSettings);
  const closeSettings = useSettingsStore((state) => state.closeSettings);

  const years = useMemo(() => getUniqueYears(reports), [reports]);
  const months = useMemo(
    () => (selectedYear ? getUniqueMonths(reports, selectedYear) : []),
    [reports, selectedYear],
  );

  // Filter reports based on search and selected filters
  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = report.title.toLowerCase().includes(query);
        const matchesContent = report.content.toLowerCase().includes(query);
        if (!matchesTitle && !matchesContent) return false;
      }

      // Year filter
      if (selectedYear && getYear(report.dateRange.start) !== selectedYear) {
        return false;
      }

      // Month filter
      if (
        selectedMonth &&
        getMonthName(report.dateRange.start) !== selectedMonth
      ) {
        return false;
      }

      return true;
    });
  }, [reports, searchQuery, selectedYear, selectedMonth]);

  const groupedReports = useMemo(
    () => groupReportsByMonth(filteredReports),
    [filteredReports],
  );

  const clearFilters = () => {
    setSelectedYear(null);
    setSelectedMonth(null);
    setIsFilterOpen(false);
  };

  const hasActiveFilters = selectedYear !== null || selectedMonth !== null;

  return (
    <div className="flex flex-col h-full p-3">
      {/* Header */}
      <header className="mb-3 pb-3 border-b border-border-subtle">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-xs uppercase tracking-wider text-muted-foreground">
            Reports
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={openSettings}
          >
            <Settings className="size-3.5" />
          </Button>
        </div>

        {/* Search with filter dropdown */}
        <div className="space-y-2">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className={cn(
                "w-full h-8 pl-8 pr-3 text-xs rounded-md",
                "bg-muted/50 border-0",
                "placeholder:text-muted-foreground/60",
                "focus:outline-none focus:ring-1 focus:ring-accent",
              )}
            />
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={cn(
              "flex items-center gap-1.5 text-xs",
              hasActiveFilters
                ? "text-accent font-medium"
                : "text-muted-foreground/70",
              "hover:text-foreground transition-colors",
            )}
          >
            <ChevronDown
              className={cn(
                "size-3 transition-transform",
                isFilterOpen && "rotate-180",
              )}
            />
            {hasActiveFilters
              ? `${selectedMonth?.slice(0, 3) ?? ""} ${selectedYear ?? ""}`.trim()
              : "Filter"}
          </button>

          {/* Filter dropdown */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden"
              >
                <div className="pt-1 pb-2 space-y-2">
                  {/* Year select */}
                  <div className="flex gap-1.5 flex-wrap">
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => {
                          setSelectedYear(selectedYear === year ? null : year);
                          if (selectedYear !== year) setSelectedMonth(null);
                        }}
                        className={cn(
                          "px-2.5 py-1 text-[11px] rounded-md transition-colors",
                          selectedYear === year
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted/70 text-foreground/70 hover:bg-muted hover:text-foreground",
                        )}
                      >
                        {year}
                      </button>
                    ))}
                  </div>

                  {/* Month select (only if year selected) */}
                  {selectedYear && months.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {months.map((month) => (
                        <button
                          key={month}
                          onClick={() =>
                            setSelectedMonth(
                              selectedMonth === month ? null : month,
                            )
                          }
                          className={cn(
                            "px-2.5 py-1 text-[11px] rounded-md transition-colors",
                            selectedMonth === month
                              ? "bg-accent text-accent-foreground"
                              : "bg-muted/50 text-foreground/70 hover:bg-muted hover:text-foreground",
                          )}
                        >
                          {month.slice(0, 3)}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Clear filters */}
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Report List - grouped by month */}
      <div className="flex-1 overflow-y-auto -mx-1.5 space-y-4">
        {groupedReports.map((group) => (
          <motion.div
            key={group.key}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Month header */}
            <div className="flex items-center gap-2 px-2 mb-2">
              <span className="font-semibold text-[11px] uppercase tracking-wide text-muted-foreground/60">
                {group.month}
              </span>
              <div className="h-px flex-1 bg-border-subtle/50" />
            </div>

            {/* Reports in this month */}
            <div className="space-y-1">
              {group.reports.map((report) => {
                const isSelected = selectedReportId === report.id;
                return (
                  <motion.button
                    key={report.id}
                    variants={staggerItem}
                    onClick={() => {
                      onSelectReport(report.id);
                      closeSettings();
                    }}
                    className={cn(
                      "group w-full text-left px-3 py-2.5 rounded-md",
                      "transition-colors duration-150 cursor-pointer",
                      isSelected ? "bg-accent-muted" : "hover:bg-muted/70",
                    )}
                    whileHover={{ x: 1 }}
                    transition={springs.quick}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[11px] text-muted-foreground/50">
                        {formatShortDate(report.dateRange.start)}
                      </span>
                    </div>
                    <h3
                      className={cn(
                        "font-medium text-[13px] leading-tight transition-colors",
                        isSelected
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                    >
                      {report.title}
                    </h3>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Empty state */}
        {groupedReports.length === 0 && (
          <div className="px-3 py-8 text-center">
            <p className="text-xs text-muted-foreground">No reports found</p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-1.5 text-[11px] text-accent hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer - minimal */}
      <div className="pt-3 border-t border-border-subtle">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-success animate-pulse-glow" />
          <span className="text-[11px] text-muted-foreground/50">
            Auto-generated
          </span>
        </div>
      </div>
    </div>
  );
}
