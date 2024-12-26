import {
  UseFormProps,
  UseFormReturn,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { Schema } from 'yup';
import { ResponsiveProps as OriginalResponsiveProps, Layout } from 'react-grid-layout';

interface MyResponsiveProps extends OriginalResponsiveProps {
  layouts?: { [key: string]: Layout[] };
}

export type LayoutType = 'flex' | 'grid';

export interface DynamicFormProps {
  data: Record<string, any>;
  config?: FormConfig;
  onChange?: (formData: Record<string, any>) => void;
  onSubmit?: (formData: Record<string, any>) => void;
  formOptions?: UseFormProps;
  validationSchema?: Schema<any>;
  renderInput?: (
    field: InputData,
    register: UseFormRegister<any>
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
  enableReinitialize?: boolean;
  enableGrid?: boolean;
  gridConfig?: MyResponsiveProps;
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
  style?: React.CSSProperties;
  theme?: any;
  onFormReady?: (form: UseFormReturn<any>) => void;
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
  col?: number; // Cần thiết cho grid layout
}
export interface ValidationConfig {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  validate?: (value: any) => string | undefined;
}

export type InputType = 'text' | 'number' | 'checkbox' | 'select' | 'textarea';

export type UseFormRegister<TFieldValues extends FieldValues = FieldValues> = (
  name: Path<TFieldValues>,
  options?: RegisterOptions
) => UseFormRegisterReturn;

export type Path<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${Path<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : '';
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
export interface InputData {
  label?: string;
  inputProps: InputProps | null;
  id: string;
    error?: string;
}
