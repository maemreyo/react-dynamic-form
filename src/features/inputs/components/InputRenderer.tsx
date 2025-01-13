// File: features/inputs/components/InputRenderer.tsx
// src/features/inputs/components/InputRenderer.tsx
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
import { mergeClassNames } from '../../dynamic-form/utils/formUtils';

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

  const CustomInputComponent = fieldConfig.inputComponent;
  const RegisteredCustomInput = customInputs?.[type];
  const RegisteredInputComponent = getInputComponent(type);

  const InputComponent =
    CustomInputComponent || RegisteredCustomInput || RegisteredInputComponent;

  if (CustomInputComponent && RegisteredCustomInput) {
    console.warn(
      `[DynamicForm] Field "${id}" (type: "${type}") has both "inputComponent" defined in its config and a custom input registered in "customInputs". The "inputComponent" in the field config will be used.`
    );
  }

  const mergedFormClassNameConfig = mergeClassNames(
    {},
    formClassNameConfig,
    fieldConfig.classNameConfig
  );

  const commonInputProps: CommonInputProps = {
    id,
    fieldConfig,
    formClassNameConfig: mergedFormClassNameConfig,
    showInlineError,
    horizontalLabel,
    labelWidth,
    error,
    disableAutocomplete,
  };

  const errorMessageElement =
    showInlineError && error && renderErrorMessage
      ? renderErrorMessage(error, mergedFormClassNameConfig)
      : showInlineError && error
        ? React.createElement(ErrorMessage, {
            className: mergedFormClassNameConfig.errorMessage,
            children: error.message,
          })
        : null;

  if (!InputComponent) {
    console.warn(`No input component found for type: ${type}`);
    return null;
  }

  return (
    <>
      {/* Pass inputProps to custom components */}
      <InputComponent
        {...(commonInputProps as CustomInputProps)}
        inputProps={fieldConfig.inputProps}
      />
      {errorMessageElement}
    </>
  );
};

export default InputRenderer;
