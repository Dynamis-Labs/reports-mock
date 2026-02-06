/**
 * Personal Task Card
 *
 * Card component for the personal swimlane showing high-level work tasks.
 * Features:
 * - Small category icon in corner
 * - Title (bold, 2 lines max)
 * - Brief description (3 lines max)
 * - ~240×160px size
 * - Click anywhere opens popup
 */

import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import { categoryConfig } from "../../data/mock-home";
import type { PersonalTask } from "../../types/home";

interface PersonalTaskCardProps {
  task: PersonalTask;
  onClick: () => void;
}

export function PersonalTaskCard({ task, onClick }: PersonalTaskCardProps) {
  const config = categoryConfig[task.category];
  const CategoryIcon = config.icon;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn(
        // Base styles
        "w-[240px] min-h-[160px] p-4 shrink-0",
        "bg-surface-elevated border border-border rounded-xl",
        "flex flex-col text-left",
        "transition-colors duration-200",
        "hover:border-border hover:shadow-lg",
      )}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", duration: 0.25, bounce: 0 }}
    >
      {/* Header row: Category icon */}
      <div className="flex items-center justify-between mb-3">
        <div
          className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded-md",
            config.bgColor,
          )}
        >
          <CategoryIcon
            className={cn("size-3.5", config.color)}
            strokeWidth={1.5}
          />
          <span
            className={cn(
              "text-[10px] font-semibold uppercase tracking-wider",
              config.color,
            )}
          >
            {config.label}
          </span>
        </div>
      </div>

      {/* Title */}
      <h4 className="font-semibold text-sm text-foreground leading-snug line-clamp-2 mb-2">
        {task.title}
      </h4>

      {/* Description */}
      <p className="text-caption text-muted-foreground leading-relaxed line-clamp-3 flex-1">
        {task.description}
      </p>
    </motion.button>
  );
}
