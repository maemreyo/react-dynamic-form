// Filepath: /src/features/inputs/components/CheckboxInput.tsx

import React from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { CommonInputProps } from '../types';
import { FormValues } from '../../dynamic-form';
import { Label, InputWrapper, ErrorMessage } from '../../../styles';
import styled from 'styled-components';

const CheckboxInputStyled = styled.input<{ className?: string }>`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
  &:hover {
    border-color: ${({ theme }) => theme.colors['info-700']};
  }
  &:checked {
    background-color: ${({ theme }) => theme.colors.info};
    border-color: ${({ theme }) => theme.colors.info};
  }
  &:checked::after {
    content: '✔';
    display: block;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.small};
    line-height: 16px;
    color: ${({ theme }) => theme.colors.white};
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

const CheckboxInput: React.FC<CommonInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig = {},
  showInlineError,
  horizontalLabel,
  labelWidth,
  error,
}) => {
  const { label } = fieldConfig;
  const { control } = useFormContext<FormValues>();
  const { field } = useController({
    name: id,
    control,
    rules: fieldConfig.validation as any,
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
          <CheckboxInputStyled
            {...field}
            className={formClassNameConfig.checkboxInput}
            type="checkbox"
            id={id}
            checked={!!field.value}
          />
          {label}
        </Label>
      )}
      {showInlineError && error && (
        <ErrorMessage className={formClassNameConfig.errorMessage}>
          {error.message}
        </ErrorMessage>
      )}
    </InputWrapper>
  );
};

export default CheckboxInput;
