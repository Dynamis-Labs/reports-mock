import { motion, AnimatePresence } from "motion/react";
import { Target, Calendar } from "lucide-react";
import { cn } from "../../lib/utils";
import { Avatar } from "../ui/avatar";
import { springs } from "../../lib/motion";
import { initiativeCategoryColors, type Initiative } from "../../types/memory";

/**
 * Initiative Header
 *
 * Displays the selected initiative's information:
 * - Initiative name (large title)
 * - Brief description
 * - Stacked stakeholder avatars (max 5 visible)
 * - Status badge (On Track / Blocked)
 */

interface MemoryInitiativeHeaderProps {
  initiative: Initiative | null;
}

function formatDateRange(start: Date, end?: Date): string {
  const startStr = start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  if (end) {
    const endStr = end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    return `${startStr} - ${endStr}`;
  }

  return `Started ${startStr}`;
}

function EmptyState() {
  return (
    <div className="border-b border-border bg-surface-elevated/50 px-6 py-8">
      <div className="flex items-center gap-3 text-muted-foreground">
        <div className="size-10 rounded-lg bg-muted/50 flex items-center justify-center">
          <Target className="size-5 opacity-50" strokeWidth={1.5} />
        </div>
        <div>
          <p className="font-medium text-foreground/70">
            No initiative selected
          </p>
          <p className="text-sm text-muted-foreground/60">
            Select an initiative from the sidebar
          </p>
        </div>
      </div>
    </div>
  );
}

export function MemoryInitiativeHeader({
  initiative,
}: MemoryInitiativeHeaderProps) {
  if (!initiative) {
    return <EmptyState />;
  }

  const dotColor =
    initiativeCategoryColors[initiative.category] || "bg-slate-400";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={initiative.id}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={springs.snappy}
        className="border-b border-border bg-surface-elevated/50"
      >
        <div className="px-6 py-5">
          {/* Row 1: Title */}
          <div className="flex items-start gap-3">
            {/* Category dot */}
            <div
              className={cn("size-3 rounded-full shrink-0 mt-2", dotColor)}
            />

            <div className="flex-1 min-w-0">
              {/* Initiative name */}
              <h2 className="text-xl font-semibold text-foreground truncate">
                {initiative.name}
              </h2>

              {/* Description */}
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-2xl">
                {initiative.description}
              </p>
            </div>
          </div>

          {/* Row 2: Metadata + Stakeholders */}
          <div className="flex items-center justify-between mt-4">
            {/* Date range + Category */}
            <div className="flex items-center gap-3 text-caption text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="size-3.5" strokeWidth={1.5} />
                <span>
                  {formatDateRange(initiative.startDate, initiative.targetDate)}
                </span>
              </div>
              <span className="text-border">•</span>
              <span className="font-medium">{initiative.category}</span>
            </div>

            {/* Stakeholder avatars */}
            {initiative.stakeholders.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-micro text-muted-foreground/60 uppercase tracking-wider">
                  Stakeholders
                </span>
                <div className="flex -space-x-2">
                  {initiative.stakeholders.slice(0, 5).map((stakeholder) => (
                    <Avatar
                      key={stakeholder.id}
                      name={stakeholder.name}
                      src={stakeholder.avatarUrl}
                      size="sm"
                      className="ring-2 ring-background"
                    />
                  ))}
                  {initiative.stakeholders.length > 5 && (
                    <div className="size-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                      <span className="text-[9px] font-medium text-muted-foreground">
                        +{initiative.stakeholders.length - 5}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
