import React from 'react';
import { Input, Label, ErrorMessage, InputWrapper } from '../../styles';
import {
  FieldConfig,
  FieldError,
  FormClassNameConfig,
  UseFormRegisterReturn,
} from '../../types';

interface CheckboxInputProps {
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

const CheckboxInput: React.FC<CheckboxInputProps> = ({
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
        type="checkbox"
        id={id}
        checked={formValues[id] === true}
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

export default CheckboxInput;
