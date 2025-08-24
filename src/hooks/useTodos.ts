import { useState, useEffect, useCallback } from "react";
import type { I_Todo } from "../types/todo";
import {
  getTodos,
  createTodo as createTodoApi,
  updateTodo as updateTodoApi,
  deleteTodo as deleteTodoApi,
} from "../api/todos";
import { useSearch } from "./useSearch";
import { useOptimisticUpdate } from "./useOptimisticUpdate";

interface UseTodosReturn {
  todos: I_Todo[] | null;
  filteredTodos: I_Todo[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isSearching: boolean;
  clearSearch: () => void;
  refresh: () => Promise<void>;
  createTodo: (newTodo: {
    title: string;
    isCompleted?: boolean;
  }) => Promise<void>;
  updateTodoById: (id: string, updates: Partial<I_Todo>) => Promise<void>;
  deleteTodoById: (id: string) => Promise<void>;
  clearError: () => void;
}

export default function useTodos(): UseTodosReturn {
  const [todos, setTodos] = useState<I_Todo[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use custom hooks
  const { searchTerm, setSearchTerm, filteredItems: filteredTodos, isSearching, clearSearch } = useSearch(todos);
  const { optimisticCreate, optimisticUpdate, optimisticDelete, rollbackUpdate } = useOptimisticUpdate();

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to fetch todos. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const createTodo = async (newTodo: {
    title: string;
    isCompleted?: boolean;
  }) => {
    try {
      setError(null);
      
      // Optimistic update
      const optimisticTodo = optimisticCreate(newTodo, todos, setTodos);
      
      // API call
      const created = await createTodoApi(newTodo);
      
      // Replace optimistic todo with real one
      setTodos((prev) => 
        prev?.map((todo) => 
          todo.id === optimisticTodo.id ? created : todo
        ) || [created]
      );
    } catch (err) {
      console.error("createTodo error:", err);
      
      // Rollback optimistic update
      if (todos) {
        const originalTodos = todos.filter(todo => todo.id !== `temp-${Date.now()}`);
        setTodos(originalTodos);
      }
      
      setError(err instanceof Error ? err.message : "Failed to create todo. Please try again.");
      throw err;
    }
  };

  const updateTodoById = async (id: string, updates: Partial<I_Todo>) => {
    // Store original todos for rollback
    const originalTodos = todos;
    
    try {
      setError(null);
      
      // Optimistic update
      optimisticUpdate(id, updates, todos, setTodos);
      
      // API call
      const updated = await updateTodoApi({ id, ...updates });
      
      // Replace optimistic update with real one
      setTodos((prev) => 
        prev?.map((todo) => (todo.id === id ? updated : todo)) || null
      );
    } catch (err) {
      console.error("updateTodoById error:", err);
      
      // Rollback optimistic update
      if (originalTodos) {
        rollbackUpdate(originalTodos, setTodos);
      }
      
      setError(err instanceof Error ? err.message : "Failed to update todo. Please try again.");
      throw err;
    }
  };

  const deleteTodoById = async (id: string) => {
    // Store original todos for rollback
    const originalTodos = todos;
    
    try {
      setError(null);
      
      // Optimistic update
      optimisticDelete(id, todos, setTodos);
      
      // API call
      await deleteTodoApi(id);
    } catch (err) {
      console.error("deleteTodoById error:", err);
      
      // Rollback optimistic update
      if (originalTodos) {
        rollbackUpdate(originalTodos, setTodos);
      }
      
      setError(err instanceof Error ? err.message : "Failed to delete todo. Please try again.");
      throw err;
    }
  };

  const clearError = () => setError(null);

  return {
    todos,
    filteredTodos,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    isSearching,
    clearSearch,
    refresh: fetchTodos,
    createTodo,
    updateTodoById,
    deleteTodoById,
    clearError,
  };
}
