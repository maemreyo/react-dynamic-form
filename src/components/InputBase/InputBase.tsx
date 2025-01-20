import React, {
  ChangeEvent,
  FocusEvent,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { InputBaseProps, ValidationStatus } from './types';
import {
  StyledInput,
  Message,
  IconWrapper,
  StyledWrapper,
  ClearButton,
} from './styled';
import { ThemeProvider } from 'styled-components';
import { Loader, X } from 'lucide-react';
import theme from '../../theme';

const InputBase: React.FC<InputBaseProps> = ({
  value: propValue,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  disabled,
  readOnly,
  type = 'text',
  name,
  id,
  autoComplete,
  maxLength,
  minLength,
  size = 'md',
  className,
  style,
  required,
  pattern,
  customValidation,
  errorMessage: customErrorMessage,
  successMessage,
  validationStatus: externalValidationStatus,
  validationTiming = 'onBlur',
  loading,
  iconLeft,
  iconRight,
  ariaLabel,
  ariaDescribedBy,
  ariaInvalid,
  ariaRequired,
  ariaDisabled,
  autoFocus,
  clearButton,
  customClearButton,
  customStyles,
  onClear,
}) => {
  const [internalValue, setInternalValue] = useState<string>(
    defaultValue || propValue || ''
  );
  const [isFocused, setIsFocused] = useState(false);
  const [internalValidationStatus, setInternalValidationStatus] =
    useState<ValidationStatus>('');
  const [errorMessage, setErrorMessage] = useState<React.ReactNode>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasIconLeft = !!iconLeft;
  const hasIconRight = !!iconRight || clearButton || loading;

  // Determine the current value to use
  const value = propValue !== undefined ? propValue : internalValue;

  // Handle validation logic
  const validateInput = useCallback(
    (inputValue: string) => {
      let status: ValidationStatus = '';
      let errorMsg: React.ReactNode = null;

      if (required && !inputValue) {
        status = 'error';
        errorMsg = customErrorMessage || 'This field is required.';
      } else if (pattern && !new RegExp(pattern).test(inputValue)) {
        status = 'error';
        errorMsg = customErrorMessage || 'Invalid format.';
      } else if (
        customValidation &&
        (errorMsg = customValidation(inputValue))
      ) {
        status = 'error';
      } else if (inputValue && successMessage && !errorMsg) {
        status = 'success';
      }

      setInternalValidationStatus(status);
      setErrorMessage(errorMsg);
      return status;
    },
    [required, pattern, customValidation, customErrorMessage, successMessage]
  );

  // Handle changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInternalValue(inputValue);

    if (validationTiming === 'onChange') {
      validateInput(inputValue);
    }

    onChange?.(e);
  };

  // Handle focus
  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  // Handle blur
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (validationTiming === 'onBlur') {
      validateInput(value);
    }
    onBlur?.(e);
  };

  const validationStatus = externalValidationStatus || internalValidationStatus;
  const handleClear = () => {
    const event = new Event('input', { bubbles: true });
    inputRef.current?.dispatchEvent(event);
    // Dispatch an additional 'change' event for better compatibility
    const changeEvent = new Event('change', { bubbles: true });
    inputRef.current?.dispatchEvent(changeEvent);
    if (propValue !== undefined) {
      onChange?.(event as unknown as ChangeEvent<HTMLInputElement>);
    } else {
      setInternalValue('');
    }
    setInternalValidationStatus('');
    setErrorMessage(null);
    onClear?.();
  };
  useEffect(() => {
    // Perform validation on mount if validationTiming is 'onChange'
    // Or if there's an external validation status
    if (validationTiming === 'onChange' || externalValidationStatus) {
      validateInput(value);
    }
  }, [
    value,
    validationTiming,
    externalValidationStatus,
    validateInput,
    required,
    pattern,
    customValidation,
  ]); // Include dependencies

  return (
    <ThemeProvider theme={theme}>
      {errorMessage && <Message>{errorMessage}</Message>}
    </ThemeProvider>
  );
};

export default InputBase;
