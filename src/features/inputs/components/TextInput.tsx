// Filepath: /src/features/inputs/components/TextInput.tsx
import React, { useMemo } from 'react';
import { Input, Label, InputWrapper, ErrorMessage } from '../../../styles';
import { FieldConfig, FormClassNameConfig, FieldError } from '../../core/types';
import { useFormContext, useController } from 'react-hook-form';

interface TextInputProps {
  id: string;
  fieldConfig: FieldConfig;
  formClassNameConfig?: FormClassNameConfig;
  disableAutocomplete?: boolean;
  showInlineError?: boolean;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  error?: FieldError;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig,
  disableAutocomplete,
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
  console.log("[TextInput] field:", { field});
  // The onChange is now correctly memoized and updates the form state using field.onChange.

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
        {...field}
        className={fieldClassNameConfig.input || formClassName.input}
        id={id}
        autoComplete={disableAutocomplete ? 'off' : undefined}
      />
      {error && error.message && (
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
