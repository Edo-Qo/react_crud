import useTodos from "../../hooks/useTodos";
import {
  CreateForm,
  ErrorComponent,
  LoadingComponent,
  NotFoundComponent,
  SearchTodo,
  TodoCard,
} from "..";

export default function TodosWrapper() {
  const {
    filteredTodos,
    todos,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    isSearching,
    clearSearch,
    updateTodoById,
    deleteTodoById,
    createTodo,
    clearError,
  } = useTodos();

  if (isLoading) return <LoadingComponent />;
  if (error) return <ErrorComponent errorMessage={error} onRetry={clearError} />;

  const totalTodos = todos?.length || 0;
  const completedTodos = todos?.filter(todo => todo.isCompleted).length || 0;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header with statistics */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Todo Manager</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="text-2xl font-bold text-blue-600">{totalTodos}</div>
              <div className="text-sm text-gray-600">Total Todos</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="text-2xl font-bold text-green-600">{completedTodos}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="text-2xl font-bold text-orange-600">{pendingTodos}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </div>

        <CreateForm createTodo={createTodo} />
        <SearchTodo 
          onSearch={setSearchTerm} 
          searchTerm={searchTerm}
          isSearching={isSearching}
          onClear={clearSearch}
        />
        
        {/* Results section */}
        {(!filteredTodos || filteredTodos.length === 0) ? (
          <div className="text-center py-12">
            {todos && todos.length > 0 ? (
              <NotFoundComponent />
            ) : (
              <div className="bg-white rounded-lg shadow-sm border p-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No todos yet</h3>
                <p className="text-gray-500">Get started by creating your first todo above!</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {searchTerm ? `Search Results (${filteredTodos.length})` : "All Todos"}
                {isSearching && (
                  <span className="ml-2 text-sm text-gray-500">Searching...</span>
                )}
              </h2>
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Clear Search
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTodos.map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  updateTodoById={updateTodoById}
                  deleteTodoById={deleteTodoById}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
