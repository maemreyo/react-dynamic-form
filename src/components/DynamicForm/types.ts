// types.ts
import {
  UseFormProps,
  UseFormReturn,
  FieldValues,
  RegisterOptions,
  FieldPath,
  UseFormRegisterReturn as RHFUseFormRegisterReturn,
  FieldErrors,
  FormState as RHFFormState,
} from 'react-hook-form';
import { Schema } from 'yup';
import { FormContainerProps, InputWrapperProps, LabelProps } from './styles';

export type LayoutType = 'flex' | 'grid';

export interface DynamicFormProps {
  data: Record<string, any>;
  config?: FormConfig;
  onChange?: (formData: Record<string, any>) => void;
  onSubmit?: (formData: Record<string, any>) => void;
  formOptions?: UseFormProps;
  validationSchema?: Schema<any>;
  renderInput?: (
    field: FormField,
    register: UseFormRegister<any>
  ) => React.ReactNode;
  renderSubmitButton?: (
    handleSubmit: () => void,
    isSubmitting: boolean
  ) => React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  readOnly?: boolean;
  disableForm?: boolean;
  showSubmitButton?: boolean;
  autoSave?: {
    interval: number;
    save: (data: Record<string, any>) => void;
  };
  resetOnSubmit?: boolean;
  focusFirstError?: boolean;
  layout?: LayoutType;
  layoutConfig?: any;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  enableLocalStorage?: boolean;
  debounceOnChange?: number;
  disableAutocomplete?: boolean;
  showInlineError?: boolean;
  showErrorSummary?: boolean;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  validateOnSubmit?: boolean;
  className?: string;
  formClassNameConfig?: FormClassNameConfig;
  style?: React.CSSProperties;
  theme?: any;
  onFormReady?: (form: UseFormReturn<any>) => void;
}

export interface FormClassNameConfig {
  formContainer?: string;
  inputWrapper?: string;
  label?: string;
  input?: string;
  button?: string;
  errorMessage?: string;
}

export interface FieldClassNameConfig {
  inputWrapper?: string;
  label?: string;
  input?: string;
  errorMessage?: string;
}

export interface FormConfig {
  [key: string]: FieldConfig;
}

export interface FieldConfig {
  type?: InputType;
  label?: string;
  placeholder?: string;
  validation?: ValidationConfig;
  component?: React.ComponentType<any>;
  style?: React.CSSProperties;
  readOnly?: boolean;
  clearable?: boolean;
  showCounter?: boolean;
  copyToClipboard?: boolean;
  tooltip?: string;
  classNameConfig?: FieldClassNameConfig;
}

export interface ValidationConfig {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  validate?: (value: any) => string | undefined;
}

export type InputType =
  | 'text'
  | 'number'
  | 'checkbox'
  | 'select'
  | 'textarea'
  | 'email'
  | 'password'
  | 'tel'
  | 'url';

export type UseFormRegister<TFieldValues extends FieldValues = FieldValues> = (
  name: FieldPath<TFieldValues>,
  options?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>
) => RHFUseFormRegisterReturn;

export interface InputProps {
  type: string;
  placeholder?: string;
  name: string;
  id: string;
  readOnly?: boolean;
  disabled?: boolean;
  label?: string;
  value?: any;
}

export interface FormField {
  label?: string;
  inputProps: InputProps | null;
  id: string;
  error?: FieldError;
}

export interface FieldError {
  type: string;
  message?: string;
}

export interface UseFormRegisterReturn extends RHFUseFormRegisterReturn {}

export type FormState<TFieldValues extends FieldValues> = RHFFormState<
  TFieldValues
>;

export { FormContainerProps, InputWrapperProps, LabelProps };
