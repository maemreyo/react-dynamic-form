import React, { useMemo } from 'react';
import { Input, Label, InputWrapper } from '../../../styles';
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

  const handleChange = useMemo(
    () => (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(`[TextInput] onChange: id=${id}, value=${e.target.value}`); // Log onChange event
      field.onChange(e); // Update form state with the new value
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
        id={id}
        autoComplete={disableAutocomplete ? 'off' : undefined}
        onChange={handleChange}
      />
      {error && error.message && (
        <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.2rem' }}>
          {error.message}
        </div>
      )}
    </InputWrapper>
  );
};

export default TextInput;
