export type TodoStatus = "active" | "completed" | "cancelled";
export type TodoPriority = "low" | "medium" | "high" | "urgent";

export interface Todo {
  id: string;
  title: string;
  linkedEvent: string; // e.g., "Term sheet email", "March PR goals", "Q1 Review"
  status: TodoStatus;
  priority: TodoPriority;
  dueDate?: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  cancelledAt?: Date;
}
