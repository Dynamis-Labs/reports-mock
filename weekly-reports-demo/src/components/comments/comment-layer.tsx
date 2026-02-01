import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  type RefObject,
} from "react";
import { AnimatePresence } from "motion/react";
import { CommentCard } from "./comment-card";
import { useCommentStore } from "../../stores/comment-store";
import type { CommentHighlight } from "../../stores/comment-store";

interface CommentPosition {
  id: string;
  top: number;
}

interface CommentLayerProps {
  contentRef: RefObject<HTMLElement | null>;
  reportId: string;
}

function calculatePositionsFromDOM(
  element: HTMLElement,
  highlights: CommentHighlight[],
): CommentPosition[] {
  const containerRect = element.getBoundingClientRect();
  const newPositions: CommentPosition[] = [];

  for (const highlight of highlights) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);

    let currentOffset = 0;
    let foundStart = false;
    let range: Range | null = null;

    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      const nodeLength = node.length;

      if (!foundStart && currentOffset + nodeLength > highlight.startOffset) {
        range = document.createRange();
        range.setStart(node, highlight.startOffset - currentOffset);
        foundStart = true;
      }

      if (foundStart && currentOffset + nodeLength >= highlight.endOffset) {
        if (range) {
          range.setEnd(
            node,
            Math.min(highlight.endOffset - currentOffset, nodeLength),
          );
        }
        break;
      }

      currentOffset += nodeLength;
    }

    if (range) {
      const rect = range.getBoundingClientRect();
      newPositions.push({
        id: highlight.id,
        top: rect.top - containerRect.top + element.scrollTop,
      });
    }
  }

  // Avoid overlapping - stack cards with minimum gap
  newPositions.sort((a, b) => a.top - b.top);
  const minGap = 100;
  for (let i = 1; i < newPositions.length; i++) {
    const prevBottom = newPositions[i - 1].top + minGap;
    if (newPositions[i].top < prevBottom) {
      newPositions[i].top = prevBottom;
    }
  }

  return newPositions;
}

export function CommentLayer({ contentRef, reportId }: CommentLayerProps) {
  const { highlights, activeHighlightId, setActiveHighlight } =
    useCommentStore();
  const [positions, setPositions] = useState<CommentPosition[]>([]);

  const reportHighlights = useMemo(
    () => highlights.filter((h) => h.reportId === reportId),
    [highlights, reportId],
  );

  const updatePositions = useCallback(() => {
    const element = contentRef.current;
    if (!element) return;
    // Use requestAnimationFrame to batch with browser paint
    requestAnimationFrame(() => {
      setPositions(calculatePositionsFromDOM(element, reportHighlights));
    });
  }, [contentRef, reportHighlights]);

  // Calculate positions after mount and when highlights change
  useEffect(() => {
    updatePositions();
  }, [updatePositions]);

  // Set up scroll and resize listeners
  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const container = element.closest(".overflow-y-auto");
    if (container) {
      container.addEventListener("scroll", updatePositions);
    }
    window.addEventListener("resize", updatePositions);

    return () => {
      container?.removeEventListener("scroll", updatePositions);
      window.removeEventListener("resize", updatePositions);
    };
  }, [contentRef, updatePositions]);

  return (
    <div className="absolute inset-y-0 right-0 w-72 pointer-events-none">
      <div className="relative h-full pointer-events-auto">
        <AnimatePresence>
          {reportHighlights.map((highlight) => {
            const position = positions.find((p) => p.id === highlight.id);
            if (!position) return null;

            return (
              <CommentCard
                key={highlight.id}
                highlight={highlight}
                isActive={activeHighlightId === highlight.id}
                onClick={() => setActiveHighlight(highlight.id)}
                style={{ top: position.top }}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
