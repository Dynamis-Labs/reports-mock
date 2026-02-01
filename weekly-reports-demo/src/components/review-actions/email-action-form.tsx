import { Mail } from "lucide-react";
import type { EmailAction } from "../../types/action";
import { useReviewActionsStore } from "../../stores/review-actions-store";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { ParticipantsTable } from "./participants-table";

interface EmailActionFormProps {
  action: EmailAction;
}

export function EmailActionForm({ action }: EmailActionFormProps) {
  const { updateDraft } = useReviewActionsStore();

  return (
    <div className="space-y-6">
      {/* Action type badge and title */}
      <div className="space-y-2">
        <Badge variant="accent" className="gap-1">
          <Mail className="size-3" />
          Send Email
        </Badge>
        <h3 className="font-semibold text-subheading text-foreground">
          {action.title}
        </h3>
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label
          htmlFor="email-subject"
          className="text-ui font-medium text-foreground"
        >
          Subject
        </label>
        <Input
          id="email-subject"
          value={action.subject}
          onChange={(e) => updateDraft({ subject: e.target.value })}
          placeholder="Enter email subject"
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label
          htmlFor="email-message"
          className="text-ui font-medium text-foreground"
        >
          Message
        </label>
        <Textarea
          id="email-message"
          value={action.message}
          onChange={(e) => updateDraft({ message: e.target.value })}
          placeholder="Enter email message"
          rows={8}
        />
      </div>

      {/* Recipients */}
      <ParticipantsTable participants={action.recipients} label="Recipients" />
    </div>
  );
}
