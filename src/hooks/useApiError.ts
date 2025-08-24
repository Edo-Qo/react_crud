import { useState, useCallback } from "react";

interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

interface UseApiErrorReturn {
  error: ApiError | null;
  setError: (error: ApiError | null) => void;
  clearError: () => void;
  handleApiError: (error: unknown, fallbackMessage?: string) => void;
  isError: boolean;
}

export function useApiError(): UseApiErrorReturn {
  const [error, setErrorState] = useState<ApiError | null>(null);

  const setError = useCallback((error: ApiError | null) => {
    setErrorState(error);
  }, []);

  const clearError = useCallback(() => {
    setErrorState(null);
  }, []);

  const handleApiError = useCallback((error: unknown, fallbackMessage = "An unexpected error occurred") => {
    let apiError: ApiError;

    if (error instanceof Error) {
      apiError = {
        message: error.message,
        code: error.name,
      };
    } else if (typeof error === "string") {
      apiError = {
        message: error,
      };
    } else if (error && typeof error === "object" && "message" in error) {
      const errorObj = error as Record<string, unknown>;
      apiError = {
        message: String(errorObj.message),
        code: errorObj.code ? String(errorObj.code) : undefined,
        status: errorObj.status ? Number(errorObj.status) : undefined,
      };
    } else {
      apiError = {
        message: fallbackMessage,
      };
    }

    setErrorState(apiError);
    console.error("API Error:", apiError);
  }, []);

  return {
    error,
    setError,
    clearError,
    handleApiError,
    isError: error !== null,
  };
}
