import { FileText, MessageSquare, Users } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../../lib/utils";
import { springs } from "../../../lib/motion";
import type { MeetingDetailTab } from "../../../stores/archive-store";

interface TabConfig {
  id: MeetingDetailTab;
  icon: typeof FileText;
  label: string;
}

interface MeetingDetailTabsProps {
  activeTab: MeetingDetailTab;
  onTabChange: (tab: MeetingDetailTab) => void;
  attendeesCount: number;
  className?: string;
}

/**
 * Compact sub-tabs for meeting detail view
 * Summary, Transcript, Attendees
 */
export function MeetingDetailTabs({
  activeTab,
  onTabChange,
  attendeesCount,
  className,
}: MeetingDetailTabsProps) {
  const tabs: TabConfig[] = [
    { id: "summary", icon: FileText, label: "Summary" },
    { id: "transcript", icon: MessageSquare, label: "Transcript" },
    { id: "attendees", icon: Users, label: `Attendees` },
  ];

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 border-b border-border-subtle",
        className,
      )}
    >
      {tabs.map(({ id, icon: Icon, label }) => {
        const isActive = activeTab === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange(id)}
            className={cn(
              "relative flex items-center gap-1 px-3 py-2",
              "text-[11px] font-medium transition-colors",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground/70",
            )}
          >
            <Icon className="size-3" strokeWidth={1.5} />
            <span>{label}</span>
            {id === "attendees" && (
              <span className="text-[10px] text-muted-foreground/60 tabular-nums ml-0.5">
                {attendeesCount}
              </span>
            )}
            {isActive && (
              <motion.div
                layoutId="meeting-detail-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                transition={springs.quick}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
