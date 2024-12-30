// src/features/form-renderer/types.ts
import {
  FormField,
  FormConfig,
  FormClassNameConfig,
  Condition,
  RenderInputProps,
  DynamicFormProps,
  FieldErrors,
  FormContainerProps,
  LayoutType,
  RenderSubmitButtonProps,
  RenderFormFooterProps,
  RenderFormContentProps,
} from '../dynamic-form/types';
import { GridFormContainerProps } from '../../styles';

// --- Form Renderer ---

/**
 * Props for FormRenderer component.
 */
export interface FormRendererProps
  extends Omit<DynamicFormProps, 'renderLayout' | 'onError'> {
  fieldsToRender: string[];
  /** List of form fields. */
  fields: FormField[];
  /** Configuration for conditional fields. */
  conditionalFieldsConfig: Condition[];
  /** Optional custom renderer for the form content. */
  renderFormContent?: RenderFormContentProps;
  /** Optional custom renderer for the form footer. */
  renderFormFooter?: RenderFormFooterProps;
}

// --- Form Content ---

/**
 * Props for the FormContent component.
 */
export interface FormContentProps {
  /** List of form fields. */
  fields: FormField[];
  /** List of field IDs to render. */
  fieldsToRender: string[];
  /** The form configuration. */
  config: FormConfig;
  /** Optional CSS class names for form elements. */
  formClassNameConfig?: FormClassNameConfig;
  /** Whether to use horizontal labels. */
  horizontalLabel?: boolean;
  /** Optional label width (for horizontal labels). */
  labelWidth?: string | number;
  /** Whether to disable autocomplete. */
  disableAutocomplete?: boolean;
  /** Whether to show inline error messages. */
  showInlineError?: boolean;
  /** Configuration for conditional fields. */
  conditionalFieldsConfig: Condition[];
  /** Optional custom input renderer. */
  renderInput?: RenderInputProps;
  /** form values */
  customInputs?: {
    [key: string]: React.ComponentType<any>;
  };
}

// --- Form Footer ---

/**
 * Props for the FormFooter component.
 */
export interface FormFooterProps {
  /** Optional footer element. */
  footer?: React.ReactNode;
  /** Whether to show the submit button. */
  showSubmitButton: boolean;
  /** Optional custom submit button renderer. */
  renderSubmitButton?: RenderSubmitButtonProps;
  /** Whether the form is currently submitting. */
  isSubmitting: boolean;
  /** Whether to show an error summary. */
  showErrorSummary: boolean;
  /** Field errors. */
  errors: FieldErrors;
  /** Optional CSS class names for form elements. */
  formClassNameConfig?: FormClassNameConfig;
}

// --- Form Layout ---

/**
 * Type alias for props of the layout component (either FormContainer or GridFormContainer).
 */
export type LayoutComponentProps = FormContainerProps &
  Partial<Omit<GridFormContainerProps, keyof FormContainerProps>>;

/**
 * Props for the FormLayout component.
 */
export interface FormLayoutProps {
  /** Submit handler function. */
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  /** Child elements to render inside the form. */
  children: React.ReactNode;
  /** Optional theme object. */
  theme?: any;
  /** Optional CSS class name for the form. */
  className?: string;
  /** Optional CSS class names for form elements. */
  formClassNameConfig?: FormClassNameConfig;
  /** Optional inline styles for the form. */
  style?: React.CSSProperties;
  /** The layout type for the form. */
  layout: LayoutType;
  /** Optional layout configuration. */
  layoutConfig?: any;
  /** Whether to use horizontal labels. */
  horizontalLabel?: boolean;
}
