import { useState } from "react";
import { DeleteButton } from "..";
import type { I_Todo } from "../../types/todo";
import { formatDate, isToday, isYesterday } from "../../utils/dateUtils";

interface Props {
  todo: I_Todo;
  deleteTodoById: (id: string) => Promise<void>;
  updateTodoById: (id: string, updates: Partial<I_Todo>) => Promise<void>;
}

export default function TodoCard({
  todo,
  deleteTodoById,
  updateTodoById,
}: Props) {
  const [isEditable, setIsEditable] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.isCompleted);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Save title changes
  const handleEditToggle = async () => {
    if (isEditable) {
      const trimmedTitle = title.trim();
      if (!trimmedTitle) {
        setError("Title cannot be empty");
        return;
      }
      
      setIsSaving(true);
      setError(null);
      try {
        await updateTodoById(todo.id, { title: trimmedTitle, isCompleted: completed });
        setIsEditable(false);
      } catch (err) {
        console.error("Failed to update todo:", err);
        setError("Failed to update todo. Please try again.");
      } finally {
        setIsSaving(false);
      }
    } else {
      setIsEditable(true);
      setError(null);
    }
  };

  // Immediate update when checkbox is toggled
  const handleCheckboxChange = async (checked: boolean) => {
    setCompleted(checked);
    try {
      await updateTodoById(todo.id, { isCompleted: checked });
    } catch (err) {
      console.error("Failed to update completed status:", err);
      setCompleted(!checked); // revert on failure
      setError("Failed to update status. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setTitle(todo.title); // Reset to original title
    setIsEditable(false);
    setError(null);
  };

  const getDateDisplay = (dateString: string, label: string) => {
    const formattedDate = formatDate(dateString);
    let displayText = `${label}: ${formattedDate}`;
    
    if (isToday(dateString)) {
      displayText = `${label}: Today`;
    } else if (isYesterday(dateString)) {
      displayText = `${label}: Yesterday`;
    }
    
    return displayText;
  };

  return (
    <div className="card flex flex-col justify-between h-full">
      <div className="flex flex-col space-y-3">
        {isEditable ? (
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError(null);
              }}
              className="input-field w-full"
              disabled={isSaving}
              maxLength={100}
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500">
                {title.length}/100 characters
              </span>
              {error && (
                <span className="text-xs text-red-500">{error}</span>
              )}
            </div>
          </div>
        ) : (
          <h3
            className={`text-lg font-semibold break-words ${
              completed ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {title}
          </h3>
        )}

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => handleCheckboxChange(e.target.checked)}
            className="h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-400 cursor-pointer"
          />
          <span className="text-sm font-medium select-none">
            {completed ? "Completed" : "In Progress"}
          </span>
        </label>

        <div className="text-sm text-gray-500 space-y-1">
          <p>{getDateDisplay(todo.createdAt, "Created")}</p>
          {todo.updatedAt !== todo.createdAt && (
            <p>{getDateDisplay(todo.updatedAt, "Updated")}</p>
          )}
        </div>
      </div>

      <div className="flex mt-4 space-x-3">
        {isEditable ? (
          <>
            <button
              type="button"
              onClick={handleEditToggle}
              disabled={isSaving}
              className="btn-primary flex-1"
            >
              {isSaving ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save"
              )}
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              disabled={isSaving}
              className="px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 disabled:opacity-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 flex-1"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handleEditToggle}
            className="btn-primary flex-1"
          >
            Edit
          </button>
        )}
        <DeleteButton onDelete={deleteTodoById} todoId={todo.id} />
      </div>
    </div>
  );
}
