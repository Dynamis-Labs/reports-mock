import { AlertTriangle, Calendar } from "lucide-react";
import type { MeetingAction } from "../../types/action";
import { useReviewActionsStore } from "../../stores/review-actions-store";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { ParticipantsTable } from "./participants-table";

interface MeetingActionFormProps {
  action: MeetingAction;
}

export function MeetingActionForm({ action }: MeetingActionFormProps) {
  const { updateDraft } = useReviewActionsStore();

  return (
    <div className="space-y-6">
      {/* Action type badge and title */}
      <div className="space-y-2">
        <Badge variant="accent" className="gap-1">
          <Calendar className="size-3" />
          Schedule Meeting
        </Badge>
        <h3 className="font-semibold text-subheading text-foreground">
          {action.title}
        </h3>
      </div>

      {/* Calendar warning */}
      {!action.calendarConnected && (
        <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
          <AlertTriangle className="size-5 text-warning shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-ui font-medium text-foreground">
              Calendar not connected
            </p>
            <p className="text-caption text-muted-foreground">
              Connect your calendar to automatically schedule this meeting.
            </p>
          </div>
        </div>
      )}

      {/* Meeting name */}
      <div className="space-y-2">
        <label
          htmlFor="meeting-name"
          className="text-ui font-medium text-foreground"
        >
          Meeting Name
        </label>
        <Input
          id="meeting-name"
          value={action.meetingName}
          onChange={(e) => updateDraft({ meetingName: e.target.value })}
          placeholder="Enter meeting name"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label
          htmlFor="meeting-description"
          className="text-ui font-medium text-foreground"
        >
          Description
        </label>
        <Textarea
          id="meeting-description"
          value={action.description}
          onChange={(e) => updateDraft({ description: e.target.value })}
          placeholder="Enter meeting description"
          rows={5}
        />
      </div>

      {/* Participants */}
      <ParticipantsTable
        participants={action.participants}
        label="Participants"
      />
    </div>
  );
}
