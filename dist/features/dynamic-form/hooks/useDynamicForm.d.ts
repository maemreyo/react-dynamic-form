import { UseFormReturn } from 'react-hook-form';
import { DynamicFormProps, FormValues } from '../types';
/**
 * Custom hook to manage form state and behavior.
 *
 * @param props - The hook props.
 * @returns The `react-hook-form` instance.
 */
declare const useDynamicForm: (props: DynamicFormProps) => UseFormReturn<FormValues>;
export default useDynamicForm;
