import { motion } from "motion/react";
import { Settings } from "lucide-react";
import { cn, formatDate } from "../../lib/utils";
import { springs, staggerContainer, staggerItem } from "../../lib/motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import type { WeeklyReport } from "../../data/mock-reports";

interface ArchiveSidebarProps {
  reports: WeeklyReport[];
  selectedReportId: string | null;
  onSelectReport: (id: string) => void;
}

export function ArchiveSidebar({
  reports,
  selectedReportId,
  onSelectReport,
}: ArchiveSidebarProps) {
  return (
    <div className="flex flex-col h-full p-4">
      {/* Header */}
      <header className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-caption uppercase tracking-wider text-muted-foreground">
            Weekly Reports
          </span>
          <Button variant="ghost" size="icon" className="size-7">
            <Settings className="size-3.5" />
          </Button>
        </div>
        <Input
          type="search"
          placeholder="Search reports..."
          className="h-8 text-caption"
        />
      </header>

      {/* Report List */}
      <motion.div
        className="flex-1 -mx-2 space-y-1"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {reports.map((report) => {
          const isSelected = selectedReportId === report.id;
          return (
            <motion.button
              key={report.id}
              variants={staggerItem}
              onClick={() => onSelectReport(report.id)}
              className={cn(
                "group w-full text-left px-3 py-2.5 rounded-lg",
                "transition-colors duration-200 cursor-pointer",
                isSelected ? "bg-accent-muted" : "hover:bg-muted",
              )}
              whileHover={{ x: 2 }}
              transition={springs.quick}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-medium text-caption text-muted-foreground">
                  Week {report.weekNumber}
                </span>
                {isSelected && (
                  <Badge variant="active" className="text-[10px] px-1.5 py-0">
                    Active
                  </Badge>
                )}
              </div>
              <h3
                className={cn(
                  "font-medium text-ui leading-snug transition-colors",
                  isSelected
                    ? "text-foreground"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              >
                {report.title}
              </h3>
              <span className="text-micro text-muted-foreground/60 mt-1 block">
                {formatDate(report.dateRange.start)}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Footer */}
      <div className="pt-3 border-t border-border-subtle">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-success animate-pulse-glow" />
          <span className="text-micro text-muted-foreground">
            Auto-generated weekly
          </span>
        </div>
      </div>
    </div>
  );
}
