// src/features/inputs/components/InputRenderer.tsx
import React from 'react';
import {
  FormField,
  FormConfig,
  FormClassNameConfig,
  RenderLabelProps,
  RenderErrorMessageProps,
} from '../../dynamic-form/types';
import { getInputComponent } from '../registry/InputRegistry';
import { CommonInputProps } from '../types';
import { ErrorMessage } from '../../../styles';

interface InputRendererProps {
  field: FormField;
  config: FormConfig;
  formClassNameConfig: FormClassNameConfig;
  disableAutocomplete?: boolean;
  showInlineError?: boolean;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  renderLabel?: RenderLabelProps;
  renderErrorMessage?: RenderErrorMessageProps;
}

const InputRenderer: React.FC<InputRendererProps> = ({
  field,
  config,
  formClassNameConfig,
  disableAutocomplete,
  showInlineError,
  horizontalLabel,
  labelWidth,
  renderLabel,
  renderErrorMessage,
}) => {
  const { id, type, error } = field;
  const fieldConfig = config[id] || {};

  // Get the input component from the registry
  const InputComponent = getInputComponent(type);

  const commonInputProps: CommonInputProps = {
    id,
    fieldConfig,
    formClassNameConfig,
    showInlineError,
    horizontalLabel,
    labelWidth,
    error,
    disableAutocomplete,
  };

  // Render error message using renderErrorMessage prop or default
  // Ensure that error is properly typed as FieldError
  const errorMessageElement =
    showInlineError && error && renderErrorMessage ? (
      renderErrorMessage(error, formClassNameConfig)
    ) : showInlineError && error ? (
      <ErrorMessage
        className={
          fieldConfig.classNameConfig?.errorMessage ||
          formClassNameConfig?.errorMessage
        }
      >
        {error.message}
      </ErrorMessage>
    ) : null;

  if (!InputComponent) {
    console.warn(`No input component found for type: ${type}`);
    return null; // Or return a default input component
  }

  return (
    <>
      {/* InputComponent will render its own label */}
      <InputComponent {...commonInputProps} />
      {/* Render error message here */}
      {errorMessageElement}
    </>
  );
};

export default InputRenderer;
