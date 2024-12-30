// src/features/inputs/components/NumberInput.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Input, Label, ErrorMessage, InputWrapper } from '../../../styles';
import { FormValues } from '../../dynamic-form';
import styled from 'styled-components';
import { useFormContext, useController } from 'react-hook-form';
import { CommonInputProps } from '../types';

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
interface NumberInputProps extends CommonInputProps {}

const NumberInput: React.FC<NumberInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig,
  disableAutocomplete,
  showInlineError,
  horizontalLabel,
  labelWidth,
  error,
}) => {
  const { label } = fieldConfig;
  const fieldClassNameConfig = fieldConfig.classNameConfig || {};
  const formClassName = formClassNameConfig || {};
  const { control } = useFormContext<FormValues>();
  const { field } = useController({
    name: id,
    control,
    rules: fieldConfig.validation,
    defaultValue: fieldConfig.defaultValue,
  });
  const [internalValue, setInternalValue] = useState<number>(+field.value || 0);

  const clampValue = useCallback(
    (value: number) => {
      const { min, max } = fieldConfig.validation || {};
      let clampedValue = value;
      if (min !== undefined && typeof min === 'object' && value < +min.value) {
        clampedValue = +min.value;
      }
      if (max !== undefined && typeof max === 'object' && value > +max.value) {
        clampedValue = +max.value;
      }
      return clampedValue;
    },
    [fieldConfig.validation]
  );

  useEffect(() => {
    setInternalValue(+field.value || 0);
  }, [field.value]);

  const handleIncrement = () => {
    const newValue = clampValue(internalValue + 1);
    setInternalValue(newValue);
    field.onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = clampValue(internalValue - 1);
    setInternalValue(newValue);
    field.onChange(newValue);
  };

  return (
    <InputWrapper
      $horizontalLabel={horizontalLabel}
      $labelWidth={labelWidth}
      className={
        fieldClassNameConfig.inputWrapper || formClassName.inputWrapper
      }
    >
      {/* Render label here */}
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
            fieldConfig.validation?.min !== undefined &&
            typeof fieldConfig.validation.min === 'object' &&
            internalValue <= +fieldConfig.validation.min.value
          }
        >
          -
        </SpinButton>
        <Input
          {...field}
          className={fieldClassNameConfig.input || formClassName.input}
          type="number"
          id={id}
          onChange={(e) => {
            field.onChange(e);
            setInternalValue(+e.target.value);
          }}
          onBlur={(e) => {
            field.onBlur();
            const clampedValue = clampValue(+e.target.value);
            setInternalValue(clampedValue);
            field.onChange(clampedValue);
          }}
          value={internalValue}
          autoComplete={disableAutocomplete ? 'off' : undefined}
        />
        <SpinButton
          type="button"
          onClick={handleIncrement}
          disabled={
            fieldConfig.validation?.max !== undefined &&
            typeof fieldConfig.validation.max === 'object' &&
            internalValue >= +fieldConfig.validation.max.value
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
