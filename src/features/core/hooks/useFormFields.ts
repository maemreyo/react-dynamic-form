// Filepath: /src/features/core/hooks/useFormFields.ts
import { useMemo } from 'react';
import { FormField, FormConfig, FieldError } from '../types';
import { getInputTypeFromValue } from '../../inputs/utils';
import { FormState } from 'react-hook-form';
import { flattenConfig } from '../utils';

/**
 * Custom hook to generate form fields from data and config.
 * This hook now focuses solely on determining which fields to render
 * and preparing the field data for rendering.
 *
 * @param data - The form data.
 * @param config - The form configuration.
 * @param formState - The `react-hook-form` form state.
 * @returns An object containing the form fields and the fields to render.
 */
function useFormFields(
  data: Record<string, any>,
  config: FormConfig,
  formState: FormState<any>
): {
  fields: FormField[];
  flattenedConfig: FormConfig;
} {
  const flattenedConfig = flattenConfig(config)

  const fields = Object.entries(flattenedConfig).map(([key, fieldConfig]) => {
    const inputType = fieldConfig!.type || getInputTypeFromValue(data[key]);

    return {
      label: fieldConfig!.label,
      id: key,
      type: inputType,
      error: formState.errors?.[key] as FieldError | undefined,
    };
  });

  return { fields, flattenedConfig };
}

export default useFormFields;
