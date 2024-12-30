// src/features/inputs/components/InputRenderer.tsx
import React from 'react';
import {
  FormField,
  FormConfig,
  FormClassNameConfig,
  RenderLabelProps,
  RenderErrorMessageProps,
  InputComponentMap,
  FieldClassNameConfig,
} from '../../dynamic-form/types';
import { getInputComponent } from '../registry/InputRegistry';
import { CommonInputProps, CustomInputProps } from '../types';
import { ErrorMessage } from '../../../styles';
import { mergeClassNames } from '../../dynamic-form/utils/formUtils'; // Import hàm mergeClassNames

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

  // Prioritize custom input components
  const CustomInputComponent = customInputs?.[type];
  const RegisteredInputComponent = getInputComponent(type);
  const InputComponent = CustomInputComponent || RegisteredInputComponent;

  // Merge class names
  const mergedFormClassNameConfig = mergeClassNames(
    {}, // Default empty object
    formClassNameConfig,
    fieldConfig.classNameConfig
  );

  const commonInputProps: CommonInputProps = {
    id,
    fieldConfig,
    formClassNameConfig: mergedFormClassNameConfig, // Truyền mergedFormClassNameConfig thay vì formClassNameConfig
    showInlineError,
    horizontalLabel,
    labelWidth,
    error,
    disableAutocomplete,
  };

  // Render error message using renderErrorMessage prop or default
  const errorMessageElement =
    showInlineError && error && renderErrorMessage
      ? renderErrorMessage(error, mergedFormClassNameConfig) // Sử dụng mergedFormClassNameConfig
      : showInlineError && error
      ? React.createElement(ErrorMessage, {
          className: mergedFormClassNameConfig.errorMessage, // Sử dụng mergedFormClassNameConfig
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
