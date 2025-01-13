// src/features/dynamic-form/utils/validationUtils.ts
import { FieldConfig, FieldError, ValidationMessages } from '../types';

/**
 * Retrieves the error message for a field based on its validation messages and error type.
 *
 * @param fieldConfig - The field configuration.
 * @param fieldError - The field error object.
 * @param values - form values
 * @param globalValidationMessages - Optional global validation messages.
 * @returns The error message string or undefined if no error message is found.
 */
export const getErrorMessage = (
  fieldConfig: FieldConfig,
  fieldError: FieldError | undefined,
  values: any,
  globalValidationMessages?: ValidationMessages
): string | undefined => {
  if (!fieldError) {
    return undefined;
  }

  const { type } = fieldError;
  const fieldValidationMessages = fieldConfig.validationMessages;

  // Merge global and field-level validation messages
  const mergedValidationMessages = {
    ...globalValidationMessages,
    ...fieldValidationMessages,
  };

  console.log(
    `[getErrorMessage] Getting error message for type: ${type}, mergedValidationMessages:`,
    mergedValidationMessages
  );

  if (mergedValidationMessages && mergedValidationMessages[type]) {
    const template = mergedValidationMessages[type];
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
