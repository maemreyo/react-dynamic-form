// Filename: /src/features/inputs/components/TextareaInput.tsx

import React from 'react';
import { Label, ErrorMessage, InputWrapper } from '../../../styles';
import {
  FieldConfig,
  FormClassNameConfig,
  FieldError,
  TextAreaFieldConfig,
} from '../../core/types';
import styled from 'styled-components';
import { useFormContext, useController } from 'react-hook-form';

const StyledTextarea = styled.textarea`
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.medium};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
  }
  width: 100%;
  min-height: 100px;
`;
interface TextareaInputProps {
  id: string;
  fieldConfig: TextAreaFieldConfig;
  formClassNameConfig?: FormClassNameConfig;
  disableAutocomplete?: boolean;
  showInlineError?: boolean;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  error?: FieldError;
}

const TextareaInput: React.FC<TextareaInputProps> = ({
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
  const { control } = useFormContext();
  const { field } = useController({
    name: id,
    control,
    rules: fieldConfig.validation,
    defaultValue: '',
  });

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
      <StyledTextarea
        {...field}
        className={fieldClassNameConfig.input || formClassName.input}
        id={id}
        autoComplete={disableAutocomplete ? 'off' : undefined}
        onChange={e => {
          console.log(
            `[TextareaInput] onChange: id=${id}, value=${e.target.value}`
          ); // Log onChange event
          field.onChange(e); // Update form state
        }}
      />
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

export default TextareaInput;
