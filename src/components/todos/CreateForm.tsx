import { useForm } from "../../hooks/useForm";

interface Props {
  createTodo: (newTodo: {
    title: string;
    isCompleted?: boolean;
  }) => Promise<void>;
}

export default function CreateForm({ createTodo }: Props) {
  const {
    values,
    errors,
    isSubmitting,
    setValue,
    clearErrors,
    validate,
    reset,
    handleSubmit
  } = useForm({
    title: "",
    isCompleted: false
  });

  const validationRules = {
    title: (value: string) => {
      if (!value.trim()) return "Please enter a todo title";
      if (value.trim().length < 3) return "Todo title must be at least 3 characters long";
      if (value.trim().length > 100) return "Todo title must be less than 100 characters";
      return undefined;
    }
  };

  const onSubmit = async (formValues: { title: string; isCompleted: boolean }) => {
    if (!validate(validationRules)) return;

    try {
      await createTodo({ 
        title: formValues.title.trim(), 
        isCompleted: formValues.isCompleted 
      });
      reset({ title: "", isCompleted: false });
      clearErrors();
    } catch (err) {
      console.error("Failed to create todo:", err);
      // Error is handled by the parent component
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Todo</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            value={values.title}
            onChange={(e) => setValue("title", e.target.value)}
            placeholder="What needs to be done?"
            className="input-field w-full"
            disabled={isSubmitting}
            maxLength={100}
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">
              {values.title.length}/100 characters
            </span>
            {errors.title && (
              <span className="text-xs text-red-500">{errors.title}</span>
            )}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting || !values.title.trim()}
          className="btn-success w-full sm:w-auto"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding...
            </span>
          ) : (
            "Add Todo"
          )}
        </button>
      </form>
    </div>
  );
}
