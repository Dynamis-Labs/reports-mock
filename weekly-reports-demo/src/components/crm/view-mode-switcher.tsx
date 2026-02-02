import { motion } from "motion/react";
import { List, Columns, LayoutGrid } from "lucide-react";
import { cn } from "../../lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import type { CrmViewMode } from "../../types/contact";

/**
 * View Mode Switcher
 *
 * Three-way toggle for switching between CRM view layouts.
 * Matches the icon toggle pattern from Review Actions Modal.
 */

const viewModes: { id: CrmViewMode; icon: typeof List; label: string }[] = [
  { id: "accordion", icon: List, label: "List View" },
  { id: "master-detail", icon: Columns, label: "Split View" },
  { id: "card-grid", icon: LayoutGrid, label: "Card View" },
];

interface ViewModeSwitcherProps {
  activeMode: CrmViewMode;
  onChange: (mode: CrmViewMode) => void;
}

export function ViewModeSwitcher({
  activeMode,
  onChange,
}: ViewModeSwitcherProps) {
  return (
    <div className="flex items-center gap-0.5 p-0.5 bg-muted rounded-md">
      {viewModes.map(({ id, icon: Icon, label }) => {
        const isActive = id === activeMode;
        return (
          <Tooltip key={id} delayDuration={0}>
            <TooltipTrigger asChild>
              <motion.button
                onClick={() => onChange(id)}
                className={cn(
                  "relative size-7 rounded flex items-center justify-center",
                  "transition-colors duration-150",
                  isActive
                    ? "bg-surface-elevated text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", duration: 0.15, bounce: 0 }}
              >
                <Icon className="size-3.5" />
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{label}</TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
