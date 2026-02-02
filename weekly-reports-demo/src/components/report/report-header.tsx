import { motion } from "motion/react";
import { Sparkles, Link2 } from "lucide-react";
import { formatDateRange } from "../../lib/utils";
import { staggerItem } from "../../lib/motion";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useReviewActionsStore } from "../review-actions";
import type { WeeklyReport } from "../../data/mock-reports";

interface ReportHeaderProps {
  report: WeeklyReport;
}

export function ReportHeader({ report }: ReportHeaderProps) {
  const { openModal } = useReviewActionsStore();
  const actions = report.actions ?? [];
  const actionCount = actions.filter((a) => a.status === "pending").length;

  const handleReviewClick = () => {
    if (actions.length > 0) {
      openModal(actions);
    }
  };
  return (
    <motion.header variants={staggerItem} className="mb-16">
      {/* Week indicator */}
      <div className="flex items-center gap-4 mb-8">
        <span className="font-semibold text-caption uppercase tracking-wider text-accent">
          Week {report.weekNumber}
        </span>
        <div className="h-px flex-1 bg-border-subtle" />
        <span className="text-caption text-muted-foreground">
          {formatDateRange(report.dateRange.start, report.dateRange.end)}
        </span>
      </div>

      {/* Title */}
      <h1 className="font-bold text-display tracking-tight text-foreground leading-[1.1]">
        {report.title}
      </h1>

      {/* Actions row */}
      <div className="flex items-center gap-3 mt-10 pt-8 border-t border-border-subtle">
        <div className="flex-1" />
        <Button variant="ghost" size="icon" className="size-8">
          <Link2 className="size-4" />
        </Button>
        {actionCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={handleReviewClick}
          >
            <Sparkles className="size-3.5" />
            Review
            <Badge variant="count" className="ml-1">
              {actionCount}
            </Badge>
          </Button>
        )}
      </div>
    </motion.header>
  );
}
