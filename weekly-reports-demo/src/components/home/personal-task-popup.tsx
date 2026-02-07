/**
 * Personal Task Popup
 *
 * Modal showing task details with nested todos.
 * Features:
 * - Header with task title
 * - Simple todo list (checkbox + title only)
 * - Read-only (no editing)
 * - Portal to body, backdrop click to close
 */

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Tick01Icon,
  CircleIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@lib/utils";
import { springs } from "@lib/motion";
import { categoryConfig } from "@data/mock-home";
import { useHomeStore } from "@stores/home-store";
import { mockPersonalTasks } from "@data/mock-home";

export function PersonalTaskPopup() {
  const isOpen = useHomeStore((state) => state.isTaskPopupOpen);
  const selectedTaskId = useHomeStore((state) => state.selectedTaskId);
  const closePopup = useHomeStore((state) => state.closeTaskPopup);

  const task = mockPersonalTasks.find((t) => t.id === selectedTaskId);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePopup();
      }
    },
    [closePopup],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!task) return null;

  const config = categoryConfig[task.category];
  const completedCount = task.todos.filter((t) => t.isCompleted).length;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={closePopup}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={springs.default}
            className={cn(
              "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-full max-w-md max-h-[80vh]",
              "bg-background rounded-xl shadow-float border border-border",
              "flex flex-col z-50",
            )}
          >
            {/* Header */}
            <header className="shrink-0 px-6 py-4 border-b border-border/40">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Category badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={cn(
                        "flex items-center gap-1.5 px-2 py-1 rounded-[var(--radius-md)]",
                        config.bgColor,
                      )}
                    >
                      <HugeiconsIcon
                        icon={config.icon}
                        size={14}
                        strokeWidth={1.5}
                        className={config.color}
                      />
                      <span
                        className={cn(
                          "text-[10px] font-semibold uppercase tracking-wider",
                          config.color,
                        )}
                      >
                        {config.label}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="font-semibold text-lg text-foreground">
                    {task.title}
                  </h2>
                </div>

                {/* Close button */}
                <button
                  onClick={closePopup}
                  className="p-2 -m-2 text-muted-foreground/50 hover:text-foreground rounded-[var(--radius-lg)] hover:bg-muted/50 transition-colors"
                >
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={20}
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            </header>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {/* Progress summary */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-micro font-medium text-muted-foreground/60 uppercase tracking-wider">
                  Progress
                </span>
                <span className="text-caption text-muted-foreground">
                  {completedCount} of {task.todos.length} complete
                </span>
              </div>

              {/* Todo list */}
              <ul className="space-y-2">
                {task.todos.map((todo) => (
                  <li
                    key={todo.id}
                    className={cn(
                      "flex items-start gap-3 p-2 rounded-[var(--radius-lg)]",
                      "transition-colors",
                    )}
                  >
                    {/* Checkbox (read-only visual) */}
                    <span
                      className={cn(
                        "size-5 rounded border flex items-center justify-center shrink-0 mt-0.5",
                        todo.isCompleted
                          ? "bg-accent border-accent text-accent-foreground"
                          : "border-border",
                      )}
                    >
                      {todo.isCompleted ? (
                        <HugeiconsIcon
                          icon={Tick01Icon}
                          size={12}
                          strokeWidth={2}
                        />
                      ) : (
                        <span className="size-2 opacity-0">
                          <HugeiconsIcon icon={CircleIcon} size={8} />
                        </span>
                      )}
                    </span>

                    {/* Title */}
                    <span
                      className={cn(
                        "text-sm flex-1",
                        todo.isCompleted
                          ? "text-muted-foreground line-through"
                          : "text-foreground",
                      )}
                    >
                      {todo.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
