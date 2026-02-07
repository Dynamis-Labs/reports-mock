/**
 * Needs Attention Popup
 *
 * Modal showing the full list of items needing attention.
 * Features:
 * - Full scrollable list of all blocked, at-risk, and update items
 * - Same item styling as the main view
 * - Click to navigate to relevant page
 */

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@lib/utils";
import { springs } from "@lib/motion";
import { InvolvementTabItem } from "./involvement-tab-item";
import { useHomeStore } from "@stores/home-store";
import { mockInvolvementItems } from "@data/mock-home";
import type { InvolvementItem } from "@types/home";

interface NeedsAttentionPopupProps {
  onNavigateToMemory: (initiativeId: string) => void;
  onNavigateToRadar: (radarId?: string) => void;
}

// Priority order for sorting
const typePriority: Record<InvolvementItem["type"], number> = {
  "blocked-swimlane": 1,
  "at-risk": 2,
  "recent-update": 3,
  "action-item": 4,
};

const severityPriority: Record<string, number> = {
  critical: 1,
  high: 2,
  medium: 3,
  low: 4,
};

export function NeedsAttentionPopup({
  onNavigateToMemory,
  onNavigateToRadar,
}: NeedsAttentionPopupProps) {
  const isOpen = useHomeStore((state) => state.isNeedsAttentionPopupOpen);
  const closePopup = useHomeStore((state) => state.closeNeedsAttentionPopup);

  // Get all items (excluding action items), sorted by priority
  const allItems = mockInvolvementItems
    .filter((item) => item.type !== "action-item")
    .sort((a, b) => {
      const typeDiff = typePriority[a.type] - typePriority[b.type];
      if (typeDiff !== 0) return typeDiff;
      const aSeverity = severityPriority[a.severity || "low"];
      const bSeverity = severityPriority[b.severity || "low"];
      return aSeverity - bSeverity;
    });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePopup();
      }
    },
    [closePopup],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  // Handle item click
  const handleItemClick = (item: InvolvementItem) => {
    if (item.type === "blocked-swimlane" && item.linkedInitiativeId) {
      onNavigateToMemory(item.linkedInitiativeId);
    } else if (item.type === "at-risk") {
      onNavigateToRadar(item.linkedRadarId);
    } else if (item.type === "recent-update") {
      if (item.linkedInitiativeId) {
        onNavigateToMemory(item.linkedInitiativeId);
      } else if (item.linkedRadarId) {
        onNavigateToRadar(item.linkedRadarId);
      }
    }
    closePopup();
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={closePopup}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={springs.default}
            className={cn(
              "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-full max-w-lg max-h-[85vh]",
              "bg-background rounded-xl shadow-float border border-border",
              "flex flex-col z-50",
            )}
          >
            {/* Header */}
            <header className="shrink-0 px-6 py-4 border-b border-border/40">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-lg text-foreground">
                    Needs Attention
                  </h2>
                  <p className="text-caption text-muted-foreground mt-1">
                    {allItems.length} items requiring your attention
                  </p>
                </div>

                {/* Close button */}
                <button
                  onClick={closePopup}
                  className="p-2 -m-2 text-muted-foreground/50 hover:text-foreground rounded-[var(--radius-lg)] hover:bg-muted/50 transition-colors"
                >
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={20}
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            </header>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-2">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.03,
                      delayChildren: 0.05,
                    },
                  },
                }}
                className="space-y-1"
              >
                {allItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                  >
                    <InvolvementTabItem
                      item={item}
                      onClick={() => handleItemClick(item)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
