import { useState, useCallback } from "react";

interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  setValue: (key: keyof T, value: T[keyof T]) => void;
  setValues: (values: Partial<T>) => void;
  setError: (key: keyof T, error: string) => void;
  clearErrors: () => void;
  validate: (validationRules: ValidationRules<T>) => boolean;
  reset: (initialValues: T) => void;
  handleSubmit: (onSubmit: (values: T) => Promise<void>) => (e: React.FormEvent) => Promise<void>;
}

type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K]) => string | undefined;
};

export function useForm<T extends Record<string, unknown>>(initialValues: T): UseFormReturn<T> {
  const [values, setValuesState] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((key: keyof T, value: T[keyof T]) => {
    setValuesState(prev => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: undefined }));
    }
  }, [errors]);

  const setValues = useCallback((newValues: Partial<T>) => {
    setValuesState(prev => ({ ...prev, ...newValues }));
  }, []);

  const setError = useCallback((key: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [key]: error }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const validate = useCallback((validationRules: ValidationRules<T>): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationRules).forEach((key) => {
      const rule = validationRules[key as keyof T];
      if (rule) {
        const error = rule(values[key as keyof T]);
        if (error) {
          newErrors[key as keyof T] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values]);

  const reset = useCallback((initialValues: T) => {
    setValuesState(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, []);

  const handleSubmit = useCallback((onSubmit: (values: T) => Promise<void>) => {
    return async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    };
  }, [values]);

  return {
    values,
    errors,
    isSubmitting,
    setValue,
    setValues,
    setError,
    clearErrors,
    validate,
    reset,
    handleSubmit,
  };
}
