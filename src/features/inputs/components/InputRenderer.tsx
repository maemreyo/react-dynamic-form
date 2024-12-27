import React from 'react';
import { FormField, FormConfig, FormClassNameConfig } from '../../core/types';
import {
  TextInput,
  CheckboxInput,
  TextareaInput,
  SelectInput,
  RadioInput,
  DateInput,
  NumberInput,
  SwitchInput,
  TimePicker,
  DateTimePicker,
  ComboBox,
} from '.';

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

  switch (type) {
    case 'text':
    case 'email':
    case 'password':
    case 'tel':
    case 'url':
      return (
        <TextInput
          {...commonInputProps}
          disableAutocomplete={disableAutocomplete}
        />
      );
    case 'checkbox':
      return <CheckboxInput {...commonInputProps} />;
    case 'textarea':
      return (
        <TextareaInput
          {...commonInputProps}
          disableAutocomplete={disableAutocomplete}
        />
      );
    case 'select':
      return <SelectInput {...commonInputProps} />;
    case 'radio':
      return <RadioInput {...commonInputProps} />;
    case 'date':
      return <DateInput {...commonInputProps} />;
    case 'number':
      return (
        <NumberInput
          {...commonInputProps}
          disableAutocomplete={disableAutocomplete}
        />
      );
    case 'switch':
      return <SwitchInput {...commonInputProps} />;
    case 'time':
      return <TimePicker {...commonInputProps} />;
    case 'datetime-local':
      return <DateTimePicker {...commonInputProps} />;
    case 'combobox':
      return <ComboBox {...commonInputProps} />;
    default:
      return null;
  }
};

export default renderInputComponent;
