import { Search, X, SlidersHorizontal } from "lucide-react";
import { cn } from "../../lib/utils";
import { useCrmStore, useHasActiveFilters } from "../../stores/crm-store";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

/**
 * CRM Header
 *
 * Clean, minimal header with search and filters.
 * Follows editorial design aesthetic - restrained and professional.
 */

export function CrmHeader() {
  const {
    searchQuery,
    setSearchQuery,
    selectedTags,
    selectedRelationships,
    toggleTag,
    toggleRelationship,
    clearFilters,
    toggleFiltersPanel,
  } = useCrmStore();

  const hasActiveFilters = useHasActiveFilters();
  const hasVisibleFilters = selectedTags.length > 0 || selectedRelationships.length > 0;

  return (
    <header className="shrink-0 border-b border-border/60 bg-background">
      {/* Main header row */}
      <div className="px-8 py-5 flex items-center justify-between gap-6">
        <h1 className="font-medium text-xl tracking-tight text-foreground">
          Contacts
        </h1>

        <div className="flex items-center gap-3">
          {/* Search input - refined styling */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts..."
              className={cn(
                "w-72 h-10 pl-10 pr-9 rounded-xl",
                "bg-muted/30 border border-border/50",
                "text-sm placeholder:text-muted-foreground/50",
                "focus:outline-none focus:border-border focus:bg-background",
                "transition-all duration-200",
              )}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground/50 hover:text-foreground transition-colors"
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
            className={cn(
              "relative size-10 rounded-xl",
              hasActiveFilters && "text-accent",
            )}
          >
            <SlidersHorizontal className="size-4" />
            {hasActiveFilters && (
              <span className="absolute top-2 right-2 size-1.5 bg-accent rounded-full" />
            )}
          </Button>
        </div>
      </div>

      {/* Active filters row - subtle styling */}
      {hasVisibleFilters && (
        <div className="px-8 pb-4 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground/60 mr-1">Filtering by:</span>
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="cursor-pointer group text-xs px-2.5 py-1 rounded-lg border-border/60 hover:border-border transition-colors"
              onClick={() => toggleTag(tag)}
            >
              {tag}
              <X className="size-3 ml-1.5 opacity-40 group-hover:opacity-100 transition-opacity" />
            </Badge>
          ))}
          {selectedRelationships.map((rel) => (
            <Badge
              key={rel}
              variant="outline"
              className="cursor-pointer group text-xs px-2.5 py-1 rounded-lg border-border/60 hover:border-border transition-colors"
              onClick={() => toggleRelationship(rel)}
            >
              {rel}
              <X className="size-3 ml-1.5 opacity-40 group-hover:opacity-100 transition-opacity" />
            </Badge>
          ))}
          <button
            onClick={clearFilters}
            className="text-xs text-muted-foreground/50 hover:text-foreground transition-colors ml-2"
          >
            Clear all
          </button>
        </div>
      )}
    </header>
  );
}
