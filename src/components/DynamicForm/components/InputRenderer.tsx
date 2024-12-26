// components/InputRenderer.tsx
import React from 'react';
import {
  InputWrapper,
  Label,
  ErrorMessage,
  Input as StyledInput,
} from '../styles';
import {
  FormField,
  FormConfig,
  FormClassNameConfig,
  UseFormRegister,
} from '../types';

interface InputRendererProps {
  field: FormField;
  config: FormConfig;
  formClassNameConfig: FormClassNameConfig;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  renderInput?: (
    field: FormField,
    register: UseFormRegister
  ) => React.ReactNode;
  register: UseFormRegister<any>;
  formValues: Record<string, any>;
  disableAutocomplete?: boolean;
  showInlineError?: boolean;
}

const InputRenderer: React.FC<InputRendererProps> = ({
  field,
  config,
  formClassNameConfig,
  horizontalLabel,
  labelWidth,
  renderInput,
  register,
  formValues,
  disableAutocomplete,
  showInlineError,
}) => {
  const { label, inputProps, id, error } = field;
  const fieldConfig = config?.[id] || {};
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
      {renderInput
        ? renderInput(field, register)
        : inputProps &&
          React.createElement(
            inputProps.type === 'textarea'
              ? 'textarea'
              : inputProps.type === 'checkbox'
              ? 'input'
              : StyledInput,
            {
              className: fieldClassNameConfig.input || formClassName.input,
              ...inputProps,
              ...register(inputProps.name),
              ...(inputProps.type === 'checkbox'
                ? {
                    checked: formValues[inputProps.name] === true,
                  }
                : {
                    value: formValues[inputProps.name] || '',
                  }),
              ...(disableAutocomplete ? { autoComplete: 'off' } : {}),
            }
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

export default InputRenderer;
