import { Clock } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useCountdownWithTime } from "./use-countdown";
import type { Meeting } from "../../../types/meeting";

interface CountdownTimerProps {
  meeting: Meeting;
  className?: string;
  showIcon?: boolean;
}

/**
 * Displays a real-time countdown to meeting start
 * Updates every minute via useCountdownWithTime hook
 * e.g., "In 15 mins (2:00 PM)"
 */
export function CountdownTimer({
  meeting,
  className,
  showIcon = true,
}: CountdownTimerProps) {
  const countdown = useCountdownWithTime(meeting);

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-caption text-muted-foreground",
        className,
      )}
    >
      {showIcon && <Clock className="size-3.5" />}
      <span>{countdown}</span>
    </div>
  );
}
