import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Settings, FileText, AlertTriangle } from "lucide-react";
import { cn } from "../../lib/utils";
import { springs, staggerContainer, staggerItem } from "../../lib/motion";
import { Button } from "../ui/button";
import { useSettingsStore } from "../../stores/settings-store";
import {
  CATEGORY_CONFIG,
  CATEGORY_ORDER,
  type CategoryConfig,
} from "../../lib/report-categories";
import { RadarItemCard } from "../radar/radar-item-card";
import { mockRadarItems } from "../../data/mock-radar";
import type { WeeklyReport, ReportCategory } from "../../data/mock-reports";
import type { RadarItem, RadarSeverity } from "../../types/radar";
import type { ViewMode } from "./reports-radar-toggle";

// ─── Reports helpers ────────────────────────────────────────────────────────

interface CategoryGroup {
  key: ReportCategory;
  config: CategoryConfig;
  reports: WeeklyReport[];
}

function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Updated today";
  if (diffDays === 1) return "Updated 1d ago";
  if (diffDays < 7) return `Updated ${diffDays}d ago`;
  if (diffDays < 14) return "Updated 1w ago";
  return `Updated ${Math.floor(diffDays / 7)}w ago`;
}

function getLatestByCategory(reports: WeeklyReport[]): CategoryGroup[] {
  const byCategoryAndTitle = new Map<
    ReportCategory,
    Map<string, WeeklyReport[]>
  >();

  for (const report of reports) {
    if (!byCategoryAndTitle.has(report.category)) {
      byCategoryAndTitle.set(report.category, new Map());
    }
    const titleMap = byCategoryAndTitle.get(report.category)!;
    if (!titleMap.has(report.title)) {
      titleMap.set(report.title, []);
    }
    titleMap.get(report.title)!.push(report);
  }

  return CATEGORY_ORDER.filter((cat) => byCategoryAndTitle.has(cat)).map(
    (category) => {
      const titleMap = byCategoryAndTitle.get(category)!;
      const latestReports: WeeklyReport[] = [];

      for (const titleReports of titleMap.values()) {
        const latest = titleReports.reduce((best, current) =>
          current.generatedAt > best.generatedAt ? current : best,
        );
        latestReports.push(latest);
      }

      latestReports.sort(
        (a, b) => b.generatedAt.getTime() - a.generatedAt.getTime(),
      );

      return {
        key: category,
        config: CATEGORY_CONFIG[category],
        reports: latestReports,
      };
    },
  );
}

// ─── Radar helpers ──────────────────────────────────────────────────────────

function groupBySeverity(
  items: RadarItem[],
): Record<RadarSeverity, RadarItem[]> {
  return items.reduce(
    (acc, item) => ({
      ...acc,
      [item.severity]: [...acc[item.severity], item],
    }),
    {
      critical: [] as RadarItem[],
      high: [] as RadarItem[],
      medium: [] as RadarItem[],
      low: [] as RadarItem[],
    },
  );
}

const severityOrder: RadarSeverity[] = ["critical", "high", "medium", "low"];

// ─── Section Nav Item ───────────────────────────────────────────────────────

interface SectionNavItemProps {
  icon: typeof FileText;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function SectionNavItem({
  icon: Icon,
  label,
  isActive,
  onClick,
}: SectionNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-2 px-2 py-1.5 rounded-md",
        "text-xs font-medium transition-colors",
        isActive
          ? "text-foreground bg-accent-muted"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
      )}
    >
      <Icon className="size-3.5 shrink-0" strokeWidth={1.5} />
      <span>{label}</span>
    </button>
  );
}

// ─── Reports List ───────────────────────────────────────────────────────────

interface ReportsListProps {
  reports: WeeklyReport[];
  selectedReportId: string | null;
  onSelectReport: (id: string) => void;
  searchQuery: string;
}

function ReportsList({
  reports,
  selectedReportId,
  onSelectReport,
  searchQuery,
}: ReportsListProps) {
  const closeSettings = useSettingsStore((state) => state.closeSettings);

  const filteredReports = useMemo(() => {
    if (!searchQuery.trim()) return reports;
    const query = searchQuery.toLowerCase();
    return reports.filter((report) =>
      report.title.toLowerCase().includes(query),
    );
  }, [reports, searchQuery]);

  const categoryGroups = useMemo(
    () => getLatestByCategory(filteredReports),
    [filteredReports],
  );

  return (
    <div className="space-y-4">
      {categoryGroups.map((group) => {
        const Icon = group.config.icon;
        return (
          <motion.div
            key={group.key}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Category header */}
            <div className="flex items-center gap-2 px-2 mb-2">
              <Icon
                className={cn("size-3.5", group.config.color)}
                strokeWidth={1.5}
              />
              <span className="font-semibold text-[11px] uppercase tracking-wide text-muted-foreground/60">
                {group.config.label}
              </span>
              <div className="h-px flex-1 bg-border-subtle/50" />
            </div>

            {/* Reports in this category */}
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
                    <span className="text-[11px] text-muted-foreground/50 mt-1 block">
                      {formatRelativeDate(report.generatedAt)}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        );
      })}

      {categoryGroups.length === 0 && (
        <div className="px-3 py-8 text-center">
          <p className="text-xs text-muted-foreground">No reports found</p>
        </div>
      )}
    </div>
  );
}

// ─── Radar List ─────────────────────────────────────────────────────────────

interface RadarListProps {
  selectedItemId: string | null;
  onSelectItem: (id: string) => void;
  searchQuery: string;
}

function RadarList({
  selectedItemId,
  onSelectItem,
  searchQuery,
}: RadarListProps) {
  const filteredItems = useMemo(() => {
    if (!searchQuery) return mockRadarItems;
    const query = searchQuery.toLowerCase();
    return mockRadarItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const groupedItems = useMemo(
    () => groupBySeverity(filteredItems),
    [filteredItems],
  );

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {severityOrder.map((severity) => {
        const items = groupedItems[severity];
        if (items.length === 0) return null;

        return (
          <motion.div key={severity} variants={staggerItem}>
            {/* Severity header */}
            <div className="flex items-center gap-2 px-2 mb-1.5">
              <span className="font-semibold text-[10px] uppercase tracking-wide text-muted-foreground/60">
                {severity}
              </span>
              <div className="h-px flex-1 bg-border-subtle/50" />
              <span className="text-[10px] text-muted-foreground/50 tabular-nums">
                {items.length}
              </span>
            </div>
            <div className="space-y-0.5">
              {items.map((item) => (
                <RadarItemCard
                  key={item.id}
                  item={item}
                  isSelected={selectedItemId === item.id}
                  onClick={() => onSelectItem(item.id)}
                />
              ))}
            </div>
          </motion.div>
        );
      })}

      {filteredItems.length === 0 && (
        <div className="text-center py-8 text-[11px] text-muted-foreground/60">
          No alerts found
        </div>
      )}
    </motion.div>
  );
}

// ─── Unified Sidebar ────────────────────────────────────────────────────────

interface ReportsSidebarProps {
  reports: WeeklyReport[];
  selectedReportId: string | null;
  onSelectReport: (id: string) => void;
  selectedRadarId: string | null;
  onSelectRadarItem: (id: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function ReportsSidebar({
  reports,
  selectedReportId,
  onSelectReport,
  selectedRadarId,
  onSelectRadarItem,
  viewMode,
  onViewModeChange,
}: ReportsSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const openSettings = useSettingsStore((state) => state.openSettings);

  return (
    <div className="flex flex-col h-full p-3">
      {/* Header */}
      <header className="mb-3 pb-3 border-b border-border-subtle">
        <div className="flex items-center justify-between mb-2.5">
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

        {/* Section Navigation */}
        <div className="flex flex-col gap-0.5 mb-2.5">
          <SectionNavItem
            icon={FileText}
            label="Reports"
            isActive={viewMode === "reports"}
            onClick={() => onViewModeChange("reports")}
          />
          <SectionNavItem
            icon={AlertTriangle}
            label="Radar"
            isActive={viewMode === "radar"}
            onClick={() => onViewModeChange("radar")}
          />
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              viewMode === "reports" ? "Search reports..." : "Search alerts..."
            }
            className={cn(
              "w-full h-8 pl-8 pr-3 text-xs rounded-md",
              "bg-muted/50 border-0",
              "placeholder:text-muted-foreground/60",
              "focus:outline-none focus:ring-1 focus:ring-accent",
            )}
          />
        </div>
      </header>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto -mx-1.5">
        <AnimatePresence mode="wait">
          {viewMode === "reports" ? (
            <motion.div
              key="reports"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
            >
              <ReportsList
                reports={reports}
                selectedReportId={selectedReportId}
                onSelectReport={onSelectReport}
                searchQuery={searchQuery}
              />
            </motion.div>
          ) : (
            <motion.div
              key="radar"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.15 }}
            >
              <RadarList
                selectedItemId={selectedRadarId}
                onSelectItem={onSelectRadarItem}
                searchQuery={searchQuery}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-border-subtle">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "size-2 rounded-full",
              viewMode === "reports"
                ? "bg-success animate-pulse-glow"
                : "bg-warning animate-pulse",
            )}
          />
          <span className="text-[11px] text-muted-foreground/50">
            {viewMode === "reports" ? "Auto-generated" : "Monitoring active"}
          </span>
        </div>
      </div>
    </div>
  );
}
