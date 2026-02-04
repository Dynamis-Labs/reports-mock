import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Tag } from "lucide-react";
import { cn } from "../../../lib/utils";

/**
 * Tag Editor
 *
 * Combobox-style tag editor with autocomplete suggestions.
 * Follows editorial/Polaroid aesthetic - understated, typewriter-like labels.
 */

interface TagEditorProps {
  tags: string[];
  allTags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  /** Compact mode - smaller tags, no icon in pills */
  compact?: boolean;
}

export function TagEditor({
  tags,
  allTags,
  onTagsChange,
  placeholder = "Add a tag...",
  maxTags = 10,
  compact = false,
}: TagEditorProps) {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on input - exclude already added tags
  const suggestions = inputValue.trim()
    ? allTags
        .filter(
          (tag) =>
            tag.toLowerCase().includes(inputValue.toLowerCase()) &&
            !tags.includes(tag),
        )
        .slice(0, 6)
    : [];

  // Check if current input would create a new tag
  const isNewTag =
    inputValue.trim() &&
    !allTags.some((t) => t.toLowerCase() === inputValue.trim().toLowerCase()) &&
    !tags.some((t) => t.toLowerCase() === inputValue.trim().toLowerCase());

  const addTag = useCallback(
    (tag: string) => {
      const trimmed = tag.trim();
      if (!trimmed) return;
      if (tags.length >= maxTags) return;
      if (tags.some((t) => t.toLowerCase() === trimmed.toLowerCase())) return;

      onTagsChange([...tags, trimmed]);
      setInputValue("");
      setIsOpen(false);
      setHighlightedIndex(0);
    },
    [tags, maxTags, onTagsChange],
  );

  const removeTag = useCallback(
    (tagToRemove: string) => {
      onTagsChange(tags.filter((t) => t !== tagToRemove));
    },
    [tags, onTagsChange],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (suggestions.length > 0 && highlightedIndex < suggestions.length) {
        addTag(suggestions[highlightedIndex]);
      } else if (inputValue.trim()) {
        addTag(inputValue);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const maxIndex = isNewTag ? suggestions.length : suggestions.length - 1;
      setHighlightedIndex((i) => Math.min(i + 1, maxIndex));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset highlighted index when suggestions change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [inputValue]);

  const showDropdown = isOpen && (suggestions.length > 0 || isNewTag);

  return (
    <div ref={containerRef} className={compact ? "space-y-2" : "space-y-3"}>
      {/* Current tags */}
      {tags.length > 0 && (
        <div className={cn("flex flex-wrap", compact ? "gap-1.5" : "gap-2")}>
          <AnimatePresence mode="popLayout">
            {tags.map((tag) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  "group inline-flex items-center",
                  "border border-border/40 bg-muted/20",
                  "text-muted-foreground font-medium",
                  "transition-colors duration-200",
                  "hover:border-border/60 hover:bg-muted/30",
                  compact
                    ? "gap-1 px-2 py-0.5 text-[10px] rounded"
                    : "gap-1.5 px-2.5 py-1 text-xs rounded-md",
                )}
              >
                {!compact && (
                  <Tag className="size-3 opacity-50" strokeWidth={1.5} />
                )}
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="opacity-40 hover:opacity-100 transition-opacity -mr-0.5"
                  aria-label={`Remove ${tag}`}
                >
                  <X
                    className={compact ? "size-2.5" : "size-3"}
                    strokeWidth={1.5}
                  />
                </button>
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Input with dropdown */}
      {tags.length < maxTags && (
        <div className="relative">
          <div className="relative">
            <Plus
              className={cn(
                "absolute top-1/2 -translate-y-1/2 text-muted-foreground/40 pointer-events-none",
                compact ? "left-2 size-3" : "left-3 size-3.5",
              )}
              strokeWidth={1.5}
            />
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={cn(
                "w-full border border-dashed border-border/40",
                "bg-transparent placeholder:text-muted-foreground/40",
                "focus:outline-none focus:border-border focus:bg-muted/10",
                "transition-colors duration-200",
                compact
                  ? "h-6 pl-6 pr-2 text-[10px] rounded"
                  : "h-8 pl-8 pr-3 text-sm rounded-lg",
              )}
              aria-expanded={showDropdown || undefined}
              aria-haspopup="listbox"
              role="combobox"
            />
          </div>

          {/* Suggestions dropdown */}
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  "absolute z-50 w-full mt-1.5",
                  "bg-background border border-border/60 rounded-lg shadow-lg",
                  "py-1 overflow-hidden",
                )}
                role="listbox"
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    onClick={() => addTag(suggestion)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={cn(
                      "w-full px-3 py-1.5 text-left text-sm",
                      "transition-colors duration-100",
                      highlightedIndex === index
                        ? "bg-muted/50 text-foreground"
                        : "text-muted-foreground hover:bg-muted/30",
                    )}
                    role="option"
                    aria-selected={highlightedIndex === index}
                  >
                    <span className="flex items-center gap-2">
                      <Tag className="size-3 opacity-50" strokeWidth={1.5} />
                      {suggestion}
                    </span>
                  </button>
                ))}

                {/* Create new tag option */}
                {isNewTag && (
                  <button
                    onClick={() => addTag(inputValue)}
                    onMouseEnter={() => setHighlightedIndex(suggestions.length)}
                    className={cn(
                      "w-full px-3 py-1.5 text-left text-sm",
                      "transition-colors duration-100",
                      "border-t border-border/40",
                      highlightedIndex === suggestions.length
                        ? "bg-muted/50 text-foreground"
                        : "text-muted-foreground hover:bg-muted/30",
                    )}
                    role="option"
                    aria-selected={highlightedIndex === suggestions.length}
                  >
                    <span className="flex items-center gap-2">
                      <Plus className="size-3 opacity-50" strokeWidth={1.5} />
                      Create "{inputValue.trim()}"
                    </span>
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Max tags message */}
      {tags.length >= maxTags && (
        <p className="text-xs text-muted-foreground/50">
          Maximum {maxTags} tags reached
        </p>
      )}
    </div>
  );
}
