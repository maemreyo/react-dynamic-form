// Filepath: /src/features/inputs/components/SelectInput.tsx

import React from 'react';
import { FormValues } from '../../dynamic-form';
import { useFormContext, useController } from 'react-hook-form';
import { CommonInputProps } from '../types';
import { Label, ErrorMessage, InputWrapper } from '../../../styles';
import styled from 'styled-components';
import { useTheme } from '../../../theme/ThemeProvider';

const StyledSelect = styled.select<{ className?: string }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  appearance: auto; /* Reset default styles */
  width: 100%; /* Set default width to 100% */
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out; /* Add transition */
  line-height: 1.5;
  &:hover {
    border-color: ${({ theme }) =>
      theme.colors['info-700']}; /* Change border color on hover */
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.info};
    border-color: ${({ theme }) =>
      theme.colors.info}; /* Change border color on focus */
  }
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.7;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
  }
  /* Add responsive styles using media queries */
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 300px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 400px;
  }
`;

interface SelectInputProps extends CommonInputProps {}

const SelectInput: React.FC<SelectInputProps> = ({
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
          htmlFor={id}
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
      <StyledSelect {...field} className={formClassNameConfig.select} id={id}>
        {options?.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      {showInlineError && error && (
        <ErrorMessage className={formClassNameConfig.errorMessage}>
          {error.message}
        </ErrorMessage>
      )}
    </InputWrapper>
  );
};

export default SelectInput;
