// Filename: /src/features/core/types.ts

import {
  UseFormProps,
  UseFormReturn,
  FieldValues,
  RegisterOptions,
  FieldPath,
  SubmitHandler,
  FieldError,
  FieldErrors,
} from 'react-hook-form';
import { Schema } from 'yup';
import {
  FormContainerProps,
  InputWrapperProps,
  LabelProps,
} from '../../styles';
import {
  AddButtonComponent,
  AddButtonProps,
  RemoveButtonComponent,
  RemoveButtonProps,
} from '../repeater';

export type LayoutType = 'flex' | 'grid';

export interface DynamicFormProps {
  data: Record<string, any>;
  config?: FormConfig;
  onChange?: (formData: FieldValues) => void;
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
  } | null;
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

// FormConfig allows undefined FieldConfig
export interface FormConfig {
  [key: string]: FieldConfig | undefined;
}

export type FieldConfig =
  | InputFieldConfig
  | SelectFieldConfig
  | CheckboxFieldConfig
  | RadioFieldConfig
  | TextAreaFieldConfig
  | SwitchFieldConfig
  | DateFieldConfig
  | TimeFieldConfig
  | DateTimeFieldConfig
  | ComboBoxFieldConfig
  | RepeaterFieldConfig;

interface BaseFieldConfig {
  label?: string;
  placeholder?: string;
  validation?: ValidationConfig;
  component?: React.ComponentType<any>;
  style?: React.CSSProperties;
  readOnly?: boolean;
  classNameConfig?: FieldClassNameConfig;
  conditional?: Condition;
  fields?: FormConfig;
}

export interface InputFieldConfig extends BaseFieldConfig {
  type:
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'tel'
    | 'url'
    | 'textarea'
    | 'combobox';
  clearable?: boolean;
  showCounter?: boolean;
  copyToClipboard?: boolean;
  tooltip?: string;
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: 'select';
  options: { value: string; label: string }[];
}

export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: 'checkbox';
}
export interface NumberFieldConfig extends BaseFieldConfig {
  type: 'number';
}

export interface RadioFieldConfig extends BaseFieldConfig {
  type: 'radio';
  options: { value: string; label: string }[];
}

export interface TextAreaFieldConfig extends BaseFieldConfig {
  type: 'textarea';
  clearable?: boolean;
  showCounter?: boolean;
  tooltip?: string;
}

export interface SwitchFieldConfig extends BaseFieldConfig {
  type: 'switch';
}

export interface DateFieldConfig extends BaseFieldConfig {
  type: 'date';
}

export interface TimeFieldConfig extends BaseFieldConfig {
  type: 'time';
}

export interface DateTimeFieldConfig extends BaseFieldConfig {
  type: 'datetime-local';
}

export interface ComboBoxFieldConfig extends BaseFieldConfig {
  type: 'combobox';
  options: { value: string; label: string }[];
}

export interface RepeaterFieldConfig extends BaseFieldConfig {
  type: 'repeater';
  addButtonLabel?: string;
  removeButtonLabel?: string;
  addButtonComponent?: AddButtonComponent;
  removeButtonComponent?: RemoveButtonComponent;
  fields: FormConfig;
  validation?: {
    minItems?: number;
    maxItems?: number;
  };
}

// More specific validation config
export type ValidationConfig =
  | {
      required?: boolean | string;
      minLength?:
        | number
        | {
            value: number;
            message: string;
          };
      maxLength?:
        | number
        | {
            value: number;
            message: string;
          };
      pattern?: {
        value: RegExp;
        message: string;
      };
      min?: number | string;
      max?: number | string;
      validate?: (value: any) => Promise<string | boolean> | string | boolean;
    }
  | { [key: string]: any }; // Fallback for unknown validation rules

export type InputType = NonNullable<FieldConfig['type']>;

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
