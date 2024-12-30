// src/features/dynamic-form/types.ts
import {
  UseFormProps,
  UseFormReturn,
  FieldValues,
  RegisterOptions,
  FieldPath,
  SubmitHandler,
} from 'react-hook-form';
import { Message, Schema } from 'yup';
import {
  FormContainerProps,
  InputWrapperProps,
  LabelProps,
} from '../../styles';
import { CommonInputProps, CustomInputProps } from '../inputs/types';
import { FormContentProps } from '../form-renderer';

export type LayoutType = 'flex' | 'grid';

export type InputComponentMap = {
  [key: string]: React.ComponentType<CustomInputProps>;
};

export interface DynamicFormProps {
  config: FormConfig;
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

  customValidators?: {
    [key: string]: (value: any, context: any) => string | undefined;
  };
  customInputs?: InputComponentMap;
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

/**
 * Represents a custom validation function.
 *
 * @template TFieldValue - The type of the field value.
 * @template TFormValues - The type of the form values.
 *
 * @param value - The value of the field being validated.
 * @param formValues - The values of all fields in the form.
 * @returns - A string representing the error message if validation fails, or `undefined` if validation passes.
 */
export type CustomValidator<
  TFieldValue = any,
  TFormValues extends FieldValues = FormValues,
> = (
  value: TFieldValue,
  formValues: TFormValues
) => string | undefined | Promise<string | undefined>;

/**
 * Validation configuration for a field.
 */
export type ValidationValue<T> =
  | T
  | {
      value: T;
      message: string;
    };

export interface ValidationConfig {
  required?: ValidationValue<boolean>;
  minLength?: ValidationValue<number>;
  maxLength?: ValidationValue<number>;
  min?: ValidationValue<number | string>;
  max?: ValidationValue<number | string>;
  pattern?: ValidationValue<RegExp>;
  validate?: (
    value: any,
    formValues: FormValues
  ) => string | undefined | Promise<string | undefined>;
  requiredMessage?: string;
}

/**
 * Custom error message template
 */
export type ErrorMessageTemplate =
  | Message
  | ((values: {
      label?: string;
      value: any;
      error: FieldError;
      config: FieldConfig;
    }) => string);

/**
 * Validation messages for a field.
 */
export interface ValidationMessages {
  [key: string]: ErrorMessageTemplate;
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
  validationMessages?: ValidationMessages;
  defaultValue?: any;
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
  | 'combobox'
  | 'custom';

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
