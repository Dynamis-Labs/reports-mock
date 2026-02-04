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
 * Archive page header with title, search, and compact tabs
 * Styled to match the tight, refined aesthetic of sidebars
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
    <header className={cn("px-5 pt-4 pb-3", className)}>
      {/* Back button row */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors mb-3"
        >
          <ArrowLeft className="size-3.5" strokeWidth={1.5} />
          <span>Back</span>
        </button>
      )}

      {/* Title row with tabs */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-heading font-semibold text-foreground">Archives</h1>
        <ArchiveTabs
          activeTab={activeTab}
          onTabChange={onTabChange}
          radarsCount={radarsCount}
          reportsCount={reportsCount}
        />
      </div>

      {/* Search input - compact */}
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
            className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-muted hover:text-white transition-colors"
          >
            <X className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
          </motion.button>
        )}
      </div>
    </header>
  );
}
