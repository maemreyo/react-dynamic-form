import React, { useState, useEffect, useCallback } from 'react';
import { Input, Label, ErrorMessage, InputWrapper } from '../../styles';
import {
  FieldConfig,
  FieldError,
  FormClassNameConfig,
  UseFormRegisterReturn,
} from '../../types';
import styled from 'styled-components';

const NumberInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;

  input {
    text-align: center;
    padding-right: 0;
    width: 100px;
  }
`;

const SpinButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0 8px;
  height: 100%;
  font-size: 1rem;
  line-height: 0;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
  &:disabled {
    cursor: default;
    background-color: #efefef;
  }
  &:first-of-type {
    border-radius: 4px 0 0 4px;
    border-right: none;
  }

  &:last-of-type {
    border-radius: 0 4px 4px 0;
    border-left: none;
  }
`;

interface NumberInputProps {
  id: string;
  fieldConfig: FieldConfig;
  formClassNameConfig: FormClassNameConfig;
  formValues: Record<string, any>;
  disableAutocomplete?: boolean;
  showInlineError?: boolean;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  registerResult: UseFormRegisterReturn;
  error?: FieldError;
}

const NumberInput: React.FC<NumberInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig,
  formValues,
  disableAutocomplete,
  showInlineError,
  horizontalLabel,
  labelWidth,
  registerResult,
  error
}) => {
  const { label } = fieldConfig;
  const fieldClassNameConfig = fieldConfig.classNameConfig || {};
  const formClassName = formClassNameConfig || {};
  const [internalValue, setInternalValue] = useState<number>(
    formValues[id] || 0
  );

  const clampValue = useCallback(
    (value: number) => {
      const { min, max } = registerResult;
      let clampedValue = value;
      if (min !== undefined && value < +min) {
        clampedValue = +min;
      }
      if (max !== undefined && value > +max) {
        clampedValue = +max;
      }
      return clampedValue;
    },
    [registerResult]
  );

  useEffect(() => {
    setInternalValue(formValues[id] || 0);
  }, [formValues, id]);

  const handleIncrement = () => {
    const newValue = clampValue(internalValue + 1);
    setInternalValue(newValue);
    registerResult.onChange({ target: { value: newValue, name: id } } as any);
  };

  const handleDecrement = () => {
    const newValue = clampValue(internalValue - 1);
    setInternalValue(newValue);
    registerResult.onChange({ target: { value: newValue, name: id } } as any);
  };

  return (
    <InputWrapper
      $horizontalLabel={horizontalLabel}
      $labelWidth={labelWidth}
      className={
        fieldClassNameConfig.inputWrapper || formClassName.inputWrapper
      }
    >
      {label && (
        <Label
          htmlFor={id}
          $horizontalLabel={horizontalLabel}
          $labelWidth={labelWidth}
          className={fieldClassNameConfig.label || formClassName.label}
        >
          {label}
          {fieldConfig.validation?.required && (
            <span style={{ color: 'red' }}>*</span>
          )}
        </Label>
      )}
      <NumberInputContainer>
        <SpinButton
          type="button"
          onClick={handleDecrement}
          disabled={
            registerResult.min !== undefined &&
            internalValue <= +registerResult.min
          }
        >
          -
        </SpinButton>
        <Input
          {...registerResult}
          className={fieldClassNameConfig.input || formClassName.input}
          type="number"
          id={id}
          value={internalValue}
          onChange={e => {
            setInternalValue(+e.target.value);
          }}
          onBlur={e => {
            const clampedValue = clampValue(+e.target.value);
            setInternalValue(clampedValue);
            registerResult.onChange({
              target: { value: clampedValue, name: id },
            } as any);
          }}
          autoComplete={disableAutocomplete ? 'off' : undefined}
        />
        <SpinButton
          type="button"
          onClick={handleIncrement}
          disabled={
            registerResult.max !== undefined &&
            internalValue >= +registerResult.max
          }
        >
          +
        </SpinButton>
      </NumberInputContainer>
      {showInlineError && error && (
        <ErrorMessage
          className={
            fieldClassNameConfig.errorMessage || formClassName.errorMessage
          }
        >
          {error.message}
        </ErrorMessage>
      )}
    </InputWrapper>
  );
};

export default NumberInput;
