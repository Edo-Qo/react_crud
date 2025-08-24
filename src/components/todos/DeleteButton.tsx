import { useState } from "react";

interface Props {
  onDelete: (todoId: string) => Promise<void>;
  todoId: string;
}

export default function DeleteButton({ onDelete, todoId }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(todoId);
    } catch (err) {
      console.error("Failed to delete todo:", err);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex space-x-2 flex-1">
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="btn-danger flex-1"
        >
          {isDeleting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Deleting...
            </span>
          ) : (
            "Confirm"
          )}
        </button>
        <button
          type="button"
          onClick={() => setShowConfirm(false)}
          disabled={isDeleting}
          className="px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 disabled:opacity-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 flex-1"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setShowConfirm(true)}
      className="btn-danger flex-1"
    >
      Delete
    </button>
  );
}
