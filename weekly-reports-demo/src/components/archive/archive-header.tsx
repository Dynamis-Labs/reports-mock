import { ArrowLeft, Search, X } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import { ArchiveTabs } from "./archive-tabs";
import type { ArchiveTab } from "../../stores/archive-store";

interface ArchiveHeaderProps {
  activeTab: ArchiveTab;
  onTabChange: (tab: ArchiveTab) => void;
  radarsCount: number;
  reportsCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onBack?: () => void;
  className?: string;
}

/**
 * Archive page header
 *
 * Uses same h-14 height and positioning as PageBreadcrumbHeader
 * for visual consistency across all pages.
 */
export function ArchiveHeader({
  activeTab,
  onTabChange,
  radarsCount,
  reportsCount,
  searchQuery,
  onSearchChange,
  onBack,
  className,
}: ArchiveHeaderProps) {
  const searchPlaceholder =
    activeTab === "radars" ? "Search radars..." : "Search reports...";

  return (
    <header className={cn("shrink-0 bg-background", className)}>
      {/* Title row - matches h-14 of PageBreadcrumbHeader */}
      <div className="h-14 px-6 flex items-center justify-between border-b border-border-subtle">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mr-2"
            >
              <ArrowLeft className="size-4" strokeWidth={1.5} />
            </button>
          )}
          <h1 className="text-lg font-semibold text-foreground">Archives</h1>
        </div>
        <ArchiveTabs
          activeTab={activeTab}
          onTabChange={onTabChange}
          radarsCount={radarsCount}
          reportsCount={reportsCount}
        />
      </div>

      {/* Search input row */}
      <div className="px-6 py-3 border-b border-border-subtle">
        <div className="relative">
          <Search
            className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/50"
            strokeWidth={1.5}
          />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={cn(
              "w-full h-8 pl-8 pr-8 rounded-md",
              "bg-muted/40 border-0",
              "text-[13px] text-foreground placeholder:text-muted-foreground/50",
              "focus:outline-none focus:ring-1 focus:ring-accent focus:bg-background",
              "transition-all duration-150",
            )}
          />
          {searchQuery && (
            <motion.button
              type="button"
              aria-label="Clear search"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => onSearchChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-muted transition-colors"
            >
              <X className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
}
