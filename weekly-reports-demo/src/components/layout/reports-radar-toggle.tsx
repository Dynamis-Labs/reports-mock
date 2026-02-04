import { FileText, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import { springs } from "../../lib/motion";

export type ViewMode = "reports" | "radar";

const modes = [
  { id: "reports" as const, icon: FileText, label: "Reports" },
  { id: "radar" as const, icon: AlertTriangle, label: "Radar" },
];

interface ReportsRadarToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
  className?: string;
}

/**
 * Compact toggle between Reports and Radar views
 * Uses motion layoutId for smooth background animation
 * Styled to be unobtrusive and match the tight UI chrome
 */
export function ReportsRadarToggle({
  value,
  onChange,
  className,
}: ReportsRadarToggleProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 p-0.5 rounded-md bg-muted/40",
        className,
      )}
    >
      {modes.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={cn(
            "relative flex items-center gap-1 px-2 py-0.5 rounded-[5px]",
            "text-[11px] font-medium transition-colors",
            value === id
              ? "text-foreground"
              : "text-foreground/60 hover:text-foreground/80",
          )}
        >
          {value === id && (
            <motion.div
              layoutId="reports-radar-indicator"
              className="absolute inset-0 bg-surface-elevated rounded-[5px] shadow-sm"
              transition={springs.quick}
            />
          )}
          <Icon className="size-3 relative z-10" strokeWidth={1.5} />
          <span className="relative z-10">{label}</span>
        </button>
      ))}
    </div>
  );
}
