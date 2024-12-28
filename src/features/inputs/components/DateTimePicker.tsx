import React, { useMemo } from 'react';
import { Input, Label, ErrorMessage, InputWrapper } from '../../../styles';
import {
  FieldConfig,
  FormClassNameConfig,
  FieldError,
  DateTimeFieldConfig,
} from '../../core/types';
import { useFormContext, useController } from 'react-hook-form';

interface DateTimePickerProps {
  id: string;
  fieldConfig: DateTimeFieldConfig;
  formClassNameConfig?: FormClassNameConfig;
  showInlineError?: boolean;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  error?: FieldError;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
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

  const handleChange = useMemo(
    () => (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(
        `[DateTimePicker] onChange: id=${id}, value=${e.target.value}`
      ); // Log onChange event
      field.onChange(e); // Update form state
    },
    [id, field.onChange]
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
        className={fieldClassNameConfig.input || formClassName.input}
        type="datetime-local"
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

export default DateTimePicker;
