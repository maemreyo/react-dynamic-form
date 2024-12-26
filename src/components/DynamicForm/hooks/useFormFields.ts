// hooks/useFormFields.ts
import { useMemo } from 'react';
import {
  FormField,
  FormConfig,
  UseFormRegister,
  FormState,
  FieldError,
} from '../types';
import { flattenObject } from '../utils/formUtils';
import { getInputTypeFromValue } from '../utils/inputTypeMapper';
import { FieldErrorsImpl, Merge } from 'react-hook-form';

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

      // TODO: Implement nested object rendering

      return {
        label: fieldConfig.label || key,
        id: key,
        type: inputType,
        error: formState.errors?.[key] as
          | Merge<FieldError, FieldErrorsImpl>
          | undefined, // Ensure correct error type
      } as FormField; // Cast to FormField
    });
  }, [flattenedData, config, readOnly, disableForm, formState]);

  return fields;
}

export default useFormFields;
