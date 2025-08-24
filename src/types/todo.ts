export interface I_Todo {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface I_UpdateTodoParams {
  id: string;
  title?: string;
  isCompleted?: boolean;
}
