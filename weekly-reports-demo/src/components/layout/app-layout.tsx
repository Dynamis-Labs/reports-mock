import { type ReactNode } from "react";
import { IconNav } from "./icon-nav";
import { cn } from "@lib/utils";

const SIDEBAR_WIDTH = 220;

interface AppLayoutProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  leftSidebar: ReactNode;
  mainContent: ReactNode;
  commentPanel?: ReactNode;
  className?: string;
}

export function AppLayout({
  activeSection = "reports",
  onSectionChange,
  leftSidebar,
  mainContent,
  commentPanel,
  className,
}: AppLayoutProps) {
  return (
    <div
      className={cn("flex h-screen overflow-hidden bg-background", className)}
    >
      {/* Icon Navigation */}
      <IconNav
        activeSection={activeSection}
        onSectionChange={onSectionChange}
      />

      {/* Conditional Left Sidebar - only render if content provided */}
      {leftSidebar && (
        <aside
          style={{ width: SIDEBAR_WIDTH }}
          className="shrink-0 border-r border-border bg-sidebar overflow-y-auto"
        >
          {leftSidebar}
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0 bg-background overflow-hidden">
        {mainContent}
      </div>

      {/* Comment Panel - slides in from right */}
      {commentPanel}
    </div>
  );
}
