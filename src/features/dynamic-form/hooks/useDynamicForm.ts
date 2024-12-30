// Filepath: /src/features/dynamic-form/hooks/useDynamicForm.ts
import { useEffect, useState } from 'react';
import { useForm, UseFormReturn, UseFormProps } from 'react-hook-form';
import {
  debounce,
  saveToLocalStorage,
  flattenConfig,
  loadFromLocalStorage,
} from '../utils';
import { DynamicFormProps, FormValues } from '../types';

/**
 * Custom hook to manage form state and behavior.
 *
 * @param props - The hook props.
 * @returns The `react-hook-form` instance.
 */
const useDynamicForm = (props: DynamicFormProps): UseFormReturn<FormValues> => {
  const {
    formOptions,
    autoSave,
    enableLocalStorage,
    resetOnSubmit,
    focusFirstError,
    debounceOnChange,
    onChange,
    onFormReady,
    config, // Add config prop
  } = props;

  // Flatten the config to access default values easily
  const flattenedConfig = flattenConfig(config);

  // Create defaultValues object from flattened config
  const defaultValues = Object.keys(flattenedConfig).reduce((acc, key) => {
    if (flattenedConfig[key].defaultValue !== undefined) {
      acc[key] = flattenedConfig[key].defaultValue;
    }
    return acc;
  }, {} as FormValues);

  const form = useForm<FormValues>({
    ...formOptions,
    defaultValues: defaultValues, // Set defaultValues from config
  } as UseFormProps<FormValues>);

  const { formState, reset, setFocus, watch, control } = form;
  const { isSubmitSuccessful, errors } = formState;

  const [isLocalStorageLoaded, setIsLocalStorageLoaded] = useState(false);

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

  // LocalStorage - Save data
  useEffect(() => {
    if (enableLocalStorage) {
      const subscription = watch(data => saveToLocalStorage('form-data', data));
      return () => subscription.unsubscribe();
    }
  }, [enableLocalStorage, watch]);

  // LocalStorage - Load data
  useEffect(() => {
    if (enableLocalStorage) {
      const data = loadFromLocalStorage('form-data');
      if (data) {
        reset(data);
      }
      setIsLocalStorageLoaded(true);
    }
  }, [enableLocalStorage, reset]);

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
      const debouncedOnChange = debounce(onChange, debounceOnChange || 0);
      const subscription = watch(data => debouncedOnChange(data));
      return () => subscription.unsubscribe();
    }
  }, [watch, onChange, debounceOnChange]);

  // onFormReady callback
  useEffect(() => {
    if (onFormReady) {
      onFormReady(form);
    }
  }, [form, onFormReady]);

  return { ...form, control };
};

export default useDynamicForm;
