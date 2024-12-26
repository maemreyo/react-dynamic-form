import { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

/**
 * Custom hook for generating an error summary.
 *
 * @param showErrorSummary - Whether to show the error summary.
 * @param form - The `react-hook-form` form object.
 * @returns The error summary as an array of strings.
 */
const useErrorSummary = (
  showErrorSummary: boolean,
  form: UseFormReturn<any>
) => {
  const [errorSummary, setErrorSummary] = useState<string[]>([]);
  const {
    formState: { errors },
  } = form;

  useEffect(() => {
    if (showErrorSummary && Object.keys(errors).length > 0) {
      const summary = Object.entries(errors).map(([, error]) => error?.message);
      setErrorSummary(summary as string[]);
    } else {
      setErrorSummary([]);
    }
  }, [errors, showErrorSummary]);

  return errorSummary;
};

export default useErrorSummary;
