import { useState, useRef, useEffect, useCallback } from "react";
import {
  Search,
  X,
  ChevronDown,
  Check,
  Building2,
  Briefcase,
  UserCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { useCrmStore, useHasActiveFilters } from "../../stores/crm-store";
import { Badge } from "../ui/badge";
import { PageBreadcrumbHeader } from "../layout/page-breadcrumb-header";
import type { ContactCategory } from "../../types/contact";

/**
 * CRM Header
 *
 * Clean header with breadcrumb, search bar, and category filter dropdown.
 * The category dropdown uses checkboxes so users can filter by multiple
 * categories (Investors, Clients, Other) simultaneously.
 */

const categoryOptions: {
  value: ContactCategory;
  label: string;
  Icon: typeof Building2;
}[] = [
  { value: "investor", label: "Investors", Icon: Building2 },
  { value: "client", label: "Clients", Icon: Briefcase },
  { value: "other", label: "Other", Icon: UserCircle },
];

export function CrmHeader() {
  const {
    searchQuery,
    setSearchQuery,
    selectedTags,
    selectedCategories,
    selectedRelationships,
    toggleTag,
    toggleCategory,
    toggleRelationship,
    clearFilters,
  } = useCrmStore();

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hasActiveFilters = useHasActiveFilters();
  const hasVisibleBadges =
    selectedTags.length > 0 ||
    selectedRelationships.length > 0 ||
    selectedCategories.length > 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on Escape
  const handleDropdownKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsCategoryDropdownOpen(false);
    }
  }, []);

  const getCategoryDropdownLabel = () => {
    if (selectedCategories.length === 0) return "All contacts";
    if (selectedCategories.length === categoryOptions.length)
      return "All contacts";
    return selectedCategories
      .map((c) => categoryOptions.find((o) => o.value === c)?.label ?? c)
      .join(", ");
  };

  return (
    <header className="shrink-0 bg-background">
      {/* Page Title Header */}
      <PageBreadcrumbHeader items={[{ label: "CRM" }]} />

      {/* Main header row */}
      <div className="px-6 py-4 flex items-center gap-3 border-b border-border/60">
        {/* Search input */}
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
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground/50 hover:text-foreground transition-colors"
            >
              <X className="size-3.5" strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* Category filter dropdown */}
        <div
          className="relative"
          ref={dropdownRef}
          onKeyDown={handleDropdownKeyDown}
        >
          <button
            type="button"
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            aria-expanded={isCategoryDropdownOpen}
            aria-haspopup="listbox"
            className={cn(
              "flex items-center gap-2 h-10 px-3.5 rounded-xl",
              "bg-muted/30 border border-border/50",
              "text-sm transition-all duration-200",
              "hover:bg-muted/50 hover:border-border",
              isCategoryDropdownOpen && "bg-muted/50 border-border",
              selectedCategories.length > 0 && "border-accent/40 bg-accent/5",
            )}
          >
            <span
              className={cn(
                "truncate max-w-[160px]",
                selectedCategories.length > 0
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {getCategoryDropdownLabel()}
            </span>
            {selectedCategories.length > 0 && (
              <span className="shrink-0 px-1.5 py-0.5 text-[10px] font-medium bg-accent/20 text-accent rounded-md">
                {selectedCategories.length}
              </span>
            )}
            <ChevronDown
              className={cn(
                "size-4 shrink-0 text-muted-foreground/60 transition-transform duration-200",
                isCategoryDropdownOpen && "rotate-180",
              )}
              strokeWidth={1.5}
            />
          </button>

          <AnimatePresence>
            {isCategoryDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                role="listbox"
                aria-multiselectable="true"
                className={cn(
                  "absolute left-0 top-full mt-2 z-50",
                  "w-56 bg-background border border-border/60 rounded-xl shadow-lg",
                  "py-1.5",
                )}
              >
                {categoryOptions.map(({ value, label, Icon }) => {
                  const isSelected = selectedCategories.includes(value);
                  return (
                    <button
                      key={value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => toggleCategory(value)}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-3 py-2.5",
                        "text-sm text-left transition-colors duration-150",
                        "hover:bg-muted/50",
                        isSelected && "bg-accent/5",
                      )}
                    >
                      {/* Checkbox */}
                      <div
                        className={cn(
                          "size-4 rounded border flex items-center justify-center shrink-0 transition-colors duration-150",
                          isSelected
                            ? "bg-accent border-accent"
                            : "border-border bg-transparent",
                        )}
                      >
                        {isSelected && (
                          <Check
                            className="size-3 text-white"
                            strokeWidth={2.5}
                          />
                        )}
                      </div>

                      {/* Icon + label */}
                      <Icon
                        className={cn(
                          "size-4 shrink-0",
                          isSelected
                            ? "text-foreground"
                            : "text-muted-foreground/60",
                        )}
                        strokeWidth={1.5}
                      />
                      <span
                        className={cn(
                          isSelected
                            ? "text-foreground font-medium"
                            : "text-muted-foreground",
                        )}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Active filters row */}
      {hasVisibleBadges && (
        <div className="px-8 py-3 flex items-center gap-2 flex-wrap border-b border-border/30 bg-muted/10">
          <span className="text-xs text-muted-foreground/60 mr-1">
            Filtering by:
          </span>
          {selectedCategories.map((cat) => {
            const option = categoryOptions.find((o) => o.value === cat);
            return (
              <Badge
                key={`cat-${cat}`}
                variant="outline"
                className="cursor-pointer group text-xs px-2.5 py-1 rounded-lg border-border/60 hover:border-border transition-colors"
                onClick={() => toggleCategory(cat)}
              >
                {option?.label ?? cat}
                <X
                  className="size-3 ml-1.5 opacity-40 group-hover:opacity-100 transition-opacity"
                  strokeWidth={1.5}
                />
              </Badge>
            );
          })}
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
            type="button"
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
