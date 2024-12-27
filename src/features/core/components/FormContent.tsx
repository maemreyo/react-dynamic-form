// src/features/core/components/FormContent.tsx
import React, { useEffect } from 'react';
import { FormField, FormConfig, FormClassNameConfig } from '../types';
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
} from '../../inputs';
import { useFormContext } from 'react-hook-form';

interface FormContentProps {
  fields: FormField[];
  config: FormConfig;
  formClassNameConfig: FormClassNameConfig;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  disableAutocomplete?: boolean;
  showInlineError?: boolean;
}

const renderInputComponent = (
  field: FormField,
  config: FormConfig,
  formClassNameConfig: FormClassNameConfig,
  disableAutocomplete: boolean | undefined,
  showInlineError: boolean | undefined,
  horizontalLabel: boolean | undefined,
  labelWidth: string | number | undefined
) => {
  const { id, type, error } = field;
  const fieldConfig = config[id] || {};

  // Create an object with common props
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
          {...commonInputProps} // Spread common props
          disableAutocomplete={disableAutocomplete}
        />
      );
    case 'checkbox':
      return <CheckboxInput {...commonInputProps} />; // Spread common props
    case 'textarea':
      return (
        <TextareaInput
          {...commonInputProps} // Spread common props
          disableAutocomplete={disableAutocomplete}
        />
      );
    case 'select':
      return <SelectInput {...commonInputProps} />; // Spread common props
    case 'radio':
      return <RadioInput {...commonInputProps} />; // Spread common props
    case 'date':
      return <DateInput {...commonInputProps} />; // Spread common props
    case 'number':
      return (
        <NumberInput
          {...commonInputProps} // Spread common props
          disableAutocomplete={disableAutocomplete}
        />
      );
    case 'switch':
      return <SwitchInput {...commonInputProps} />; // Spread common props
    case 'time':
      return <TimePicker {...commonInputProps} />; // Spread common props
    case 'datetime-local':
      return <DateTimePicker {...commonInputProps} />; // Spread common props
    case 'combobox':
      return <ComboBox {...commonInputProps} />; // Spread common props
    default:
      return null;
  }
};

const FormContent: React.FC<FormContentProps> = ({
  fields,
  config,
  formClassNameConfig,
  horizontalLabel,
  labelWidth,
  disableAutocomplete,
  showInlineError,
}) => {
  const { register } = useFormContext();

  useEffect(() => {
    fields.forEach(field => {
      const fieldConfig = config[field.id] || {};
      register(field.id, fieldConfig.validation);
    });
  }, [fields, register, config]);

  return (
    <>
      {fields.map(field => (
        <React.Fragment key={field.id}>
          {renderInputComponent(
            field,
            config,
            formClassNameConfig,
            disableAutocomplete,
            showInlineError,
            horizontalLabel,
            labelWidth
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default FormContent;
