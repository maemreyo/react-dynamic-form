import React from 'react';
import { Input, Label, ErrorMessage, InputWrapper } from '../../styles';
import {
  FieldConfig,
  FieldError,
  FormClassNameConfig,
  UseFormRegisterReturn,
} from '../../types';

interface TextInputProps {
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

const TextInput: React.FC<TextInputProps> = ({
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
      <Input
        {...registerResult}
        className={fieldClassNameConfig.input || formClassName.input}
        id={id}
        value={formValues[id] || ''}
        autoComplete={disableAutocomplete ? 'off' : undefined}
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

export default TextInput;
