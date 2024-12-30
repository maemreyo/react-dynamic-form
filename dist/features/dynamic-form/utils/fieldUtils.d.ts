import { FormField, FormValues } from '../types';
import { FormState } from 'react-hook-form';
/**
 * Generates the form fields array based on the flattened config and form state.
 *
 * @param flattenedConfig - The flattened form configuration.
 * @param formState - The `react-hook-form` form state.
 * @returns The form fields array.
 */
export declare const getFields: (flattenedConfig: any, formState: FormState<FormValues>) => FormField[];
