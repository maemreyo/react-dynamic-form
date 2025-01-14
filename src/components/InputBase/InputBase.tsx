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
import Theme from '../../theme';

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
      onChange?.(event as ChangeEvent<HTMLInputElement>);
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
    <ThemeProvider theme={Theme}>
      <StyledWrapper $hasIconLeft={hasIconLeft} $hasIconRight={hasIconRight}>
        {iconLeft && (
          <IconWrapper
            $position="left"
            $validationStatus={validationStatus}
            $hasIconLeft={hasIconLeft}
            $hasIconRight={hasIconRight}
          >
            {iconLeft}
          </IconWrapper>
        )}
        <StyledInput
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          type={type}
          name={name}
          id={id}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          size={size}
          className={className}
          style={style}
          ref={inputRef}
          required={required}
          pattern={pattern}
          validationStatus={validationStatus}
          $hasIconLeft={hasIconLeft}
          $hasIconRight={hasIconRight}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          aria-invalid={
            ariaInvalid !== undefined ? ariaInvalid : !!validationStatus
          }
          aria-required={ariaRequired}
          aria-disabled={ariaDisabled}
          autoFocus={autoFocus}
          customStyles={customStyles}
        />
        {(iconRight || clearButton || loading) && (
          <IconWrapper
            $position="right"
            $validationStatus={validationStatus}
            $hasIconLeft={hasIconLeft}
            $hasIconRight={hasIconRight}
          >
            {loading ? (
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3ZM5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12Z"
                  fill="currentColor"
                />
                <path
                  d="M11 1V3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 1V3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : clearButton && value ? (
              customClearButton ? (
                <span onClick={handleClear}>{customClearButton}</span>
              ) : (
                <ClearButton onClick={handleClear}>
                  {/* Replace with your own icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </ClearButton>
              )
            ) : (
              iconRight
            )}
          </IconWrapper>
        )}
      </StyledWrapper>
      {errorMessage && <Message>{errorMessage}</Message>}
    </ThemeProvider>
  );
};

export default InputBase;
