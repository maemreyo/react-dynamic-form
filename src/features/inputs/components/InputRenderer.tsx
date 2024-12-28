// Filename: /src/features/inputs/components/InputRenderer.tsx

import React from 'react';
import {
  FormField,
  FormConfig,
  FormClassNameConfig,
  RepeaterFieldConfig,
  FieldConfig,
} from '../../core/types';
import { Repeater } from '../../repeater';
import { ErrorMessage } from '../../../styles';
import { getInputComponent } from '../InputRegistry';

interface InputRendererProps {
  field: FormField;
  config: FormConfig;
  formClassNameConfig?: FormClassNameConfig;
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
  const fieldConfig = config[id];
  // console.log('[renderInputComponent] field', field);
  // console.log('[renderInputComponent] config', config);

  // Explicit type for commonInputProps
  const commonInputProps: {
    id: string;
    fieldConfig: FieldConfig;
    formClassNameConfig?: FormClassNameConfig;
    showInlineError?: boolean;
    horizontalLabel?: boolean;
    labelWidth?: string | number;
    error?:
      | {
          type: string;
          message?: string | undefined;
        }
      | undefined;
  } = {
    id,
    fieldConfig: fieldConfig!,
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
            (fieldConfig?.classNameConfig &&
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
