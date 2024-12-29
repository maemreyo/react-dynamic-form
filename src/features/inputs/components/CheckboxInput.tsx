// src/features/inputs/components/CheckboxInput.tsx
import React from 'react';
import { Input, Label, InputWrapper, ErrorMessage } from '../../../styles';
import { useFormContext, useController } from 'react-hook-form';
import { CommonInputProps } from '../types';
import { FormValues } from '../../dynamic-form';
import { useTheme } from '../../../theme/ThemeProvider';

const CheckboxInput: React.FC<CommonInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig,
  showInlineError,
  horizontalLabel,
  labelWidth,
  error,
}) => {
  const { label } = fieldConfig;
  const fieldClassNameConfig = fieldConfig.classNameConfig || {};
  const formClassName = formClassNameConfig || {};
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
      className={
        fieldClassNameConfig.inputWrapper || formClassName.inputWrapper
      }
    >
      {/* Render label here */}
      {label && (
        <Label
          htmlFor={id}
          $horizontalLabel={horizontalLabel}
          $labelWidth={labelWidth}
          className={fieldClassNameConfig.label || formClassName.label}
        >
          <Input
            {...field}
            className={fieldClassNameConfig.input || formClassName.input}
            type="checkbox"
            id={id}
            checked={!!field.value}
          />
          {label}
          {/* This is handled in InputRenderer now:
          {fieldConfig.validation?.required && (
            <span style={{ color: 'red' }}>*</span>
          )} */}
        </Label>
      )}
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
