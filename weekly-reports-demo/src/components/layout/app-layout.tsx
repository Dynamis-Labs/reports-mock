import { type ReactNode, useState, useCallback, useEffect } from "react";
import { IconNav } from "./icon-nav";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./resizable-panel";
import { cn } from "../../lib/utils";

const LEFT_MIN = 280;
const LEFT_DEFAULT = 280;
const LEFT_MAX = 400;

const STORAGE_KEY = "weekly-reports-layout";

interface StoredLayout {
  leftWidth?: number;
}

interface AppLayoutProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  leftSidebar: ReactNode;
  mainContent: ReactNode;
  commentPanel?: ReactNode;
  className?: string;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function getStoredLayout(): StoredLayout {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function AppLayout({
  activeSection = "reports",
  onSectionChange,
  leftSidebar,
  mainContent,
  commentPanel,
  className,
}: AppLayoutProps) {
  const [leftWidth, setLeftWidth] = useState(
    () => getStoredLayout().leftWidth ?? LEFT_DEFAULT,
  );

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ leftWidth }));
  }, [leftWidth]);

  const handleLeftResize = useCallback((delta: number) => {
    setLeftWidth((w: number) => clamp(w + delta, LEFT_MIN, LEFT_MAX));
  }, []);

  return (
    <div
      className={cn("flex h-screen overflow-hidden bg-background", className)}
    >
      {/* Icon Navigation */}
      <IconNav
        activeSection={activeSection}
        onSectionChange={onSectionChange}
      />

      {/* Resizable Panels */}
      <ResizablePanelGroup>
        <ResizablePanel
          width={leftWidth}
          className="border-r border-border bg-sidebar overflow-y-auto"
        >
          {leftSidebar}
        </ResizablePanel>

        <ResizableHandle onResize={handleLeftResize} side="left" />

        <ResizablePanel className="bg-background overflow-hidden">
          {mainContent}
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Comment Panel - slides in dynamically */}
      {commentPanel}
    </div>
  );
}
