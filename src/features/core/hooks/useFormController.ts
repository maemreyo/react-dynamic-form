// hooks/useFormController.ts
import { useEffect } from 'react';
import { useForm, UseFormReturn, UseFormProps } from 'react-hook-form';
import { debounce, loadFromLocalStorage, saveToLocalStorage } from '../utils';

interface UseFormControllerProps {
  data: Record<string, any>;
  mergedFormOptions: UseFormProps;
  autoSave: {
    interval: number;
    save: (data: Record<string, any>) => void;
  } | null;
  enableLocalStorage: boolean;
  resetOnSubmit: boolean;
  focusFirstError: boolean;
  debounceOnChange: number;
  onChange?: (formData: Record<string, any>) => void;
  onFormReady?: (form: UseFormReturn<any>) => void;
}

/**
 * Custom hook to manage form state and behavior.
 *
 * @param props - The hook props.
 * @returns The `react-hook-form` instance.
 */
const useFormController = (
  props: UseFormControllerProps
): UseFormReturn<any> => {
  const {
    data,
    mergedFormOptions,
    autoSave,
    enableLocalStorage,
    resetOnSubmit,
    focusFirstError,
    debounceOnChange,
    onChange,
    onFormReady,
  } = props;

  const form = useForm({
    ...mergedFormOptions,
    defaultValues: enableLocalStorage
      ? loadFromLocalStorage('form-data') || data
      : data,
  });

  const { formState, reset, setFocus, watch, handleSubmit } = form;
  const { isSubmitting, isSubmitSuccessful, errors } = formState;

  // Auto-save
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (autoSave) {
      intervalId = setInterval(() => {
        autoSave.save(watch());
      }, autoSave.interval);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoSave, watch]);

  // LocalStorage
  useEffect(() => {
    if (enableLocalStorage) {
      const subscription = watch(data => saveToLocalStorage('form-data', data));
      return () => subscription.unsubscribe();
    }
  }, [enableLocalStorage, watch]);

  // Reset on submit
  useEffect(() => {
    if (resetOnSubmit && isSubmitSuccessful) {
      reset();
    }
  }, [resetOnSubmit, isSubmitSuccessful, reset]);

  // Focus first error
  useEffect(() => {
    if (focusFirstError) {
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        setFocus(firstErrorKey);
      }
    }
  }, [errors, focusFirstError, setFocus]);

  // Debounce on change
  useEffect(() => {
    if (onChange) {
      const debounced = debounce(onChange, debounceOnChange);
      const subscription = watch(data => debounced(data));
      return () => subscription.unsubscribe();
    }
  }, [watch, onChange, debounceOnChange]);

  // onFormReady callback
  useEffect(() => {
    if (onFormReady) {
      onFormReady(form);
    }
  }, [form, onFormReady]);

  return form;
};

export default useFormController;
