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
      const validationConfig = fieldConfig.validation;

      const inputProps: FormField['inputProps'] = {
        type: inputType,
        name: key,
        id: key,
        placeholder: fieldConfig.placeholder,
        readOnly:
          fieldConfig.readOnly !== undefined ? fieldConfig.readOnly : readOnly,
        disabled: disableForm,
      };

      const registerProps: any = {};
      if (validationConfig) {
        if (validationConfig.required) {
          registerProps.required =
            typeof validationConfig.required === 'string'
              ? validationConfig.required
              : 'This field is required';
        }
        if (validationConfig.minLength) {
          registerProps.minLength =
            typeof validationConfig.minLength === 'number'
              ? {
                  value: validationConfig.minLength,
                  message: `Minimum length is ${validationConfig.minLength}`,
                }
              : validationConfig.minLength;
        }
        if (validationConfig.maxLength) {
          registerProps.maxLength =
            typeof validationConfig.maxLength === 'number'
              ? {
                  value: validationConfig.maxLength,
                  message: `Maximum length is ${validationConfig.maxLength}`,
                }
              : validationConfig.maxLength;
        }
        if (validationConfig.pattern) {
          registerProps.pattern =
            validationConfig.pattern instanceof RegExp
              ? {
                  value: validationConfig.pattern,
                  message: 'Invalid format',
                }
              : validationConfig.pattern;
        }
        if (validationConfig.validate) {
          registerProps.validate = validationConfig.validate;
        }
      }

      // TODO: Implement nested object rendering

      return {
        label: fieldConfig.label || key,
        inputProps: { ...inputProps, ...register(key, registerProps) },
        id: key,
        error: formState.errors?.[key] as
          | Merge<FieldError, FieldErrorsImpl>
          | undefined, // Changed: Ensure correct error type
      } as FormField; // Added: Cast to FormField
    });
  }, [flattenedData, config, register, readOnly, disableForm, formState]);

  return fields;
}

export default useFormFields;
