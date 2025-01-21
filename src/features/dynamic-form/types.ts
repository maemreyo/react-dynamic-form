import {
  UseFormProps,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
  FieldErrors as RHFFieldErrors,
} from 'react-hook-form';
import { Message, Schema } from 'yup';
import {
  FormContainerProps,
  InputWrapperProps,
  LabelProps,
} from '../../styles';
import { CommonInputProps, CustomInputProps } from '../inputs/types';
import { FormContentProps } from '../form-renderer';

// --- Layout ---

/**
 * Type alias for layout types.
 */
export type LayoutType = 'flex' | 'grid';

export type LayoutComponent = React.FC<any>;

/**
 * Type alias for the renderLayout prop in DynamicFormProps.
 */
export type RenderLayoutProps = (props: {
  children: React.ReactNode;
  className?: string;
  formClassNameConfig?: FormClassNameConfig;
  style?: React.CSSProperties;
  layout: LayoutType;
  layoutConfig?: any;
  horizontalLabel?: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => React.ReactNode;

// --- Form Config ---

/**
 * Type alias for a map of input component types to their corresponding React component types.
 */
export type InputComponentMap = {
  [key: string]: React.ComponentType<CustomInputProps>;
};

/**
 * Interface for the main DynamicForm component props.
 */
export interface DynamicFormProps {
  /** The form configuration. */
  config: FormConfig;
  /** Optional options for react-hook-form's useForm hook. */
  formOptions?: UseFormProps;
  /** Optional Yup schema for form validation. */
  validationSchema?: Schema<any>;
  /** Optional header element for the form. */
  header?: React.ReactNode;
  /** Optional footer element for the form. */
  footer?: React.ReactNode;
  /** Whether the form is read-only. */
  readOnly?: boolean;
  /** Whether the form is disabled. */
  disableForm?: boolean;
  /** Whether to show the submit button. */
  showSubmitButton?: boolean;
  /** Optional auto-save configuration. */
  autoSave?: {
    interval: number;
    save: (data: Record<string, any>) => void;
  };
  /** Optional custom validation messages. */
  validationMessages?: ValidationMessages;
  /** Whether to reset the form on submit. */
  resetOnSubmit?: boolean;
  /** Whether to focus on the first error field on submit. */
  focusFirstError?: boolean;
  /** The layout type for the form. */
  layout?: LayoutType;
  /** Optional layout configuration. */
  layoutConfig?: any;
  /** Whether to use horizontal labels. */
  horizontalLabel?: boolean;
  /** Optional label width (for horizontal labels). */
  labelWidth?: string | number;
  /** Whether to enable local storage for the form data. */
  enableLocalStorage?: boolean;
  /** Optional debounce time (in ms) for the onChange callback. */
  debounceOnChange?: number;
  /** Whether to disable autocomplete for the form. */
  disableAutocomplete?: boolean;
  /** Whether to show inline error messages. */
  showInlineError?: boolean;
  /** Whether to show an error summary. */
  showErrorSummary?: boolean;
  /** Whether to validate on blur. */
  validateOnBlur?: boolean;
  /** Whether to validate on change. */
  validateOnChange?: boolean;
  /** Whether to validate on submit. */
  validateOnSubmit?: boolean;
  /** Optional CSS class name for the form container. */
  className?: string;
  /** Optional CSS class names for form elements. */
  formClassNameConfig?: FormClassNameConfig;
  /** Optional inline styles for the form container. */
  style?: React.CSSProperties;
  /** Optional theme object. */
  theme?: any;
  /** Optional custom validators. */
  customValidators?: {
    [key: string]: (value: any, context: any) => string | undefined;
  };
  /** Optional custom input components. */
  customInputs?: InputComponentMap;
  /** Optional custom layout renderer. */
  renderLayout?: RenderLayoutProps;
  /** Optional callback function to be called when the form is ready. */
  onFormReady?: (form: UseFormReturn<any>) => void;
  /** Optional custom submit button renderer. */
  renderSubmitButton?: RenderSubmitButtonProps;
  /** Optional custom form content renderer. */
  renderFormContent?: RenderFormContentProps;
  /** Optional custom form footer renderer. */
  renderFormFooter?: RenderFormFooterProps;
  /** Optional error handler function. */
  onError?: (errors: FieldErrors) => void;
  /** Optional custom error summary renderer. */
  renderErrorSummary?: RenderErrorSummaryProps;

  /** Optional callback function to be called when the form data changes. */
  onChange?: (formData: FormValues) => void;
  /** Optional callback function to be called when the form is submitted. */
  onSubmit?: SubmitHandler<FieldValues>;
}

/**
 * Type alias for form values.
 */
export type FormValues = Record<string, any>;

/**
 * Interface for form configuration.
 */
export interface FormConfig {
  [key: string]: FieldConfig;
}

/**
 * Interface for field configuration.
 */
export interface FieldConfig {
  /** The input type. */
  type?: InputType | string;
  /** The label text. */
  label?: string;
  /** The placeholder text. */
  placeholder?: string;
  /** The validation configuration. */
  validation?: ValidationConfig;
  /** Optional custom component for the input. */
  component?: React.ComponentType<any>;
  /** Optional inline styles for the input. */
  style?: React.CSSProperties;
  /** Whether the input is read-only. */
  readOnly?: boolean;
  /** Whether the input is clearable. */
  clearable?: boolean;
  /** Whether to show a character counter for the input. */
  showCounter?: boolean;
  /** Whether to enable copy-to-clipboard functionality for the input. */
  copyToClipboard?: boolean;
  /** Optional tooltip text for the input. */
  tooltip?: string;
  /** Optional CSS class names for the input and its elements. */
  classNameConfig?: FieldClassNameConfig;
  /** Optional options for select, radio, or combobox inputs. */
  options?: { value: string; label: string }[];
  /** Optional conditional logic for the input. */
  conditional?: Condition;
  /** Nested fields (for complex inputs). */
  fields?: FormConfig;
  /** Optional custom validation messages. */
  validationMessages?: ValidationMessages;
  /** Optional default value for the input. */
  defaultValue?: any;
  /** Optional custom component for the input. */
  inputComponent?: React.ComponentType<CustomInputProps>;
  /** Optional custom props for the input. */
  inputProps?: Record<string, any>;
  /** Optional custom error message renderer. */
  renderErrorMessage?: RenderErrorMessageProps;
}

// --- Input Types ---

/**
 * Type alias for supported input types.
 */
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

// --- Validation ---

/**
 * Type alias for a custom validation function.
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
 * Type alias for a validation value, which can be either a value of type T or an object with a value and a message.
 */
export type ValidationValue<T> =
  | T
  | {
      value: T;
      message: string;
    };

/**
 * Interface for validation configuration for a field.
 */
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
 * Type alias for a custom error message template function.
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
 * Interface for validation messages for a field.
 */
export interface ValidationMessages {
  [key: string]: ErrorMessageTemplate;
}

// --- Conditional Rendering ---

/**
 * Type alias for comparison operators used in conditional rendering.
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
 * Type alias for a comparator function used in conditional rendering.
 */
export type ComparatorFunction = (value: any) => boolean;

/**
 * Interface for a condition used in conditional rendering.
 */
export interface Condition {
  /** The field to watch for changes. */
  when: string;
  /** The comparison operator to use. */
  operator: ComparisonOperator;
  /** The value to compare against. */
  value?: any;
  /** The fields to show or hide based on the condition. */
  fields: string[];
  /** Optional custom comparator function. */
  comparator?: ComparatorFunction;
}

// --- Field ---

/**
 * Interface for a form field.
 */
export interface FormField {
  label?: string;
  id: string;
  type: InputType | string;
  error?: FieldError;
}

// --- Errors ---

/**
 * Interface for a field error.
 */
export interface FieldError {
  type: string;
  message?: string;
}

/**
 * Type alias for react-hook-form field errors.
 */
export type FieldErrors = RHFFieldErrors<FieldValues>;

// --- Class Names ---

/**
 * Interface for form-level CSS class name configuration.
 */
export interface FormClassNameConfig {
  formContainer?: string;
  inputWrapper?: string;
  label?: string;
  input?: string;
  errorMessage?: string;
  button?: string;
  select?: string;
  textarea?: string;
  checkbox?: string;
  radio?: string;
  date?: string;
  number?: string;
  switch?: string;
  time?: string;
  dateTime?: string;
  comboBox?: string;
  radioGroup?: string;
  radioButton?: string;
  radioLabel?: string;
  checkboxInput?: string;
  switchContainer?: string;
  switchSlider?: string;
  numberInputContainer?: string;
  numberInputButton?: string;
  comboBoxContainer?: string;
  comboBoxDropdownList?: string;
  comboBoxDropdownItem?: string;
}

/**
 * Interface for field-level CSS class name configuration.
 */
export interface FieldClassNameConfig {
  inputWrapper?: string;
  label?: string;
  input?: string;
  errorMessage?: string;
  select?: string;
  textarea?: string;
  checkbox?: string;
  radio?: string;
  date?: string;
  number?: string;
  switch?: string;
  time?: string;
  dateTime?: string;
  comboBox?: string;
  radioGroup?: string;
  radioButton?: string;
  radioLabel?: string;
  checkboxInput?: string;
  switchContainer?: string;
  switchSlider?: string;
  numberInputContainer?: string;
  numberInputButton?: string;
  comboBoxContainer?: string;
  comboBoxDropdownList?: string;
  comboBoxDropdownItem?: string;
}

// --- Render Props ---

/**
 * Type alias for the renderSubmitButton prop in DynamicFormProps.
 */
export type RenderSubmitButtonProps = (
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>,
  isSubmitting: boolean
) => React.ReactNode;

/**
 * Type alias for the renderFormContent prop in FormRendererProps.
 */
export type RenderFormContentProps = (
  props: Omit<FormContentProps, 'renderInput'> & {
    renderInput: RenderInputProps;
  }
) => React.ReactNode;

/**
 * Type alias for the renderInput prop in FormContentProps.
 */
export type RenderInputProps = (
  field: FormField,
  fieldConfig: FieldConfig,
  commonInputProps: CommonInputProps
) => React.ReactNode;

/**
 * Type alias for the renderLabel prop in InputWrapperProps.
 */
export type RenderLabelProps = (
  fieldConfig: FieldConfig,
  commonInputProps: CommonInputProps
) => React.ReactNode;

/**
 * Type alias for the renderErrorMessage prop in InputWrapperProps.
 */
export type RenderErrorMessageProps = (
  error: FieldError | undefined,
  formClassNameConfig: FormClassNameConfig | undefined
) => React.ReactNode;

/**
 * Type alias for the renderFormFooter prop in FormRendererProps.
 */
export type RenderFormFooterProps = (props: {
  footer?: React.ReactNode;
  showSubmitButton: boolean;
  isSubmitting: boolean;
  showErrorSummary: boolean;
  errors: FieldErrors;
  formClassNameConfig?: FormClassNameConfig;
  renderSubmitButton: RenderSubmitButtonProps;
}) => React.ReactNode;

/**
 * Type alias for the renderErrorSummary prop in DynamicFormProps.
 */
export type RenderErrorSummaryProps = (
  errors: FieldErrors,
  formClassNameConfig: FormClassNameConfig | undefined
) => React.ReactNode;

// --- Re-exported types ---

export { FormContainerProps, InputWrapperProps, LabelProps };

// --- Deprecated ---
