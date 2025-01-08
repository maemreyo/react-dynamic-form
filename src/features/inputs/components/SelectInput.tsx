// Filepath: /src/features/inputs/components/SelectInput.tsx

import React from 'react';
import { FormValues } from '../../dynamic-form';
import { useFormContext, useController } from 'react-hook-form';
import { CommonInputProps } from '../types';
import { Label } from '../../../styles';
import styled from 'styled-components';
import { useTheme } from '../../../theme/ThemeProvider';

const StyledSelect = styled.select<{ className?: string }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px 12px;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  appearance: none;
  width: 100%;
  transition:
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  line-height: 1.5;
  outline: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath fill='%239CA3AF' d='M1.41 0L6 4.58 10.59 0 12 1.41l-6 6-6-6z'/%3E%3C/svg%3E")
    no-repeat right 12px center;
  background-size: 12px 8px;

  &:hover {
    border-color: ${({ theme }) => theme.colors['info-700']};
  }

  &:focus {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors['info-200']};
    border-color: ${({ theme }) => theme.colors.info};
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

  /* @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 300px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 400px;
  } */
`;

interface SelectInputProps extends CommonInputProps {}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig = {},
  horizontalLabel,
  labelWidth,
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
      <StyledSelect {...field} className={formClassNameConfig.select} id={id}>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </>
  );
};

export default SelectInput;
