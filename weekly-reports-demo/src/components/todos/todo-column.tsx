import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { staggerContainer, staggerItem } from "../../lib/motion";
import { TodoCard } from "./todo-card";
import type { Todo, TodoStatus } from "../../types/todo";

interface TodoColumnProps {
  title: string;
  status: TodoStatus;
  todos: Todo[];
  emptyMessage?: string;
}

const columnColors: Record<TodoStatus, string> = {
  active: "text-foreground",
  completed: "text-emerald-600 dark:text-emerald-400",
  cancelled: "text-muted-foreground/60",
};

/**
 * Compact todo column with inline actions
 * No drawer opening - actions are directly on cards
 */
export function TodoColumn({
  title,
  status,
  todos,
  emptyMessage = "No items",
}: TodoColumnProps) {
  return (
    <div className="flex flex-col h-full min-w-0">
      {/* Column Header - compact */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <h2
          className={cn(
            "text-[11px] font-semibold uppercase tracking-wider",
            columnColors[status],
          )}
        >
          {title}
        </h2>
        <div className="h-px flex-1 bg-border-subtle/50" />
        <span className="text-[11px] text-muted-foreground/50 tabular-nums">
          {todos.length}
        </span>
      </div>

      {/* Cards Container */}
      <div className="flex-1 overflow-y-auto">
        {todos.length === 0 ? (
          <div className="flex items-center justify-center h-24 text-[11px] text-muted-foreground/40">
            {emptyMessage}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-2"
          >
            <AnimatePresence mode="popLayout">
              {todos.map((todo) => (
                <motion.div key={todo.id} variants={staggerItem} layout>
                  <TodoCard todo={todo} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
