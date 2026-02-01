import { motion } from "motion/react";
import { Sparkles, Link2, MessageSquare, Mail, FileText } from "lucide-react";
import { formatDateRange } from "../../lib/utils";
import { staggerItem } from "../../lib/motion";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  SlackIcon,
  LinearIcon,
  GoogleCalendarIcon,
} from "../icons/source-icons";
import { useReviewActionsStore } from "../review-actions";
import type { WeeklyReport, DataSource } from "../../data/mock-reports";

const sourceIcons: Record<DataSource["type"], React.ElementType> = {
  slack: SlackIcon,
  linear: LinearIcon,
  calendar: GoogleCalendarIcon,
  email: Mail,
  document: FileText,
};

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
    <motion.header variants={staggerItem} className="mb-12">
      {/* Week indicator */}
      <div className="flex items-center gap-4 mb-6">
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

      {/* Meta row */}
      <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border-subtle">
        {/* Data sources */}
        <div className="flex items-center gap-3">
          <span className="font-medium text-micro uppercase tracking-wider text-muted-foreground">
            Sources
          </span>
          <div className="flex items-center gap-1.5">
            {report.dataSources.map((source) => {
              const Icon = sourceIcons[source.type];
              return (
                <Badge key={source.id} variant="source" title={source.label}>
                  <Icon className="size-4" />
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Link2 className="size-3.5" />
            Copy link
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
              <span className="ml-1 bg-accent text-accent-foreground rounded px-1.5 py-0.5 text-micro font-medium">
                {actionCount}
              </span>
            </Button>
          )}
          <Button variant="ghost" size="icon" className="size-8">
            <MessageSquare className="size-4" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
