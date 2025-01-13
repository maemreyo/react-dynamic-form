import {
  FieldConfig,
  FormClassNameConfig,
  FieldError,
} from '../dynamic-form/types';

// --- Common Input Props ---

/**
 * Interface for common props shared by all input components.
 */
export interface CommonInputProps {
  /** The ID of the input. */
  id: string;
  /** The field configuration. */
  fieldConfig: FieldConfig;
  /** Optional CSS class names for form elements. */
  formClassNameConfig: FormClassNameConfig;
  /** Whether to show inline error messages. */
  showInlineError?: boolean;
  /** Whether to use a horizontal label. */
  horizontalLabel?: boolean;
  /** Optional label width (for horizontal labels). */
  labelWidth?: string | number;
  /** The field error (if any). */
  error?: FieldError;
  /** Whether to disable autocomplete for the input. */
  disableAutocomplete?: boolean;
}

// --- Custom Input Props ---

/**
 * Interface for props of custom input components.
 */
export interface CustomInputProps extends CommonInputProps {
  /** Custom props passed to the custom input component. */
  inputProps?: Record<string, any>;
}
