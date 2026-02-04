import {
  BarChart3,
  AlertTriangle,
  FileText,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../../lib/utils";
import { springs } from "../../../lib/motion";
import { Badge } from "../../ui/badge";

export type ArchivedReportType =
  | "weekly"
  | "risk"
  | "daily"
  | "report"
  | "standard";

interface ArchivedReport {
  id: string;
  title: string;
  summary: string;
  type: ArchivedReportType;
  date: Date;
  isUnread?: boolean;
}

interface ReportCardProps {
  report: ArchivedReport;
  isSelected: boolean;
  onClick: () => void;
}

function getTypeConfig(type: ArchivedReportType) {
  const configs: Record<
    ArchivedReportType,
    { icon: typeof BarChart3; label: string; badgeClass: string }
  > = {
    weekly: {
      icon: BarChart3,
      label: "Weekly",
      badgeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    risk: {
      icon: AlertTriangle,
      label: "Risk",
      badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    daily: {
      icon: FileText,
      label: "Daily",
      badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    report: {
      icon: Sparkles,
      label: "Report",
      badgeClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    },
    standard: {
      icon: FileText,
      label: "Report",
      badgeClass: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
    },
  };
  return configs[type];
}

function formatRelativeDate(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Individual report card in the archive list
 * Displays title, summary, type badge, and date
 */
export function ReportCard({ report, isSelected, onClick }: ReportCardProps) {
  const typeConfig = getTypeConfig(report.type);
  const TypeIcon = typeConfig.icon;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-xl border",
        "transition-colors duration-150",
        isSelected
          ? "bg-accent-muted/50 border-accent/40"
          : "bg-background border-border/50 hover:border-border hover:bg-muted/20",
      )}
      whileHover={{ y: -2 }}
      transition={springs.quick}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Title with icon and unread indicator */}
          <div className="flex items-center gap-2 mb-1.5">
            <TypeIcon
              className={cn("size-4 shrink-0", typeConfig.badgeClass)}
              strokeWidth={1.5}
            />
            <h3 className="text-body font-medium text-foreground truncate">
              {report.title}
            </h3>
            {report.isUnread && (
              <span className="size-2 rounded-full bg-blue-500 shrink-0" />
            )}
          </div>

          {/* Summary */}
          <p className="text-ui text-muted-foreground line-clamp-2 mb-3 pl-6">
            {report.summary}
          </p>

          {/* Metadata row */}
          <div className="flex items-center gap-2 pl-6">
            <Badge className={cn("text-micro", typeConfig.badgeClass)}>
              {typeConfig.label}
            </Badge>
            <span className="text-caption text-muted-foreground">
              {formatRelativeDate(report.date)}
            </span>
          </div>
        </div>

        {/* Chevron */}
        <ChevronRight
          className="size-5 text-muted-foreground/40 shrink-0 mt-1"
          strokeWidth={1.5}
        />
      </div>
    </motion.button>
  );
}

export type { ArchivedReport };
