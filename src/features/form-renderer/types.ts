// src/features/form-renderer/types.ts
import { UseFormRegister, UseFormUnregister } from 'react-hook-form';
import {
  FormField,
  FormConfig,
  FormClassNameConfig,
  Condition,
  RenderInputProps,
  DynamicFormProps,
  FieldErrors,
  FormValues,
} from '../dynamic-form/types';

/**
 * Props for FormRenderer component.
 */
export interface FormRendererProps extends DynamicFormProps {
  fieldsToRender: string[];
  fields: FormField[];
  conditionalFieldsConfig: Condition[];
}

/**
 * Props for FormContent component.
 */
export interface FormContentProps {
  fields: FormField[];
  fieldsToRender: string[];
  config: FormConfig;
  formClassNameConfig?: FormClassNameConfig;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  disableAutocomplete?: boolean;
  showInlineError?: boolean;
  conditionalFieldsConfig: Condition[];
  renderInput?: RenderInputProps;
  register: UseFormRegister<FormValues>;
  unregister: UseFormUnregister<FormValues>;
}

/**
 * Props for FormFooter component.
 */
export interface FormFooterProps {
  footer?: React.ReactNode;
  showSubmitButton: boolean;
  renderSubmitButton?: (
    handleSubmit: () => void,
    isSubmitting: boolean
  ) => React.ReactNode;
  isSubmitting: boolean;
  showErrorSummary: boolean;
  errors: FieldErrors;
  formClassNameConfig?: FormClassNameConfig;
}
