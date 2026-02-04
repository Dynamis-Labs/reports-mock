import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Users,
  User,
  ExternalLink,
  X,
  Calendar,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { springs } from "../../lib/motion";
import { eventTypeConfig, type MemoryEvent } from "../../types/memory";
import { useMemoryStore } from "../../stores/memory-store";

/**
 * Memory Event Detail Panel
 *
 * Floating overlay panel that appears when an event is selected.
 * Positioned higher on the page (above chatbox area) for better visibility.
 * Shows:
 * - Type badge + timestamp
 * - Title + description
 * - Action items with checkboxes
 * - Participants ("involved in this event")
 * - Owner (if any)
 * - Sources button → triggers slide-in sources panel
 */

interface MemoryEventDetailProps {
  event: MemoryEvent | null;
}

function formatEventTime(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const eventDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const diffDays = Math.floor(
    (today.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  let dayLabel: string;
  if (diffDays === 0) {
    dayLabel = "Today";
  } else if (diffDays === 1) {
    dayLabel = "Yesterday";
  } else if (diffDays === -1) {
    dayLabel = "Tomorrow";
  } else if (diffDays < 0) {
    dayLabel = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  } else if (diffDays < 7) {
    dayLabel = date.toLocaleDateString("en-US", { weekday: "long" });
  } else {
    dayLabel = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${dayLabel}, ${timeStr}`;
}

export function MemoryEventDetail({ event }: MemoryEventDetailProps) {
  const openSourcesPanel = useMemoryStore((state) => state.openSourcesPanel);
  const selectEvent = useMemoryStore((state) => state.selectEvent);
  const toggleActionItem = useMemoryStore((state) => state.toggleActionItem);

  const handleSourcesClick = () => {
    if (event && event.sources.length > 0) {
      openSourcesPanel(event.sources);
    }
  };

  const handleClose = () => {
    selectEvent(null);
  };

  const handleToggleActionItem = (actionItemId: string) => {
    if (event) {
      toggleActionItem(event.id, actionItemId);
    }
  };

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={springs.snappy}
          className={cn(
            "absolute left-4 right-4 bottom-24 z-30",
            "bg-surface-elevated/95 backdrop-blur-xl",
            "border border-border/50 rounded-xl",
            "max-h-[420px] overflow-hidden",
          )}
        >
          {/* Accent bar at top based on event type */}
          <div
            className={cn(
              "h-1 w-full",
              event.type === "meeting" && "bg-blue-500",
              event.type === "email" && "bg-red-500",
              event.type === "commitment" && "bg-amber-500",
              event.type === "milestone" && "bg-emerald-500",
              event.type === "decision" && "bg-violet-500",
              event.type === "alert" && "bg-red-500",
            )}
          />

          <div className="p-5 overflow-y-auto max-h-[400px]">
            {/* Header Row: Type badge + Timestamp + Close button */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                {/* Type Badge */}
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] px-2.5 py-1 h-6 uppercase tracking-wider font-bold",
                    eventTypeConfig[event.type].bg,
                    eventTypeConfig[event.type].text,
                    eventTypeConfig[event.type].darkBg,
                    eventTypeConfig[event.type].darkText,
                    "border-0",
                  )}
                >
                  {eventTypeConfig[event.type].label}
                </Badge>

                {/* Timestamp */}
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="size-3.5" strokeWidth={1.5} />
                  <span className="text-xs font-medium">
                    {formatEventTime(event.date)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Sources Button */}
                {event.sources.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSourcesClick}
                    className="h-8 gap-2 text-xs"
                  >
                    <FileText className="size-3.5" strokeWidth={1.5} />
                    {event.sources.length} Source
                    {event.sources.length !== 1 ? "s" : ""}
                    <ExternalLink className="size-3 ml-0.5 opacity-50" />
                  </Button>
                )}

                {/* Close button */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <X className="size-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {event.title}
            </h3>

            {/* Summary */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {event.summary}
            </p>

            {/* Action Items */}
            {event.actionItems.length > 0 && (
              <div className="mb-5">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Action Items
                </h4>
                <div className="space-y-2">
                  {event.actionItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleToggleActionItem(item.id)}
                      className={cn(
                        "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all",
                        "bg-muted/30 hover:bg-muted/50",
                        item.isCompleted && "opacity-60",
                      )}
                    >
                      {item.isCompleted ? (
                        <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="size-4 text-muted-foreground/50 shrink-0 mt-0.5" />
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          item.isCompleted &&
                            "line-through text-muted-foreground",
                        )}
                      >
                        {item.title}
                      </span>
                      {item.dueDate && !item.isCompleted && (
                        <span className="text-[10px] text-amber-500 font-medium ml-auto">
                          Due{" "}
                          {item.dueDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer: Participants + Owner */}
            <div className="flex items-center justify-between pt-4 border-t border-border/30">
              {/* Participants */}
              {event.participants.length > 0 ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-muted-foreground/70">
                    <Users className="size-3.5" strokeWidth={1.5} />
                    <span className="text-xs font-medium">Involved:</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Avatar stack */}
                    <div className="flex -space-x-2">
                      {event.participants.slice(0, 5).map((participant) => (
                        <Avatar
                          key={participant.id}
                          name={participant.name}
                          src={participant.avatarUrl}
                          size="sm"
                          className="ring-2 ring-surface-elevated"
                        />
                      ))}
                      {event.participants.length > 5 && (
                        <div className="size-6 rounded-full bg-muted border-2 border-surface-elevated flex items-center justify-center">
                          <span className="text-[9px] font-medium text-muted-foreground">
                            +{event.participants.length - 5}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Names */}
                    <span className="text-xs text-muted-foreground">
                      {event.participants
                        .slice(0, 2)
                        .map((p) => p.name.split(" ")[0])
                        .join(", ")}
                      {event.participants.length > 2 &&
                        ` +${event.participants.length - 2}`}
                    </span>
                  </div>
                </div>
              ) : (
                <div />
              )}

              {/* Owner */}
              {event.participants[0] && (
                <div className="flex items-center gap-2 text-muted-foreground/70">
                  <User className="size-3.5" strokeWidth={1.5} />
                  <span className="text-xs font-medium">Owner:</span>
                  <Avatar
                    name={event.participants[0].name}
                    src={event.participants[0].avatarUrl}
                    size="sm"
                    className="ml-1"
                  />
                  <span className="text-xs text-foreground font-medium">
                    {event.participants[0].name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
