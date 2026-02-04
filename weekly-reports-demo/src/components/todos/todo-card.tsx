import { Calendar, Link2, Circle, CheckCircle2, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { useTodoStore } from "../../stores/todo-store";
import type { Todo } from "../../types/todo";

interface TodoCardProps {
  todo: Todo;
}

function formatDueDate(date: Date): string {
  const now = new Date();
  const diffDays = Math.ceil(
    (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays < 0) return "Overdue";
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays <= 7) return `${diffDays}d`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function isOverdue(date: Date): boolean {
  return date < new Date();
}

/**
 * Todo card with inline actions
 * - Circle checkbox on left: marks as complete
 * - Trash button on right: marks as cancelled
 * - Card is NOT clickable (no drawer)
 */
export function TodoCard({ todo }: TodoCardProps) {
  const { moveTodo } = useTodoStore();

  const overdue =
    todo.dueDate && todo.status === "active" && isOverdue(todo.dueDate);

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    moveTodo(todo.id, "completed");
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    moveTodo(todo.id, "cancelled");
  };

  const isActive = todo.status === "active";
  const isCompleted = todo.status === "completed";
  const isCancelled = todo.status === "cancelled";

  return (
    <motion.div
      className={cn(
        "group relative w-full rounded-lg",
        "bg-surface-elevated",
        "border transition-all duration-200",
        "p-3",
        isCompleted && "opacity-60",
        isCancelled && "opacity-40",
        "border-border/40",
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox / Status Indicator */}
        <button
          type="button"
          onClick={handleComplete}
          disabled={!isActive}
          className={cn(
            "mt-0.5 shrink-0 transition-colors",
            isActive
              ? "text-muted-foreground/40 hover:text-accent cursor-pointer"
              : "cursor-default",
          )}
          aria-label={
            isCompleted
              ? "Already completed"
              : isCancelled
                ? "Already cancelled"
                : "Mark as complete"
          }
        >
          {isCompleted ? (
            <CheckCircle2
              className="size-4 text-emerald-500"
              strokeWidth={1.5}
            />
          ) : (
            <Circle
              className={cn(
                "size-4",
                isActive && "group-hover:text-accent",
                isCancelled && "text-muted-foreground/30",
              )}
              strokeWidth={1.5}
            />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3
            className={cn(
              "font-medium text-[13px] leading-tight mb-1",
              isCompleted && "line-through text-muted-foreground",
              isCancelled && "line-through text-muted-foreground/60",
              !isCompleted && !isCancelled && "text-foreground",
            )}
          >
            {todo.title}
          </h3>

          {/* Linked Event */}
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60 mb-2">
            <Link2 className="size-3 shrink-0" strokeWidth={1.5} />
            <span className="truncate">{todo.linkedEvent}</span>
          </div>

          {/* Footer: Due date + Priority */}
          <div className="flex items-center justify-between gap-2">
            {todo.dueDate ? (
              <div
                className={cn(
                  "flex items-center gap-1 text-[11px]",
                  overdue && isActive
                    ? "text-red-500"
                    : "text-muted-foreground/60",
                )}
              >
                <Calendar className="size-3" strokeWidth={1.5} />
                <span
                  className={cn(
                    "tabular-nums",
                    overdue && isActive && "font-medium",
                  )}
                >
                  {formatDueDate(todo.dueDate)}
                </span>
              </div>
            ) : (
              <span className="text-[11px] text-muted-foreground/40">
                No due date
              </span>
            )}

            <Badge variant={todo.priority} className="text-[10px] px-1.5 py-0">
              {todo.priority}
            </Badge>
          </div>
        </div>

        {/* Cancel/Trash Action - only for active todos */}
        {isActive && (
          <button
            type="button"
            onClick={handleCancel}
            className={cn(
              "shrink-0 mt-0.5 opacity-0 group-hover:opacity-100",
              "text-muted-foreground/40 hover:text-red-500",
              "transition-all duration-150",
            )}
            aria-label="Cancel todo"
          >
            <Trash2 className="size-3.5" strokeWidth={1.5} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
