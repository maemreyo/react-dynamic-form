// Filepath: /src/features/inputs/components/TextareaInput.tsx
import React from 'react';
import { FormValues } from '../../dynamic-form';
import { useFormContext, useController } from 'react-hook-form';
import { CommonInputProps } from '../types';
import { Label, ErrorMessage, InputWrapper } from '../../../styles';
import styled from 'styled-components';
import { useTheme } from '../../../theme/ThemeProvider';

const StyledTextarea = styled.textarea<{ className?: string }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.medium};
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
  min-height: 120px;
`;

interface TextareaInputProps extends CommonInputProps {}

const TextareaInput: React.FC<TextareaInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig = {},
  disableAutocomplete,
  showInlineError,
  horizontalLabel,
  labelWidth,
  error,
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
      <StyledTextarea
        {...field}
        className={formClassNameConfig.textarea}
        id={id}
        autoComplete={disableAutocomplete ? 'off' : undefined}
      />
      {showInlineError && error && (
        <ErrorMessage className={formClassNameConfig.errorMessage}>
          {error.message}
        </ErrorMessage>
      )}
    </InputWrapper>
  );
};

export default TextareaInput;
