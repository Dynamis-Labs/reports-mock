import { Mic, CalendarPlus } from "lucide-react";
import { Button } from "../ui/button";

/**
 * Header action buttons for the meetings page
 * Shows "Start" (recording) and "Schedule" buttons
 */
export function MeetingsHeaderActions() {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="default"
        size="sm"
        className="bg-destructive hover:bg-destructive/90 text-white"
      >
        <Mic className="size-4 mr-1.5" />
        Start
      </Button>
      <Button variant="secondary" size="sm">
        <CalendarPlus className="size-4 mr-1.5" />
        Schedule
      </Button>
    </div>
  );
}
