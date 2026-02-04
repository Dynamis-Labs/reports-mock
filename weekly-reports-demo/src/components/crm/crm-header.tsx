import { useState, useRef, useEffect } from "react";
import {
  Search,
  X,
  SlidersHorizontal,
  Users,
  ChevronDown,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { useCrmStore, useHasActiveFilters } from "../../stores/crm-store";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { PageBreadcrumbHeader } from "../layout/page-breadcrumb-header";

/**
 * CRM Header
 *
 * Clean, minimal header with breadcrumb, search and tag filter dropdown.
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
    getAllUniqueTags,
  } = useCrmStore();

  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hasActiveFilters = useHasActiveFilters();
  const hasVisibleFilters =
    selectedTags.length > 0 || selectedRelationships.length > 0;

  // Get all unique tags (excluding section tags)
  const allTags = getAllUniqueTags().filter(
    (tag) =>
      !tag.startsWith("@") && !tag.startsWith("#") && !tag.startsWith("["),
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsTagDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="shrink-0 bg-background">
      {/* Breadcrumb */}
      <PageBreadcrumbHeader items={[{ label: "CRM", icon: Users }]} />

      {/* Main header row */}
      <div className="px-6 py-4 flex items-center justify-between gap-6 border-b border-border/60">
        <div className="flex items-center gap-3">
          {/* Search input - refined styling */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50 pointer-events-none"
              strokeWidth={1.5}
            />
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
                <X className="size-3.5" strokeWidth={1.5} />
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
            <SlidersHorizontal className="size-4" strokeWidth={1.5} />
            {hasActiveFilters && (
              <span className="absolute top-2 right-2 size-1.5 bg-accent rounded-full" />
            )}
          </Button>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* Tag filter dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl",
                "bg-muted/30 border border-border/50",
                "text-sm transition-all duration-200",
                "hover:bg-muted/50 hover:border-border",
                isTagDropdownOpen && "bg-muted/50 border-border",
                selectedTags.length > 0 && "border-accent/50 bg-accent/5",
              )}
            >
              <span className="text-muted-foreground">Filter by tag</span>
              {selectedTags.length > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-medium bg-accent/20 text-accent rounded-md">
                  {selectedTags.length}
                </span>
              )}
              <ChevronDown
                className={cn(
                  "size-4 text-muted-foreground/60 transition-transform duration-200",
                  isTagDropdownOpen && "rotate-180",
                )}
                strokeWidth={1.5}
              />
            </button>

            <AnimatePresence>
              {isTagDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    "absolute right-0 top-full mt-2 z-50",
                    "w-64 max-h-80 overflow-y-auto",
                    "bg-background border border-border/60 rounded-xl shadow-lg",
                    "py-2",
                  )}
                >
                  {allTags.length === 0 ? (
                    <div className="px-3 py-4 text-center text-sm text-muted-foreground">
                      No tags available
                    </div>
                  ) : (
                    allTags.map((tag) => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2",
                            "text-sm text-left transition-colors duration-150",
                            "hover:bg-muted/50 hover:text-white",
                            isSelected && "bg-accent/5",
                          )}
                        >
                          <span
                            className={cn(
                              "truncate",
                              isSelected
                                ? "text-foreground font-medium"
                                : "text-muted-foreground",
                            )}
                          >
                            {tag}
                          </span>
                          {isSelected && (
                            <Check
                              className="size-4 text-accent shrink-0"
                              strokeWidth={2}
                            />
                          )}
                        </button>
                      );
                    })
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Active filters row - subtle styling */}
      {hasVisibleFilters && (
        <div className="px-8 py-3 flex items-center gap-2 flex-wrap border-b border-border/30 bg-muted/10">
          <span className="text-xs text-muted-foreground/60 mr-1">
            Filtering by:
          </span>
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="cursor-pointer group text-xs px-2.5 py-1 rounded-lg border-border/60 hover:border-border transition-colors"
              onClick={() => toggleTag(tag)}
            >
              {tag}
              <X
                className="size-3 ml-1.5 opacity-40 group-hover:opacity-100 transition-opacity"
                strokeWidth={1.5}
              />
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
              <X
                className="size-3 ml-1.5 opacity-40 group-hover:opacity-100 transition-opacity"
                strokeWidth={1.5}
              />
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
