import React from 'react';
import { Input, Label, ErrorMessage, InputWrapper } from '../../../styles';
import { FieldConfig, FormClassNameConfig, FieldError } from '../../core/types';
import { useFormContext, useController } from 'react-hook-form';

interface TimePickerProps {
  id: string;
  fieldConfig: FieldConfig;
  formClassNameConfig: FormClassNameConfig;
  showInlineError?: boolean;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  error?: FieldError;
}

const TimePicker: React.FC<TimePickerProps> = ({
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
      <Input
        {...field}
        className={fieldClassNameConfig.input || formClassName.input}
        type="time"
        id={id}
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

export default TimePicker;