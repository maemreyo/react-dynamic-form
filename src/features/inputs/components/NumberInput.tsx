// Filepath: /src/features/inputs/components/NumberInput.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { FormValues } from '../../dynamic-form';
import { useFormContext, useController } from 'react-hook-form';
import { CommonInputProps } from '../types';
import { Input, Label } from '../../../styles';
import styled from 'styled-components';
import { useTheme } from '../../../theme/ThemeProvider';

const NumberInputContainer = styled.div<{ className?: string }>`
  display: flex;
  align-items: center;
  width: fit-content;
  input {
    text-align: center;
    width: 65px;
  }
`;

const SpinButton = styled.button<{ className?: string }>`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0;
  height: 32px;
  width: 32px;
  font-size: 18px;
  line-height: 0;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${({ theme }) => theme.colors['light-500']};
  }
  &:disabled {
    cursor: default;
    background-color: #efefef;
  }
  &:first-of-type {
    border-radius: 8px 0 0 8px;
    border-right: none;
  }
  &:last-of-type {
    border-radius: 0 8px 8px 0;
    border-left: none;
  }
`;

interface NumberInputProps extends CommonInputProps {}

const NumberInput: React.FC<NumberInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig = {},
  disableAutocomplete,
  horizontalLabel,
  labelWidth,
}) => {
  const theme = useTheme();
  const { label } = fieldConfig;
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
    <>
      {label && (
        <Label
          htmlFor={id}
          $horizontalLabel={horizontalLabel}
          $labelWidth={labelWidth}
          className={formClassNameConfig.label}
        >
          {label}&nbsp;
          {fieldConfig.validation?.required && (
            <span style={{ color: theme.colors.danger }}>*</span>
          )}
        </Label>
      )}
      <NumberInputContainer
        className={formClassNameConfig.numberInputContainer}
      >
        <SpinButton
          type="button"
          onClick={handleDecrement}
          className={formClassNameConfig.numberInputButton}
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
          className={formClassNameConfig.number}
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
          className={formClassNameConfig.numberInputButton}
          disabled={
            fieldConfig.validation?.max !== undefined &&
            typeof fieldConfig.validation.max === 'object' &&
            internalValue >= +fieldConfig.validation.max.value
          }
        >
          +
        </SpinButton>
      </NumberInputContainer>
    </>
  );
};

export default NumberInput;
