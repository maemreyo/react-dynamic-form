// src/features/dynamic-form/types.ts
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
import { CommonInputProps } from '../inputs/types';
import { FormContentProps } from '../form-renderer/components/FormContent';

export type LayoutType = 'flex' | 'grid';

export interface DynamicFormProps {
  data: Record<string, any>;
  config?: FormConfig;
  onChange?: (formData: FormValues) => void;
  onSubmit?: SubmitHandler<FieldValues>;
  formOptions?: UseFormProps;
  validationSchema?: Schema<any>;
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

  renderSubmitButton?: RenderSubmitButtonProps;
  renderFormContent?: RenderFormContentProps;
  renderFormFooter?: RenderFormFooterProps;
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
  conditional?: Condition;
  fields?: FormConfig;
}

export type ValidationConfig = Record<string, any>;

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

/**
 * Represents a comparison operator used in conditional rendering.
 */
export type ComparisonOperator =
  | 'is'
  | 'isNot'
  | 'greaterThan'
  | 'lessThan'
  | 'greaterThanOrEqual'
  | 'lessThanOrEqual'
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'custom';

/**
 * Represents a function that takes a value and returns a boolean indicating whether the condition is met.
 */
export type ComparatorFunction = (value: any) => boolean;

/**
 * Represents a condition for conditional rendering.
 */
export interface Condition {
  when: string;
  operator: ComparisonOperator;
  value?: any;
  comparator?: ComparatorFunction;
  fields: string[];
}

// --- Render Props Types ---
/**
 * Props for renderSubmitButton in DynamicFormProps.
 */
export type RenderSubmitButtonProps = (
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>,
  isSubmitting: boolean
) => React.ReactNode;

/**
 * Props for renderFormContent in FormRendererProps.
 */
export type RenderFormContentProps = (
  props: Omit<FormContentProps, 'renderInput'> & {
    renderInput: RenderInputProps;
  }
) => React.ReactNode;

/**
 * Props for renderInput in FormContentProps.
 */
export type RenderInputProps = (
  field: FormField,
  fieldConfig: FieldConfig,
  commonInputProps: CommonInputProps
) => React.ReactNode;

/**
 * Props for renderLabel in InputWrapperProps.
 */
export type RenderLabelProps = (
  fieldConfig: FieldConfig,
  commonInputProps: CommonInputProps
) => React.ReactNode;

/**
 * Props for renderErrorMessage in InputWrapperProps.
 */
export type RenderErrorMessageProps = (
  error: FieldError | undefined,
  formClassNameConfig: FormClassNameConfig | undefined
) => React.ReactNode;

/**
 * Type for field errors.
 */
export type FieldErrors = Partial<Record<string, FieldError>>;

/**
 * Props for renderFormFooter in FormRendererProps.
 */
export type RenderFormFooterProps = (props: {
  footer?: React.ReactNode;
  showSubmitButton: boolean;
  renderSubmitButton: RenderSubmitButtonProps;
  isSubmitting: boolean;
  showErrorSummary: boolean;
  errors: FieldErrors;
  formClassNameConfig?: FormClassNameConfig;
}) => React.ReactNode;

/**
 * Extended DynamicFormProps with render props.
 */
