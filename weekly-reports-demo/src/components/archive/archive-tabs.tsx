import { Radio, FileText } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import { springs } from "../../lib/motion";
import type { ArchiveTab } from "../../stores/archive-store";

interface TabConfig {
  id: ArchiveTab;
  icon: typeof Radio;
  label: string;
  count: number;
}

interface ArchiveTabsProps {
  activeTab: ArchiveTab;
  onTabChange: (tab: ArchiveTab) => void;
  radarsCount: number;
  reportsCount: number;
  className?: string;
}

/**
 * Compact tab toggle for switching between Meetings and Reports views
 * Uses motion layoutId for smooth indicator animation
 * Styled to match the tight sidebar aesthetic
 */
export function ArchiveTabs({
  activeTab,
  onTabChange,
  radarsCount,
  reportsCount,
  className,
}: ArchiveTabsProps) {
  const tabs: TabConfig[] = [
    { id: "reports", icon: FileText, label: "Reports", count: reportsCount },
    { id: "radars", icon: Radio, label: "Radars", count: radarsCount },
  ];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 p-0.5 rounded-md bg-muted/40",
        className,
      )}
    >
      {tabs.map(({ id, icon: Icon, label, count }) => {
        const isActive = activeTab === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange(id)}
            className={cn(
              "relative flex items-center gap-1.5 px-2.5 py-1 rounded-[5px]",
              "text-[11px] font-medium transition-colors",
              isActive
                ? "text-foreground"
                : "text-foreground/60 hover:text-foreground/80",
            )}
          >
            {isActive && (
              <motion.div
                layoutId="archive-tab-indicator"
                className="absolute inset-0 bg-surface-elevated rounded-[5px] shadow-sm"
                transition={springs.quick}
              />
            )}
            <Icon className="size-3 relative z-10" strokeWidth={1.5} />
            <span className="relative z-10">{label}</span>
            <span
              className={cn(
                "relative z-10 text-[10px] tabular-nums",
                isActive ? "text-muted-foreground" : "text-muted-foreground/60",
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
