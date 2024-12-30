import { FieldConfig, FieldError } from '../types';
/**
 * Retrieves the error message for a field based on its validation messages and error type.
 *
 * @param fieldConfig - The field configuration.
 * @param fieldError - The field error object.
 * @param values - form values
 * @returns The error message string or undefined if no error message is found.
 */
export declare const getErrorMessage: (fieldConfig: FieldConfig, fieldError: FieldError | undefined, values: any) => string | undefined;
