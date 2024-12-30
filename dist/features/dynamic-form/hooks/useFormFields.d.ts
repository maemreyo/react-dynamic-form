import { FormField, FormConfig, Condition, FormValues } from '../types';
import { FormState, Control } from 'react-hook-form';
/**
 * Custom hook to generate form fields from data and config.
 *
 * @param config - The form configuration.
 * @param formState - The `react-hook-form` form state.
 * @param control - The `react-hook-form` control object.
 * @returns An object containing the form fields and the fields to render.
 */
declare function useFormFields(config: FormConfig, formState: FormState<FormValues>, control: Control<FormValues>): {
    fields: FormField[];
    fieldsToRender: string[];
    conditionalFieldsConfig: Condition[];
};
export default useFormFields;
