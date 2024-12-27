// src/features/core/hooks/useFormFields.ts
import { useMemo } from 'react';
import {
  FormField,
  FormConfig,
  UseFormRegister,
  FieldError,
} from '../types';
import { flattenObject } from '../utils';
import { getInputTypeFromValue } from '../../inputs/utils';
import { FormState } from 'react-hook-form';

/**
 * Custom hook to generate form fields from data and config.
 *
 * @param data - The form data.
 * @param config - The form configuration.
 * @param register - The `react-hook-form` register function.
 * @param readOnly - Whether the form is read-only.
 * @param disableForm - Whether the form is disabled.
 * @param formState - The `react-hook-form` form state.
 * @returns An array of form fields.
 */
function useFormFields(
  data: Record<string, any>,
  config: FormConfig,
  register: UseFormRegister<any>,
  readOnly: boolean,
  disableForm: boolean,
  formState: FormState<any>
): FormField[] {
  const flattenedData = useMemo(() => flattenObject(data), [data]);

  const fields = useMemo(() => {
    return Object.entries(flattenedData).map(([key, value]) => {
      const fieldConfig = config[key] || {};
      const inputType = fieldConfig.type || getInputTypeFromValue(value);

      return {
        label: fieldConfig.label || key,
        id: key,
        type: inputType,
        error: formState.errors?.[key] as FieldError | undefined,
      };
    });
  }, [flattenedData, config, readOnly, disableForm, formState]);

  return fields;
}

export default useFormFields;
