import { useRef, useCallback, useMemo, type ReactNode } from "react";
import { useCommentStore } from "../../stores/comment-store";
import { useTextSelection } from "../../hooks/useTextSelection";
import { cn } from "../../lib/utils";

interface HighlightedContentProps {
  children: ReactNode;
  reportId: string;
  className?: string;
  contentRef?: React.RefObject<HTMLDivElement | null>;
}

export function HighlightedContent({
  children,
  reportId,
  className,
  contentRef: externalRef,
}: HighlightedContentProps) {
  const internalRef = useRef<HTMLDivElement>(null);
  const containerRef = externalRef ?? internalRef;

  const {
    highlights,
    isComposerOpen,
    setPendingSelection,
    openComposer,
    setActiveHighlight,
  } = useCommentStore();

  const reportHighlights = useMemo(
    () => highlights.filter((h) => h.reportId === reportId),
    [highlights, reportId],
  );

  const handleSelect = useCallback(
    (selection: { text: string; startOffset: number; endOffset: number }) => {
      setPendingSelection(selection);
      openComposer();
    },
    [setPendingSelection, openComposer],
  );

  useTextSelection({
    containerRef,
    onSelect: handleSelect,
    enabled: !isComposerOpen,
  });

  // Handle click outside highlights to deselect
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-highlight-id]")) {
        setActiveHighlight(null);
      }
    },
    [setActiveHighlight],
  );

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      onClick={handleClick}
      className={cn("relative", className)}
    >
      {children}

      {/* Visual highlight styles */}
      <style>
        {reportHighlights
          .map(
            (h) => `
          [data-highlight-id="${h.id}"] {
            background: var(--color-accent-muted, rgba(255, 200, 0, 0.2));
            cursor: pointer;
          }
          [data-highlight-id="${h.id}"][data-active="true"] {
            background: var(--color-accent, rgba(255, 200, 0, 0.4));
          }
        `,
          )
          .join("\n")}
      </style>
    </div>
  );
}
