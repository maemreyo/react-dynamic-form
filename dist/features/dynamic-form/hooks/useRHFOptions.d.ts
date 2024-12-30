import { UseFormProps } from 'react-hook-form';
import { FormConfig, FormValues } from '../types';
declare const useRHFOptions: (config: FormConfig, formOptions: UseFormProps<FormValues> | undefined, validateOnSubmit: boolean, validateOnChange: boolean, validateOnBlur: boolean) => UseFormProps<FormValues>;
export default useRHFOptions;
