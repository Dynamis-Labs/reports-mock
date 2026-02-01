import {
  type ReactNode,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { motion, useSpring } from "motion/react";
import { cn } from "../../lib/utils";

interface ResizablePanelGroupProps {
  children: ReactNode;
  className?: string;
}

export function ResizablePanelGroup({
  children,
  className,
}: ResizablePanelGroupProps) {
  return (
    <div className={cn("flex h-full flex-1 overflow-hidden", className)}>
      {children}
    </div>
  );
}

interface ResizablePanelProps {
  children: ReactNode;
  defaultWidth?: number;
  width?: number;
  className?: string;
}

export function ResizablePanel({
  children,
  defaultWidth,
  width,
  className,
}: ResizablePanelProps) {
  const springWidth = useSpring(width ?? defaultWidth ?? 0, {
    stiffness: 300,
    damping: 30,
  });

  useEffect(() => {
    if (width !== undefined) {
      springWidth.set(width);
    }
  }, [width, springWidth]);

  // If no width specified, this is a flex panel (main content)
  if (width === undefined && defaultWidth === undefined) {
    return <div className={cn("flex-1 min-w-0", className)}>{children}</div>;
  }

  return (
    <motion.aside
      style={{ width: springWidth }}
      className={cn("shrink-0 overflow-hidden", className)}
    >
      {children}
    </motion.aside>
  );
}

interface ResizableHandleProps {
  onResize: (delta: number) => void;
  onResizeEnd?: () => void;
  side: "left" | "right";
}

export function ResizableHandle({
  onResize,
  onResizeEnd,
  side,
}: ResizableHandleProps) {
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startX.current = e.clientX;
    document.body.classList.add("no-select", "cursor-col-resize");
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - startX.current;
      startX.current = e.clientX;
      // For right panels, invert the delta
      onResize(side === "right" ? -delta : delta);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.classList.remove("no-select", "cursor-col-resize");
      onResizeEnd?.();
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, onResize, onResizeEnd, side]);

  return (
    <div
      onMouseDown={handleMouseDown}
      className={cn(
        "group w-1 shrink-0 cursor-col-resize flex items-center justify-center",
        "hover:bg-accent/20 transition-colors",
        isDragging && "bg-accent/40",
      )}
    >
      <div
        className={cn(
          "w-0.5 h-8 rounded-full bg-border transition-all",
          "group-hover:h-16 group-hover:bg-accent/50",
          isDragging && "h-16 bg-accent",
        )}
      />
    </div>
  );
}
