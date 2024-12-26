import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils';

/**
 * Custom hook for managing form state in localStorage.
 *
 * @param enableLocalStorage - Whether to enable localStorage.
 * @param form - The `react-hook-form` form object.
 * @param data - The initial data for the form.
 */
const useLocalStorage = (
  enableLocalStorage: boolean,
  form: UseFormReturn<any>,
  data: any
) => {
  const { reset, watch } = form;

  useEffect(() => {
    const subscription = watch(value => {
      if (enableLocalStorage) {
        saveToLocalStorage('dynamic-form-data', value);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, enableLocalStorage]);

  useEffect(() => {
    if (enableLocalStorage) {
      const storedData = loadFromLocalStorage('dynamic-form-data');
      if (storedData) {
        reset(storedData);
      }
    }
  }, [enableLocalStorage, reset, data]);
};

export default useLocalStorage;
