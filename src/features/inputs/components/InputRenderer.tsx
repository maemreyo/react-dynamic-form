// Filepath: /src/features/inputs/components/InputRenderer.tsx
import React from 'react';
import {
  FormField,
  FormConfig,
  FormClassNameConfig,
  RenderLabelProps,
  RenderErrorMessageProps,
  InputComponentMap,
} from '../../dynamic-form/types';
import { getInputComponent } from '../registry/InputRegistry';
import { CommonInputProps, CustomInputProps } from '../types';
import { ErrorMessage } from '../../../styles';
import { useFormContext } from 'react-hook-form';

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
  customInputs?: InputComponentMap;
}

const InputRenderer: React.FC<InputRendererProps> = ({
  field,
  config,
  formClassNameConfig,
  disableAutocomplete,
  showInlineError,
  horizontalLabel,
  labelWidth,
  renderErrorMessage,
  customInputs,
}) => {
  const { id, type, error } = field;
  const fieldConfig = config[id] || {};
  const { getValues } = useFormContext();
  // Prioritize custom input components
  const CustomInputComponent = customInputs?.[type];
  const RegisteredInputComponent = getInputComponent(type);
  const InputComponent = CustomInputComponent || RegisteredInputComponent;

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
  const errorMessageElement =
    showInlineError && error && renderErrorMessage
      ? renderErrorMessage(error, formClassNameConfig)
      : showInlineError && error
      ? React.createElement(ErrorMessage, {
          className:
            fieldConfig.classNameConfig?.errorMessage ||
            formClassNameConfig?.errorMessage,
          children: error.message,
        })
      : null;

  if (!InputComponent) {
    console.warn(`No input component found for type: ${type}`);
    return null;
  }

  return (
    <>
      {/* Cast to CustomInputProps for custom components */}
      <InputComponent {...(commonInputProps as CustomInputProps)} />
      {errorMessageElement}
    </>
  );
};

export default InputRenderer;
