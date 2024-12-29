// src/features/dynamic-form/hooks/validationUtils.ts
import { FieldConfig, FieldError } from '../types';

/**
 * Retrieves the error message for a field based on its validation messages and error type.
 *
 * @param fieldConfig - The field configuration.
 * @param fieldError - The field error object.
 * @param values - form values
 * @returns The error message string or undefined if no error message is found.
 */
export const getErrorMessage = (
  fieldConfig: FieldConfig,
  fieldError: FieldError | undefined,
  values: any
): string | undefined => {
  if (!fieldError) {
    return undefined;
  }

  const { type } = fieldError;
  const validationMessages = fieldConfig.validationMessages;

  if (validationMessages && validationMessages[type]) {
    const template = validationMessages[type];
    return typeof template === 'function'
      ? (template({
          ...values,
          error: fieldError,
          config: fieldConfig,
        }) as string)
      : (template as string);
  }

  return fieldError.message;
};
