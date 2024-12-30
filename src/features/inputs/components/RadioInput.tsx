// Filepath: /src/features/inputs/components/RadioInput.tsx

import React from 'react';
import { FormValues } from '../../dynamic-form';
import { useFormContext, useController } from 'react-hook-form';
import { CommonInputProps } from '../types';
import { Label, InputWrapper, ErrorMessage } from '../../../styles';
import styled from 'styled-components';
import { useTheme } from '../../../theme/ThemeProvider';

const RadioGroup = styled.div<{ className?: string }>`
  display: flex;
  gap: 16px;
`;

const RadioLabel = styled.label<{ className?: string }>`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const RadioInputStyled = styled.input<{ className?: string }>`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
  position: relative;

  &:hover {
    border-color: ${({ theme }) => theme.colors['info-700']};
  }

  &:checked {
    background-color: ${({ theme }) => theme.colors.info};
    border-color: ${({ theme }) => theme.colors.info};
  }

  &:checked::after {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.info};
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

interface RadioInputProps extends CommonInputProps {}

const RadioInput: React.FC<RadioInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig = {},
  showInlineError,
  horizontalLabel,
  labelWidth,
  error,
}) => {
  const theme = useTheme();
  const { label, options } = fieldConfig;
  const { control } = useFormContext<FormValues>();
  const { field } = useController({
    name: id,
    control,
    rules: fieldConfig.validation,
    defaultValue: fieldConfig.defaultValue,
  });
  return (
    <InputWrapper
      $horizontalLabel={horizontalLabel}
      $labelWidth={labelWidth}
      className={formClassNameConfig.inputWrapper}
    >
      {label && (
        <Label
          $horizontalLabel={horizontalLabel}
          $labelWidth={labelWidth}
          className={formClassNameConfig.label}
        >
          {label}
          {fieldConfig.validation?.required && (
            <span style={{ color: theme.colors.danger }}>*</span>
          )}
        </Label>
      )}
      <RadioGroup className={formClassNameConfig.radioGroup}>
        {options?.map(option => (
          <RadioLabel
            key={option.value}
            htmlFor={`${id}-${option.value}`}
            className={formClassNameConfig.radioLabel}
          >
            <RadioInputStyled
              {...field}
              type="radio"
              id={`${id}-${option.value}`}
              name={id}
              value={option.value}
              checked={field.value === option.value}
              className={formClassNameConfig.radioButton}
            />
            {option.label}
          </RadioLabel>
        ))}
      </RadioGroup>
      {showInlineError && error && (
        <ErrorMessage className={formClassNameConfig.errorMessage}>
          {error.message}
        </ErrorMessage>
      )}
    </InputWrapper>
  );
};

export default RadioInput;
