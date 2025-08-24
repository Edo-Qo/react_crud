import React, { useState, useEffect } from "react";

interface Props {
  onSearch: (term: string) => void;
  searchTerm: string;
  isSearching: boolean;
  onClear: () => void;
}

export default function SearchTodo({ onSearch, searchTerm, isSearching, onClear }: Props) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTerm = localSearchTerm.trim();
    
    if (trimmedTerm !== "") {
      onSearch(trimmedTerm);
    }
  };

  const handleClear = () => {
    setLocalSearchTerm("");
    onClear();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    
    if (!value.trim()) {
      onClear();
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Search Todos</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            name="searchTerm"
            placeholder="Search by title or ID..."
            value={localSearchTerm}
            onChange={handleInputChange}
            className="input-field w-full"
            disabled={isSearching}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!localSearchTerm.trim() || isSearching}
            className="btn-primary"
          >
            {isSearching ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : (
              "Search"
            )}
          </button>
          {localSearchTerm.trim() && (
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Clear
            </button>
          )}
        </div>
      </form>
      <p className="text-sm text-gray-600 mt-2">
        Search for todos by entering their title or ID. Leave empty to show all todos.
      </p>
    </section>
  );
}
