import React from 'react';
import { Label, ErrorMessage, InputWrapper } from '../../styles';
import {
  FieldConfig,
  FieldError,
  FormClassNameConfig,
  UseFormRegisterReturn,
} from '../../types';
import styled from 'styled-components';

const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const RadioInputStyled = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;

  &:checked {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:checked::after {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background-color: white;
    border-radius: 50%;
    margin: 3px auto;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }
`;

interface RadioInputProps {
  id: string;
  fieldConfig: FieldConfig;
  formClassNameConfig: FormClassNameConfig;
  formValues: Record<string, any>;
  showInlineError?: boolean;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  registerResult: UseFormRegisterReturn;
  error?: FieldError;
}

const RadioInput: React.FC<RadioInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig,
  formValues,
  showInlineError,
  horizontalLabel,
  labelWidth,
  registerResult,
  error,
}) => {
  const { label, options } = fieldConfig;
  const fieldClassNameConfig = fieldConfig.classNameConfig || {};
  const formClassName = formClassNameConfig || {};

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
      <RadioGroup>
        {options?.map(option => (
          <RadioLabel key={option.value} htmlFor={`${id}-${option.value}`}>
            <RadioInputStyled
              {...registerResult}
              type="radio"
              id={`${id}-${option.value}`}
              name={id}
              value={option.value}
              checked={formValues[id] === option.value}
            />
            {option.label}
          </RadioLabel>
        ))}
      </RadioGroup>
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

export default RadioInput;
