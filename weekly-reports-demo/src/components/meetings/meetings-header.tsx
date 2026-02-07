import { HugeiconsIcon } from "@hugeicons/react";
import { Mic01Icon, CalendarAdd01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@components/ui/button";

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
        <HugeiconsIcon icon={Mic01Icon} size={16} />
        Start
      </Button>
      <Button variant="secondary" size="sm">
        <HugeiconsIcon icon={CalendarAdd01Icon} size={16} />
        Schedule
      </Button>
    </div>
  );
}
