import { useCallback } from "react";
import type { I_Todo } from "../types/todo";

interface UseOptimisticUpdateReturn {
  optimisticCreate: (
    newTodo: { title: string; isCompleted?: boolean },
    todos: I_Todo[] | null,
    setTodos: (todos: I_Todo[] | null) => void
  ) => I_Todo;
  optimisticUpdate: (
    id: string,
    updates: Partial<I_Todo>,
    todos: I_Todo[] | null,
    setTodos: (todos: I_Todo[] | null) => void
  ) => I_Todo[];
  optimisticDelete: (
    id: string,
    todos: I_Todo[] | null,
    setTodos: (todos: I_Todo[] | null) => void
  ) => I_Todo[];
  rollbackUpdate: (
    originalTodos: I_Todo[] | null,
    setTodos: (todos: I_Todo[] | null) => void
  ) => void;
}

export function useOptimisticUpdate(): UseOptimisticUpdateReturn {
  const optimisticCreate = useCallback((
    newTodo: { title: string; isCompleted?: boolean },
    todos: I_Todo[] | null,
    setTodos: (todos: I_Todo[] | null) => void
  ): I_Todo => {
    const optimisticTodo: I_Todo = {
      id: `temp-${Date.now()}`,
      title: newTodo.title,
      isCompleted: newTodo.isCompleted || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newTodos = [optimisticTodo, ...(todos || [])];
    setTodos(newTodos);
    
    return optimisticTodo;
  }, []);

  const optimisticUpdate = useCallback((
    id: string,
    updates: Partial<I_Todo>,
    todos: I_Todo[] | null,
    setTodos: (todos: I_Todo[] | null) => void
  ): I_Todo[] => {
    if (!todos) return [];
    
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...updates, updatedAt: new Date().toISOString() } : todo
    );
    
    setTodos(newTodos);
    return newTodos;
  }, []);

  const optimisticDelete = useCallback((
    id: string,
    todos: I_Todo[] | null,
    setTodos: (todos: I_Todo[] | null) => void
  ): I_Todo[] => {
    if (!todos) return [];
    
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    return newTodos;
  }, []);

  const rollbackUpdate = useCallback((
    originalTodos: I_Todo[] | null,
    setTodos: (todos: I_Todo[] | null) => void
  ) => {
    setTodos(originalTodos);
  }, []);

  return {
    optimisticCreate,
    optimisticUpdate,
    optimisticDelete,
    rollbackUpdate,
  };
}
