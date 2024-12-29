// src/features/dynamic-form/hooks/useDynamicForm.ts
import { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { debounce, saveToLocalStorage } from '../utils';
import { DynamicFormProps } from '../types';

/**
 * Custom hook to manage form state and behavior.
 *
 * @param props - The hook props.
 * @returns The `react-hook-form` instance.
 */
const useDynamicForm = (props: DynamicFormProps): UseFormReturn<any> => {
  const {
    data,
    formOptions,
    autoSave,
    enableLocalStorage,
    resetOnSubmit,
    focusFirstError,
    debounceOnChange,
    onChange,
    onFormReady,
  } = props;

  const form = useForm({
    ...formOptions,
    defaultValues: data,
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

export default useDynamicForm;
