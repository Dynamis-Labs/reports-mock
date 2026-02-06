/**
 * Involvement Section
 *
 * Unified list showing items needing attention.
 * Features:
 * - Shows exactly 5 items: 2 blocked, 2 at-risk, 1 update
 * - Arrow button to open popup with full list
 * - No scrolling in main view
 * - Navigation to Memory page or Radar page
 */

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { InvolvementTabItem } from "./involvement-tab-item";
import { useHomeStore } from "../../stores/home-store";
import { mockInvolvementItems } from "../../data/mock-home";
import type { InvolvementItem } from "../../types/home";

interface InvolvementSectionProps {
  onNavigateToMemory: (initiativeId: string) => void;
  onNavigateToRadar: (radarId?: string) => void;
}

export function InvolvementSection({
  onNavigateToMemory,
  onNavigateToRadar,
}: InvolvementSectionProps) {
  const openNeedsAttentionPopup = useHomeStore(
    (state) => state.openNeedsAttentionPopup,
  );

  // Get exactly 4 items: 2 blocked swimlanes, 1 radar (at-risk), 1 alert (update)
  const blockedItems = mockInvolvementItems
    .filter((item) => item.type === "blocked-swimlane")
    .slice(0, 2);

  const atRiskItems = mockInvolvementItems
    .filter((item) => item.type === "at-risk")
    .slice(0, 1);

  const updateItems = mockInvolvementItems
    .filter((item) => item.type === "recent-update")
    .slice(0, 1);

  // Combine in order: blocked, at-risk, update
  const items = [...blockedItems, ...atRiskItems, ...updateItems];

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
  };

  return (
    <div className="h-full flex flex-col bg-surface rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <header className="shrink-0 px-5 py-3 border-b border-border-subtle">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">
            Needs Attention
          </h2>
          <motion.button
            onClick={openNeedsAttentionPopup}
            className={cn(
              "size-7 rounded-md flex items-center justify-center",
              "text-muted-foreground hover:text-foreground",
              "hover:bg-muted/50 transition-colors",
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </motion.button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
              },
            },
          }}
          className="space-y-2.5"
        >
          {items.length > 0 ? (
            items.map((item) => (
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
            ))
          ) : (
            <div className="flex items-center justify-center h-24 text-muted-foreground text-caption">
              Nothing needs your attention
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
