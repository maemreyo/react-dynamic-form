// Filepath: /src/features/inputs/components/InputRenderer.tsx

import React from 'react';
import { FormField, FormConfig, FormClassNameConfig } from '../../core/types';
import { getInputComponent } from '../registry/InputRegistry';

interface InputRendererProps {
  field: FormField;
  config: FormConfig;
  formClassNameConfig: FormClassNameConfig;
  disableAutocomplete?: boolean;
  showInlineError?: boolean;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
}

const InputRenderer: React.FC<InputRendererProps> = ({
  field,
  config,
  formClassNameConfig,
  disableAutocomplete,
  showInlineError,
  horizontalLabel,
  labelWidth,
}) => {
  const { id, type, error } = field;
  const fieldConfig = config[id] || {};

  // Get the input component from the registry
  const InputComponent = getInputComponent(type);

  const commonInputProps = {
    id,
    fieldConfig,
    formClassNameConfig,
    showInlineError,
    horizontalLabel,
    labelWidth,
    error,
  };

  if (!InputComponent) {
    console.warn(`No input component found for type: ${type}`);
    return null; // Or return a default input component
  }

  return (
    <InputComponent
      {...commonInputProps}
      disableAutocomplete={disableAutocomplete}
    />
  );
};

export default InputRenderer;
