// Filename: /src/features/core/hooks/useFormController.ts

import { useEffect } from 'react';
import {
  useForm,
  UseFormReturn,
  UseFormProps,
  FieldValues,
} from 'react-hook-form';
import { debounce, loadFromLocalStorage, saveToLocalStorage } from '../utils';
import { FormConfig, Condition } from '../types';
import { flattenConfig } from '../utils';

interface UseFormControllerProps {
  data: Record<string, any>;
  config: FormConfig;
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
    config,
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
    defaultValues: data,
  });

  const {
    formState,
    reset,
    setFocus,
    watch,
    handleSubmit,
    register,
    unregister,
  } = form;
  const { isSubmitting, isSubmitSuccessful, errors } = formState;
  const flattenedConfig = flattenConfig(config);

  // Register and unregister fields based on fieldsToRender
  useEffect(() => {
    const fieldsToRender = getFieldsToRender(config, watch, flattenedConfig);
    Object.keys(flattenedConfig).forEach(fieldId => {
      const fieldConfig = flattenedConfig[fieldId];

      if (fieldsToRender.includes(fieldId)) {
        if (fieldConfig.type !== 'repeater') {
          register(fieldId, fieldConfig.validation);
        }
      } else {
        unregister(fieldId);
      }
    });
  }, [register, unregister, flattenedConfig, watch, config]);

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

// Helper function to determine fields to render
const getFieldsToRender = (
  config: FormConfig,
  watch: <TFieldName extends string, TFieldValue>(
    name?:
      | TFieldName
      | TFieldName[]
      | readonly TFieldName[]
      | { [K in TFieldName]?: boolean }
      | undefined,
    defaultValue?: Partial<TFieldValue> | undefined
  ) => TFieldValue extends any ? any : any,
  flattenedConfig: FormConfig
): string[] => {
  const conditionalFieldsConfig = Object.keys(config)
    .filter(
      fieldId =>
        config[fieldId].conditional &&
        typeof config[fieldId].conditional?.when === 'string'
    )
    .map(fieldId => ({
      when: config[fieldId].conditional!.when,
      operator: config[fieldId].conditional!.operator || 'is',
      value: config[fieldId].conditional?.value,
      comparator: config[fieldId].conditional?.comparator,
      fields: config[fieldId].conditional!.fields || [],
    }));

  const watchedValues = watch(
    conditionalFieldsConfig.map(condition => condition.when)
  );

  const getFieldsToRenderRecursively = (
    currentConfig: FormConfig,
    parentFieldId?: string
  ): string[] => {
    let result: string[] = [];

    for (const fieldId in currentConfig) {
      const fullFieldId = parentFieldId
        ? `${parentFieldId}.${fieldId}`
        : fieldId;
      const fieldConfig = currentConfig[fieldId];

      const shouldRenderField = (fieldId: string): boolean => {
        const isConditionalField = conditionalFieldsConfig.some(condition =>
          condition.fields.includes(fieldId)
        );

        if (isConditionalField) {
          return conditionalFieldsConfig.some(condition => {
            const conditionIndex = conditionalFieldsConfig.indexOf(condition);
            const watchedValue = (watchedValues as any[])[conditionIndex];
            let conditionMet = false;

            switch (condition.operator) {
              case 'is':
                conditionMet = watchedValue === condition.value;
                break;
              case 'isNot':
                conditionMet = watchedValue !== condition.value;
                break;
              case 'greaterThan':
                conditionMet = watchedValue > condition.value;
                break;
              case 'lessThan':
                conditionMet = watchedValue < condition.value;
                break;
              case 'greaterThanOrEqual':
                conditionMet = watchedValue >= condition.value;
                break;
              case 'lessThanOrEqual':
                conditionMet = watchedValue <= condition.value;
                break;
              case 'contains':
                conditionMet =
                  typeof watchedValue === 'string' &&
                  typeof condition.value === 'string' &&
                  watchedValue.includes(condition.value);
                break;
              case 'startsWith':
                conditionMet =
                  typeof watchedValue === 'string' &&
                  typeof condition.value === 'string' &&
                  watchedValue.startsWith(condition.value);
                break;
              case 'endsWith':
                conditionMet =
                  typeof watchedValue === 'string' &&
                  typeof condition.value === 'string' &&
                  watchedValue.endsWith(condition.value);
                break;
              case 'custom':
                conditionMet = condition.comparator
                  ? condition.comparator(watchedValue)
                  : false;
                break;
              default:
                console.warn(`Unknown operator: ${condition.operator}`);
                conditionMet = false;
            }

            return condition.fields.includes(fieldId) && conditionMet;
          });
        }

        return true;
      };

      if (shouldRenderField(fieldId)) {
        result.push(fullFieldId);
      }

      if (fieldConfig.type === 'repeater' && fieldConfig.fields) {
        // Don't add nested fields here, only add the repeater field
      }
    }

    return result;
  };

  return getFieldsToRenderRecursively(config);
};

export default useFormController;
