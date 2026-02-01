import { motion, useScroll, useSpring } from "motion/react";
import { useRef, useEffect } from "react";
import { staggerContainer } from "../../lib/motion";
import { ReportHeader } from "./report-header";
import { ReportContent } from "./report-content";
import { HighlightedContent, CommentLayer } from "../comments";
import { useCommentStore } from "../../stores/comment-store";
import type { WeeklyReport } from "../../data/mock-reports";

interface ReadingPaneProps {
  report: WeeklyReport | null;
}

export function ReadingPane({ report }: ReadingPaneProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollContainerRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const { activeHighlightId, highlights } = useCommentStore();

  // Auto-scroll to active highlight
  useEffect(() => {
    if (
      !activeHighlightId ||
      !contentRef.current ||
      !scrollContainerRef.current
    )
      return;

    const highlight = highlights.find((h) => h.id === activeHighlightId);
    if (!highlight) return;

    // Find the text position and scroll to it
    const walker = document.createTreeWalker(
      contentRef.current,
      NodeFilter.SHOW_TEXT,
    );

    let currentOffset = 0;
    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      const nodeLength = node.length;

      if (currentOffset + nodeLength > highlight.startOffset) {
        const range = document.createRange();
        range.setStart(node, highlight.startOffset - currentOffset);
        range.setEnd(
          node,
          Math.min(highlight.endOffset - currentOffset, nodeLength),
        );
        const rect = range.getBoundingClientRect();
        const containerRect =
          scrollContainerRef.current.getBoundingClientRect();

        // Scroll to center the highlight in the viewport
        const scrollTop =
          scrollContainerRef.current.scrollTop +
          rect.top -
          containerRect.top -
          containerRect.height / 3;

        scrollContainerRef.current.scrollTo({
          top: scrollTop,
          behavior: "smooth",
        });
        break;
      }
      currentOffset += nodeLength;
    }
  }, [activeHighlightId, highlights]);

  if (!report) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-24 h-px bg-border mx-auto mb-6" />
          <p className="text-heading font-medium text-muted-foreground">
            Select a report to read
          </p>
          <div className="w-24 h-px bg-border mx-auto mt-6" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full flex">
      {/* Main content area */}
      <div className="flex-1 relative">
        {/* Reading progress indicator */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 bg-accent origin-left z-10"
          style={{ scaleX }}
        />

        {/* Content */}
        <div ref={scrollContainerRef} className="h-full overflow-y-auto">
          <motion.div
            className="px-8 py-8 lg:px-12 lg:py-10 max-w-4xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            key={report.id}
          >
            <ReportHeader report={report} />
            <HighlightedContent reportId={report.id} contentRef={contentRef}>
              <ReportContent content={report.content} />
            </HighlightedContent>

            {/* Footer flourish */}
            <div className="mt-16 pt-8 border-t border-border-subtle flex items-center justify-center gap-4">
              <div className="w-8 h-px bg-accent/30" />
              <span className="text-micro text-muted-foreground/50 uppercase tracking-widest">
                End of Report
              </span>
              <div className="w-8 h-px bg-accent/30" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Comment layer - positioned in the right margin */}
      <CommentLayer contentRef={contentRef} reportId={report.id} />
    </div>
  );
}
