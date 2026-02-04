import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Todo, TodoStatus, TodoPriority } from "../types/todo";
import { mockTodos } from "../data/mock-todos";

interface TodoState {
  // Data
  todos: Todo[];

  // View state
  searchQuery: string;
  selectedPriorities: TodoPriority[];

  // Selection
  selectedTodoId: string | null;
  isDrawerOpen: boolean;

  // Actions - CRUD
  addTodo: (todo: Omit<Todo, "id" | "createdAt" | "updatedAt">) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => Todo | null;
  moveTodo: (id: string, newStatus: TodoStatus) => void;
  deleteTodo: (id: string) => void;

  // View actions
  setSearchQuery: (query: string) => void;
  togglePriority: (priority: TodoPriority) => void;
  clearFilters: () => void;

  // Drawer actions
  openDrawer: (todoId: string) => void;
  closeDrawer: () => void;

  // Computed
  getTodosByStatus: (status: TodoStatus) => Todo[];
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: mockTodos,
      searchQuery: "",
      selectedPriorities: [],
      selectedTodoId: null,
      isDrawerOpen: false,

      addTodo: (todoData) => {
        const newTodo: Todo = {
          ...todoData,
          id: `todo-${Date.now()}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          todos: [newTodo, ...state.todos],
        }));
      },

      updateTodo: (id, updates) => {
        let updatedTodo: Todo | null = null;
        set((state) => ({
          todos: state.todos.map((todo) => {
            if (todo.id === id) {
              updatedTodo = {
                ...todo,
                ...updates,
                updatedAt: new Date(),
              };
              return updatedTodo;
            }
            return todo;
          }),
        }));
        return updatedTodo;
      },

      moveTodo: (id, newStatus) => {
        const now = new Date();
        set((state) => ({
          todos: state.todos.map((todo) => {
            if (todo.id === id) {
              return {
                ...todo,
                status: newStatus,
                updatedAt: now,
                completedAt: newStatus === "completed" ? now : todo.completedAt,
                cancelledAt: newStatus === "cancelled" ? now : todo.cancelledAt,
              };
            }
            return todo;
          }),
        }));
      },

      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
          selectedTodoId:
            state.selectedTodoId === id ? null : state.selectedTodoId,
          isDrawerOpen:
            state.selectedTodoId === id ? false : state.isDrawerOpen,
        }));
      },

      setSearchQuery: (query) => set({ searchQuery: query }),

      togglePriority: (priority) => {
        set((state) => ({
          selectedPriorities: state.selectedPriorities.includes(priority)
            ? state.selectedPriorities.filter((p) => p !== priority)
            : [...state.selectedPriorities, priority],
        }));
      },

      clearFilters: () => set({ searchQuery: "", selectedPriorities: [] }),

      openDrawer: (todoId) =>
        set({ selectedTodoId: todoId, isDrawerOpen: true }),

      closeDrawer: () => set({ isDrawerOpen: false }),

      getTodosByStatus: (status) => {
        const state = get();
        return state.todos
          .filter((todo) => {
            if (todo.status !== status) return false;

            // Search filter
            if (state.searchQuery) {
              const query = state.searchQuery.toLowerCase();
              if (
                !todo.title.toLowerCase().includes(query) &&
                !todo.linkedEvent.toLowerCase().includes(query)
              ) {
                return false;
              }
            }

            // Priority filter
            if (
              state.selectedPriorities.length > 0 &&
              !state.selectedPriorities.includes(todo.priority)
            ) {
              return false;
            }

            return true;
          })
          .sort((a, b) => {
            // Sort by priority (urgent first), then by due date
            const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
            const priorityDiff =
              priorityOrder[a.priority] - priorityOrder[b.priority];
            if (priorityDiff !== 0) return priorityDiff;

            // Then by due date (earliest first)
            if (a.dueDate && b.dueDate) {
              return a.dueDate.getTime() - b.dueDate.getTime();
            }
            if (a.dueDate) return -1;
            if (b.dueDate) return 1;

            return 0;
          });
      },
    }),
    {
      name: "todos-storage",
      version: 2, // Bump version to clear old localStorage data
      // Don't persist todos - always load from mock to avoid stale data
      partialize: () => ({}),
    },
  ),
);
