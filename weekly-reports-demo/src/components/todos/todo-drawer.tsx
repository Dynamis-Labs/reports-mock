import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Calendar,
  Link2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { springs } from "../../lib/motion";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useTodoStore } from "../../stores/todo-store";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function TodoDrawer() {
  const {
    todos,
    selectedTodoId,
    isDrawerOpen,
    closeDrawer,
    moveTodo,
    deleteTodo,
  } = useTodoStore();

  const todo = todos.find((t) => t.id === selectedTodoId);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        closeDrawer();
      }
    },
    [isDrawerOpen, closeDrawer],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleComplete = () => {
    if (todo) {
      moveTodo(todo.id, "completed");
      closeDrawer();
    }
  };

  const handleCancel = () => {
    if (todo) {
      moveTodo(todo.id, "cancelled");
      closeDrawer();
    }
  };

  const handleReactivate = () => {
    if (todo) {
      moveTodo(todo.id, "active");
    }
  };

  const handleDelete = () => {
    if (todo) {
      deleteTodo(todo.id);
    }
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && todo && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-foreground/10 z-40"
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={springs.default}
            className={cn(
              "fixed top-0 right-0 h-full w-[400px] z-50",
              "bg-background border-l border-border",
              "flex flex-col shadow-xl",
            )}
          >
            {/* Header */}
            <header className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Badge variant={todo.priority}>{todo.priority}</Badge>
                <Badge
                  variant={
                    todo.status === "active"
                      ? "default"
                      : todo.status === "completed"
                        ? "accent"
                        : "outline"
                  }
                >
                  {todo.status}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeDrawer}
                className="size-8"
              >
                <X className="size-4" strokeWidth={1.5} />
              </Button>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Title */}
              <h2 className="text-title font-semibold text-foreground mb-4">
                {todo.title}
              </h2>

              {/* Linked Event */}
              <div className="flex items-center gap-2 text-ui text-muted-foreground mb-6">
                <Link2 className="size-4" strokeWidth={1.5} />
                <span>{todo.linkedEvent}</span>
              </div>

              {/* Due Date */}
              {todo.dueDate && (
                <div className="flex items-center gap-2 text-ui mb-6">
                  <Calendar
                    className="size-4 text-muted-foreground"
                    strokeWidth={1.5}
                  />
                  <span>{formatDate(todo.dueDate)}</span>
                </div>
              )}

              {/* Description */}
              {todo.description && (
                <div className="mb-6">
                  <h3 className="text-caption font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Description
                  </h3>
                  <p className="text-ui text-foreground leading-relaxed">
                    {todo.description}
                  </p>
                </div>
              )}

              {/* Timestamps */}
              <div className="space-y-2 text-caption text-muted-foreground">
                <p>Created: {formatDate(todo.createdAt)}</p>
                {todo.completedAt && (
                  <p>Completed: {formatDate(todo.completedAt)}</p>
                )}
                {todo.cancelledAt && (
                  <p>Cancelled: {formatDate(todo.cancelledAt)}</p>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <footer className="p-4 border-t border-border space-y-2">
              {todo.status === "active" && (
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={handleComplete}
                  >
                    <CheckCircle2 className="size-4 mr-2" strokeWidth={1.5} />
                    Mark Complete
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleCancel}
                  >
                    <XCircle className="size-4 mr-2" strokeWidth={1.5} />
                    Cancel
                  </Button>
                </div>
              )}

              {(todo.status === "completed" || todo.status === "cancelled") && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleReactivate}
                >
                  <RotateCcw className="size-4 mr-2" strokeWidth={1.5} />
                  Reactivate
                </Button>
              )}

              <Button
                variant="ghost"
                className="w-full text-red-500 hover:text-red-600 hover:bg-red-500/10"
                onClick={handleDelete}
              >
                <Trash2 className="size-4 mr-2" strokeWidth={1.5} />
                Delete Todo
              </Button>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
