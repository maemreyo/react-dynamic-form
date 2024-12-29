// src/features/inputs/types.ts
import {
  FieldConfig,
  FormClassNameConfig,
  FieldError,
} from '../dynamic-form/types';
/**
 * Common props for all input components.
 */
export interface CommonInputProps {
  id: string;
  fieldConfig: FieldConfig;
  formClassNameConfig?: FormClassNameConfig;
  showInlineError?: boolean;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  error?: FieldError;
  disableAutocomplete?: boolean;
}