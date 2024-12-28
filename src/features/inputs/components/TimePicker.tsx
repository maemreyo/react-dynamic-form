import React from 'react';
import { Input, Label, ErrorMessage, InputWrapper } from '../../../styles';
import {
  TimeFieldConfig,
  FormClassNameConfig,
  FieldError,
} from '../../core/types';
import { useFormContext, useController } from 'react-hook-form';

interface TimePickerProps {
  id: string;
  fieldConfig: TimeFieldConfig;
  formClassNameConfig?: FormClassNameConfig;
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
      <Input
        {...field}
        className={fieldClassNameConfig.input || formClassName.input}
        type="time"
        id={id}
        onChange={e => {
          console.log(
            `[TimePicker] onChange: id=${id}, value=${e.target.value}`
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

export default TimePicker;
