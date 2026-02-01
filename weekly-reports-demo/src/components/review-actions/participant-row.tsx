import { motion } from "motion/react";
import { Check, X, ChevronDown } from "lucide-react";
import type { Participant, MatchStatus } from "../../types/action";
import { useReviewActionsStore } from "../../stores/review-actions-store";
import { springs } from "../../lib/motion";
import { cn } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

interface ParticipantRowProps {
  participant: Participant;
}

const matchStatusLabels: Record<MatchStatus, string> = {
  matched: "Matched",
  suggested: "Suggested",
  manual: "Manual",
  none: "No match",
};

const matchStatusStyles: Record<MatchStatus, string> = {
  matched: "text-green-600 dark:text-green-400",
  suggested: "text-amber-600 dark:text-amber-400",
  manual: "text-blue-600 dark:text-blue-400",
  none: "text-muted-foreground",
};

export function ParticipantRow({ participant }: ParticipantRowProps) {
  const { removeParticipant, updateParticipantMatch, confirmParticipant } =
    useReviewActionsStore();

  const isConfirmed = participant.matchStatus === "matched";

  return (
    <motion.tr
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={springs.quick}
      className="border-b border-border-subtle last:border-0"
    >
      {/* Name */}
      <td className="py-2.5 pr-4">
        <span className="text-ui text-foreground">{participant.name}</span>
      </td>

      {/* Email */}
      <td className="py-2.5 pr-4">
        <span className="text-caption text-muted-foreground">
          {participant.email || "—"}
        </span>
      </td>

      {/* Match status dropdown */}
      <td className="py-2.5 pr-4">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "flex items-center gap-1 text-caption font-medium cursor-pointer",
              "hover:opacity-80 transition-opacity",
              matchStatusStyles[participant.matchStatus],
            )}
          >
            {matchStatusLabels[participant.matchStatus]}
            <ChevronDown className="size-3" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {(Object.keys(matchStatusLabels) as MatchStatus[]).map((status) => (
              <DropdownMenuItem
                key={status}
                onClick={() => updateParticipantMatch(participant.id, status)}
                className={cn(participant.matchStatus === status && "bg-muted")}
              >
                <span className={matchStatusStyles[status]}>
                  {matchStatusLabels[status]}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </td>

      {/* Actions */}
      <td className="py-2.5 text-right">
        <div className="flex items-center justify-end gap-1">
          {/* Confirm button */}
          <button
            onClick={() => confirmParticipant(participant.id)}
            disabled={isConfirmed}
            className={cn(
              "p-1 rounded transition-colors",
              isConfirmed
                ? "text-green-600 dark:text-green-400 cursor-default"
                : "text-muted-foreground hover:text-green-600 dark:hover:text-green-400 hover:bg-muted",
            )}
            aria-label={isConfirmed ? "Confirmed" : "Confirm participant"}
          >
            <Check className="size-4" />
          </button>

          {/* Remove button */}
          <button
            onClick={() => removeParticipant(participant.id)}
            className="p-1 rounded text-muted-foreground hover:text-red-600 dark:hover:text-red-400 hover:bg-muted transition-colors"
            aria-label="Remove participant"
          >
            <X className="size-4" />
          </button>
        </div>
      </td>
    </motion.tr>
  );
}
