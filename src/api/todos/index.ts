import type { I_Todo, I_UpdateTodoParams } from "../../types/todo";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("Missing ENV: VITE_API_URL is not defined");
}

export async function getTodos(): Promise<I_Todo[]> {
  try {
    const res = await fetch(`${API_URL}/current`);
    if (!res.ok) {
      throw new Error(`Failed to fetch todos: ${res.status} ${res.statusText}`);
    }
    const data: I_Todo[] = await res.json();
    return data;
  } catch (err) {
    console.error("getTodos error:", err);
    if (err instanceof Error) throw new Error(err.message);
    throw new Error("An unexpected error occurred while fetching todos");
  }
}

export async function getTodo(id: string): Promise<I_Todo> {
  try {
    const res = await fetch(`${API_URL}/current/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch todo: ${res.status} ${res.statusText}`);
    }
    const data: I_Todo = await res.json();
    return data;
  } catch (err) {
    console.error("getTodo error:", err);
    if (err instanceof Error) throw new Error(err.message);
    throw new Error("An unexpected error occurred while fetching the todo");
  }
}

export async function createTodo(newTodo: {
  title: string;
  isCompleted?: boolean;
}): Promise<I_Todo> {
  try {
    const res = await fetch(`${API_URL}/current`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    if (!res.ok) {
      throw new Error(`Failed to create todo: ${res.status} ${res.statusText}`);
    }

    const data: I_Todo = await res.json();
    return data;
  } catch (err) {
    console.error("createTodo error:", err);
    if (err instanceof Error) throw new Error(err.message);
    throw new Error("An unexpected error occurred while creating todo");
  }
}

export async function updateTodo({
  id,
  title,
  isCompleted,
}: I_UpdateTodoParams): Promise<I_Todo> {
  try {
    const res = await fetch(`${API_URL}/current/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, isCompleted }),
    });

    if (!res.ok) {
      throw new Error(`Failed to update todo: ${res.status} ${res.statusText}`);
    }

    const data: I_Todo = await res.json();
    return data;
  } catch (err) {
    console.error("updateTodo error:", err);
    if (err instanceof Error) throw new Error(err.message);
    throw new Error("An unexpected error occurred while updating todo");
  }
}

export async function deleteTodo(id: string): Promise<I_Todo> {
  try {
    const res = await fetch(`${API_URL}/current/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`Failed to delete todo: ${res.status} ${res.statusText}`);
    }

    const data: I_Todo = await res.json();
    return data;
  } catch (err) {
    console.error("deleteTodo error:", err);
    if (err instanceof Error) throw new Error(err.message);
    throw new Error("An unexpected error occurred while deleting the todo");
  }
}
