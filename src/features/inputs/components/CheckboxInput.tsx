// Filepath: /src/features/inputs/components/CheckboxInput.tsx
import React, { useMemo } from 'react';
import { Input, Label, ErrorMessage, InputWrapper } from '../../../styles';
import {
  FieldConfig,
  FormClassNameConfig,
  FieldError,
  CheckboxFieldConfig,
} from '../../core/types';
import { useFormContext, useController } from 'react-hook-form';

interface CheckboxInputProps {
  id: string;
  fieldConfig: CheckboxFieldConfig;
  formClassNameConfig?: FormClassNameConfig;
  showInlineError?: boolean;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  error?: FieldError;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
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
  const { control } = useFormContext();
  const { field } = useController({
    name: id,
    control,
    rules: fieldConfig.validation,
    defaultValue: false,
  });

  // The onChange is correctly memoized and updates the form state.
  const handleChange = useMemo(
    () => (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(
        `[CheckboxInput] onChange: id=${id}, checked=${e.target.checked}`
      ); // Log onChange event
      field.onChange(e.target.checked); // Update form state with the new checked value
    },
    [field.onChange, id] // Correct dependencies
  );

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
        // The checked attribute is correctly managed by react-hook-form.
        checked={!!field.value}
        className={fieldClassNameConfig.input || formClassName.input}
        type="checkbox"
        id={id}
        onChange={handleChange}
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
