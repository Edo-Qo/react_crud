import { useState, useCallback, useMemo } from "react";
import type { I_Todo } from "../types/todo";

interface UseSearchReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredItems: I_Todo[];
  isSearching: boolean;
  clearSearch: () => void;
}

export function useSearch(items: I_Todo[] | null): UseSearchReturn {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const filteredItems = useMemo(() => {
    if (!items) return [];

    const term = searchTerm.trim().toLowerCase();
    if (!term) return items;

    return items.filter(
      (item) =>
        item.id.toLowerCase() === term ||
        item.title.toLowerCase().includes(term)
    );
  }, [items, searchTerm]);

  const setSearchTermWithDelay = useCallback((term: string) => {
    setIsSearching(true);
    setSearchTerm(term);

    // Simulate search delay for better UX
    setTimeout(() => setIsSearching(false), 300);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setIsSearching(false);
  }, []);

  return {
    searchTerm,
    setSearchTerm: setSearchTermWithDelay,
    filteredItems,
    isSearching,
    clearSearch,
  };
}
