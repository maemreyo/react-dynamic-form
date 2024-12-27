// types.ts
// src/features/core/types.ts
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
  minItems?: number;
  maxItems?: number;
  fields: FormConfig;
}

export type ValidationConfig = Record<string, any>;

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
