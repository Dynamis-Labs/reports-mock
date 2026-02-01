import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import type { Participant } from "../../types/action";
import { useReviewActionsStore } from "../../stores/review-actions-store";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ParticipantRow } from "./participant-row";

interface ParticipantsTableProps {
  participants: Participant[];
  label: string;
}

export function ParticipantsTable({
  participants,
  label,
}: ParticipantsTableProps) {
  const { addParticipant } = useReviewActionsStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleAddParticipant = () => {
    if (!newName.trim()) return;

    const participant: Participant = {
      id: crypto.randomUUID(),
      name: newName.trim(),
      email: newEmail.trim(),
      matchStatus: "manual",
    };

    addParticipant(participant);
    setNewName("");
    setNewEmail("");
    setIsAdding(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddParticipant();
    } else if (e.key === "Escape") {
      setIsAdding(false);
      setNewName("");
      setNewEmail("");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-ui font-medium text-foreground">{label}</label>
        {!isAdding && (
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-muted-foreground hover:text-foreground"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="size-3.5" />
            Add
          </Button>
        )}
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 text-left">
              <th className="py-2 px-4 text-micro font-medium uppercase tracking-wider text-muted-foreground">
                Name
              </th>
              <th className="py-2 px-4 text-micro font-medium uppercase tracking-wider text-muted-foreground">
                Email
              </th>
              <th className="py-2 px-4 text-micro font-medium uppercase tracking-wider text-muted-foreground">
                Match
              </th>
              <th className="py-2 px-4 text-micro font-medium uppercase tracking-wider text-muted-foreground text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            <AnimatePresence mode="popLayout">
              {participants.map((participant) => (
                <ParticipantRow
                  key={participant.id}
                  participant={participant}
                />
              ))}
            </AnimatePresence>

            {/* Add participant row */}
            {isAdding && (
              <tr className="bg-muted/30">
                <td className="py-2 px-4">
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Name"
                    className="h-8 text-caption"
                    autoFocus
                  />
                </td>
                <td className="py-2 px-4">
                  <Input
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="email@example.com"
                    type="email"
                    className="h-8 text-caption"
                  />
                </td>
                <td className="py-2 px-4">
                  <span className="text-caption text-muted-foreground">
                    Manual
                  </span>
                </td>
                <td className="py-2 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsAdding(false);
                        setNewName("");
                        setNewEmail("");
                      }}
                      className="h-7 px-2 text-caption"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleAddParticipant}
                      disabled={!newName.trim()}
                      className="h-7 px-2 text-caption"
                    >
                      Add
                    </Button>
                  </div>
                </td>
              </tr>
            )}

            {/* Empty state */}
            {participants.length === 0 && !isAdding && (
              <tr>
                <td colSpan={4} className="py-8 text-center">
                  <p className="text-caption text-muted-foreground">
                    No {label.toLowerCase()} added yet
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 gap-1"
                    onClick={() => setIsAdding(true)}
                  >
                    <Plus className="size-3.5" />
                    Add {label.toLowerCase().replace(/s$/, "")}
                  </Button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
