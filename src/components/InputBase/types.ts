import { ChangeEvent, FocusEvent, ReactNode } from 'react';
import Theme, { Interpolation } from 'styled-components';

export type InputSize = 'sm' | 'md' | 'lg';
export type ValidationStatus = 'error' | 'success' | 'warning' | 'default' | '';
export type ValidationTiming = 'onBlur' | 'onChange';

export interface InputBaseProps {
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  type?: string;
  name?: string;
  id?: string;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  size?: InputSize;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLInputElement>;
  required?: boolean;
  pattern?: string;
  customValidation?: (value: string) => string | null;
  errorMessage?: ReactNode;
  successMessage?: ReactNode;
  validationStatus?: ValidationStatus;
  validationTiming?: ValidationTiming;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaInvalid?: boolean;
  ariaRequired?: boolean;
  ariaDisabled?: boolean;
  autoFocus?: boolean;
  clearButton?: boolean;
  customClearButton?: ReactNode;
  customStyles?: Interpolation<typeof Theme>;
  onClear?: () => void;
}
