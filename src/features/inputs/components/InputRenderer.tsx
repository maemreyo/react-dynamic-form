// Filename: /src/features/inputs/components/InputRenderer.tsx

import React from 'react';
import {
  FormField,
  FormConfig,
  FormClassNameConfig,
  RepeaterFieldConfig,
} from '../../core/types';
import { Repeater } from '../../repeater';
import { ErrorMessage } from '../../../styles';
import { getInputComponent } from '../InputRegistry'; // Import getInputComponent

interface InputRendererProps {
  field: FormField;
  config: FormConfig;
  formClassNameConfig: FormClassNameConfig;
  disableAutocomplete?: boolean;
  showInlineError?: boolean;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
}

const renderInputComponent = ({
  field,
  config,
  formClassNameConfig,
  disableAutocomplete,
  showInlineError,
  horizontalLabel,
  labelWidth,
}: InputRendererProps) => {
  const { id, type, error } = field;
  const fieldConfig = config[id] || {};

  const commonInputProps = {
    id,
    fieldConfig,
    formClassNameConfig,
    showInlineError,
    horizontalLabel,
    labelWidth,
    error,
  };

  if (type === 'repeater') {
    return (
      <Repeater
        id={id}
        fieldConfig={fieldConfig as RepeaterFieldConfig}
        formClassNameConfig={formClassNameConfig}
      />
    );
  }

  // Use getInputComponent to get the component based on type
  const InputComponent = getInputComponent(type);

  if (!InputComponent) {
    console.warn(`No input component found for type: ${type}`);
    return null;
  }

  return (
    <>
      <InputComponent
        {...commonInputProps}
        disableAutocomplete={disableAutocomplete}
      />
      {showInlineError && error && (
        <ErrorMessage
          className={
            (fieldConfig.classNameConfig &&
              fieldConfig.classNameConfig.errorMessage) ||
            (formClassNameConfig && formClassNameConfig.errorMessage)
          }
        >
          {error.message}
        </ErrorMessage>
      )}
    </>
  );
};

export default renderInputComponent;
