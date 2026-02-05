import { PageBreadcrumbHeader } from "../layout/page-breadcrumb-header";
import { TodoColumn } from "./todo-column";
import { useTodoStore } from "../../stores/todo-store";

/**
 * Todos page with 3-column Kanban layout
 * Uses inline actions on cards (no drawer)
 */
export function TodosPage() {
  const { getTodosByStatus } = useTodoStore();

  const activeTodos = getTodosByStatus("active");
  const completedTodos = getTodosByStatus("completed");
  const cancelledTodos = getTodosByStatus("cancelled");

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb Header */}
      <PageBreadcrumbHeader items={[{ label: "TODOs" }]} />

      {/* Main Content - Centered 3-Column Kanban */}
      <div className="flex-1 overflow-hidden p-6">
        <div className="max-w-4xl mx-auto h-full">
          <div className="grid grid-cols-3 gap-6 h-full">
            <TodoColumn
              title="Active"
              status="active"
              todos={activeTodos}
              emptyMessage="No active todos"
            />
            <TodoColumn
              title="Completed"
              status="completed"
              todos={completedTodos}
              emptyMessage="Nothing completed yet"
            />
            <TodoColumn
              title="Cancelled"
              status="cancelled"
              todos={cancelledTodos}
              emptyMessage="No cancelled items"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
