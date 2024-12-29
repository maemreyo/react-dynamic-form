// src/features/dynamic-form/hooks/fieldUtils.ts
import { FormField, FormConfig, FieldError, FormValues, FieldConfig } from '../types';
import { getInputTypeFromValue } from '../../inputs/utils';
import { getErrorMessage } from './validationUtils';
import { get } from 'react-hook-form';
import { FormState } from 'react-hook-form';

/**
 * Generates the form fields array based on the flattened config and form state.
 *
 * @param flattenedConfig - The flattened form configuration.
 * @param formState - The `react-hook-form` form state.
 * @returns The form fields array.
 */
export const getFields = (
  flattenedConfig: any,
  formState: FormState<FormValues>
): FormField[] => {
  return Object.entries(flattenedConfig).map(([key, fieldConfig]) => {
    // Retrieve the default value from fieldConfig
    const defaultValue = (fieldConfig as FieldConfig).defaultValue;

    const inputType =
      (fieldConfig as FieldConfig).type || getInputTypeFromValue(defaultValue);

    const fieldError = get(formState.errors, key) as FieldError | undefined;
    const errorMessage = getErrorMessage(
      fieldConfig as FieldConfig,
      fieldError,
      {}
    );

    return {
      label: (fieldConfig as FieldConfig).label,
      id: key,
      type: inputType,
      error: errorMessage
        ? {
            ...fieldError,
            message: errorMessage,
            type: fieldError?.type || '',
          } // Merge errorMessage into fieldError and ensure type is always defined
        : fieldError, // Use the unwrapped fieldError
    };
  });
};
