import {
  UseFormProps,
  UseFormReturn,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { Schema } from 'yup';

/**
 * Defines the type for the layout of the form, which can be either 'flex' or 'grid'.
 */
export type LayoutType = 'flex' | 'grid';

/**
 * Props for the DynamicForm component.
 */
export interface DynamicFormProps {
  /**
   * The initial data for the form.
   */
  data: Record<string, any>;
  /**
   * Configuration for the form fields.
   */
  config?: FormConfig;
  /**
   * Callback function triggered when the form data changes.
   */
  onChange?: (formData: Record<string, any>) => void;
  /**
   * Callback function triggered when the form is submitted.
   */
  onSubmit?: (formData: Record<string, any>) => void;
  /**
   * Options for the `react-hook-form` `useForm` hook.
   */
  formOptions?: UseFormProps;
  /**
   * Optional `yup` schema for validation.
   */
  validationSchema?: Schema<any>;
  /**
   * Function to render a custom input component.
   */
  renderInput?: (
    field: InputData,
    register: UseFormRegister<any>
  ) => React.ReactNode;

  renderSubmitButton?: (
    handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>,
    isSubmitting: boolean
  ) => React.ReactNode;
  /**
   * Component to render at the top of the form.
   */
  header?: React.ReactNode;
  /**
   * Component to render at the bottom of the form.
   */
  footer?: React.ReactNode;
  /**
   * Whether the form is in read-only mode.
   */
  readOnly?: boolean;
  /**
   * Whether the form is disabled.
   */
  disableForm?: boolean;
  /**
   * Whether to show the submit button.
   */
  showSubmitButton?: boolean;
  /**
   * Configuration for auto-save functionality.
   */
  autoSave?: {
    interval: number;
    save: (data: Record<string, any>) => void;
  };
  /**
   * Whether to reset the form after successful submission.
   */
  resetOnSubmit?: boolean;
  /**
   * Whether to focus on the first error field on submit.
   */
  focusFirstError?: boolean;
  /**
   * Whether to allow `react-hook-form` to reinitialize the form when the `data` prop changes.
   * @deprecated This prop is deprecated and will be removed in the future.
   */
  enableReinitialize?: boolean;
  /**
   * Whether to enable grid layout.
   * @deprecated This prop is deprecated and will be removed in the future.
   */
  enableGrid?: boolean;
  /**
   * Configuration for the grid layout.
   * @deprecated This prop is deprecated and will be removed in the future.
   */
  gridConfig?: any;
  /**
   * The layout type for the form.
   */
  layout?: LayoutType;
  /**
   * Detailed configuration for the layout.
   */
  layoutConfig?: any;
  /**
   * Whether to display labels horizontally.
   */
  horizontalLabel?: boolean;
  /**
   * The width of the labels.
   */
  labelWidth?: string | number;
  /**
   * Whether to save the form state to localStorage.
   */
  enableLocalStorage?: boolean;
  /**
   * The debounce time in milliseconds for the `onChange` event.
   */
  debounceOnChange?: number;
  /**
   * Whether to disable browser autocomplete.
   */
  disableAutocomplete?: boolean;
  /**
   * Whether to show validation errors inline.
   */
  showInlineError?: boolean;
  /**
   * Whether to show a summary of all validation errors.
   */
  showErrorSummary?: boolean;
  /**
   * Whether to validate inputs on blur.
   */
  validateOnBlur?: boolean;
  /**
   * Whether to validate inputs on change.
   */
  validateOnChange?: boolean;
  /**
   * Whether to validate inputs on submit.
   */
  validateOnSubmit?: boolean;
  /**
   * CSS class name for the form container.
   */
  className?: string;
  formClassNameConfig?: FormClassNameConfig;
  /**
   * Inline styles for the form container.
   */
  style?: React.CSSProperties;
  /**
   * Theme object for styling.
   */
  theme?: any;
  /**
   * Callback function triggered when the form is ready.
   */
  onFormReady?: (form: UseFormReturn<any>) => void;
  
}

/**
 * Configuration for class names of the form container.
 */
export interface FormClassNameConfig {
  formContainer?: string;
  inputWrapper?: string;
  label?: string;
  input?: string;
  button?: string;
  errorMessage?: string;
}

/**
 * Configuration for class names of a specific form field.
 */
export interface FieldClassNameConfig {
  inputWrapper?: string;
  label?: string;
  input?: string;
  errorMessage?: string;
}

/**
 * Configuration for the form fields.
 */
export interface FormConfig {
  [key: string]: FieldConfig;
}

/**
 * Configuration for a specific form field.
 */
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

/**
 * Configuration for the validation rules of a field.
 */
export interface ValidationConfig {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  validate?: (value: any) => string | undefined;
}

/**
 * Allowed input types for form fields.
 */
export type InputType = 'text' | 'number' | 'checkbox' | 'select' | 'textarea';

/**
 * Return type of the `react-hook-form` `useForm` hook's `register` function.
 */
export type UseFormRegister<TFieldValues extends FieldValues = FieldValues> = (
  name: Path<TFieldValues>,
  options?: RegisterOptions
) => UseFormRegisterReturn;

/**
 * Type for the path of a nested object.
 */
export type Path<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${Path<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : '';

/**
 * Return type of the `react-hook-form` `useForm` hook's `register` function.
 */
export type UseFormRegisterReturn = {
  onChange: (...event: any[]) => void;
  onBlur: (...event: any[]) => void;
  ref: React.Ref<any>;
  name: string;
  type?: string;
  value?: any;
  checked?: boolean;
  disabled?: boolean;
};

/**
 * Props for the input components.
 */
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

/**
 * Data for a form input.
 */
export interface InputData {
  label?: string;
  inputProps: InputProps | null;
  id: string;
  error?: string;
}

/**
 * Data for a form input group.
 * @deprecated This interface is deprecated and will be removed in the future.
 */
export interface InputGroup {
  label: string;
  id: string;
  inputs: (InputData | InputGroup)[];
}

