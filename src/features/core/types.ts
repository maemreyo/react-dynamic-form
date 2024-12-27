import {
  UseFormProps,
  UseFormReturn,
  FieldValues,
  RegisterOptions,
  FieldPath,
  SubmitHandler,
} from 'react-hook-form';
import { Schema } from 'yup';
import {
  FormContainerProps,
  InputWrapperProps,
  LabelProps,
} from '../../styles';
export type LayoutType = 'flex' | 'grid';

export interface DynamicFormProps {
  data: Record<string, any>;
  config?: FormConfig;
  onChange?: (formData: FormValues) => void;
  onSubmit?: SubmitHandler<FieldValues>;
  formOptions?: UseFormProps;
  validationSchema?: Schema<any>;
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
  options?: { value: string; label: string }[];
  conditional?: {
    when: string;
    is: any;
    fields: string[];
  };
  fields?: FormConfig;
}

export interface ValidationConfig {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  validate?: (value: any) => string | undefined | Promise<string | undefined>;
  min?: string | number;
  max?: string | number;
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
  | 'url'
  | 'radio'
  | 'date'
  | 'switch'
  | 'time'
  | 'datetime-local'
  | 'combobox';

export type UseFormRegister<TFieldValues extends FieldValues = FieldValues> = (
  name: FieldPath<TFieldValues>,
  options?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>
) => any;

export interface FormField {
  label?: string;
  id: string;
  type: InputType;
  error?: FieldError;
}

export interface FieldError {
  type: string;
  message?: string;
}

export type FormValues = Record<string, any>;

export { FormContainerProps, InputWrapperProps, LabelProps };