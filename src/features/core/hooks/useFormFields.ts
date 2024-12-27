import { useMemo } from 'react';
import { FormField, FormConfig, FieldError } from '../types';
import { getInputTypeFromValue } from '../../inputs/utils';
import { FormState, useFormContext } from 'react-hook-form';
import { flattenConfig } from '../utils';

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
  formState: FormState<any>
): FormField[] {
  const flattenedConfig = useMemo(() => flattenConfig(config), [config]);

  const fields = useMemo(() => {
    return Object.entries(flattenedConfig).map(([key, fieldConfig]) => {
      const inputType = fieldConfig.type || getInputTypeFromValue(data[key]);

      return {
        label: fieldConfig.label,
        id: key,
        type: inputType,
        error: formState.errors?.[key] as FieldError | undefined,
      };
    });
  }, [flattenedConfig, formState, data]);

  return fields;
}

export default useFormFields;
