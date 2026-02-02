import { Search, X, SlidersHorizontal } from "lucide-react";
import { cn } from "../../lib/utils";
import { ViewModeSwitcher } from "./view-mode-switcher";
import { useCrmStore, useHasActiveFilters } from "../../stores/crm-store";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

/**
 * CRM Header
 *
 * Contains search, filters, and view mode switcher.
 * Matches the design language from the existing app header patterns.
 */

interface CrmHeaderProps {
  contactCount: number;
}

export function CrmHeader({ contactCount }: CrmHeaderProps) {
  const {
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    selectedTags,
    toggleTag,
    clearFilters,
    toggleFiltersPanel,
  } = useCrmStore();

  const hasActiveFilters = useHasActiveFilters();

  return (
    <header className="shrink-0 border-b border-border bg-background">
      {/* Main header row */}
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-heading text-foreground">
            Contacts
          </h1>
          <Badge variant="default" className="tabular-nums">
            {contactCount}
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts..."
              className={cn(
                "w-64 h-9 pl-9 pr-8 rounded-lg",
                "bg-muted/50 border border-border",
                "text-ui placeholder:text-muted-foreground/60",
                "focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-muted",
                "transition-colors duration-150",
              )}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Filters toggle */}
          <Button
            variant={hasActiveFilters ? "secondary" : "ghost"}
            size="icon"
            onClick={toggleFiltersPanel}
            className={cn("relative", hasActiveFilters && "text-accent")}
          >
            <SlidersHorizontal className="size-4" />
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 size-2 bg-accent rounded-full" />
            )}
          </Button>

          {/* View mode switcher */}
          <div className="h-6 w-px bg-border" />
          <ViewModeSwitcher activeMode={viewMode} onChange={setViewMode} />
        </div>
      </div>

      {/* Active filters row */}
      {selectedTags.length > 0 && (
        <div className="px-6 pb-3 flex items-center gap-2 flex-wrap">
          <span className="text-caption text-muted-foreground">Filters:</span>
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="accent"
              className="cursor-pointer group"
              onClick={() => toggleTag(tag)}
            >
              {tag}
              <X className="size-3 ml-1 opacity-60 group-hover:opacity-100 transition-opacity" />
            </Badge>
          ))}
          <button
            onClick={clearFilters}
            className="text-caption text-muted-foreground hover:text-foreground transition-colors ml-2"
          >
            Clear all
          </button>
        </div>
      )}
    </header>
  );
}
