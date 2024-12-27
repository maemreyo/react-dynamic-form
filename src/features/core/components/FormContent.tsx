// src/features/core/components/FormContent.tsx
import React from 'react';
import {
  FormField,
  FormConfig,
  FormClassNameConfig,
  UseFormRegister,
} from '../types';
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

interface FormContentProps {
  fields: FormField[];
  config: FormConfig;
  formClassNameConfig: FormClassNameConfig;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  register: UseFormRegister<any>;
  formValues: Record<string, any>;
  disableAutocomplete?: boolean;
  showInlineError?: boolean;
}

const renderInputComponent = (
  field: FormField,
  config: FormConfig,
  formClassNameConfig: FormClassNameConfig,
  formValues: Record<string, any>,
  disableAutocomplete: boolean | undefined,
  showInlineError: boolean | undefined,
  horizontalLabel: boolean | undefined,
  labelWidth: string | number | undefined,
  register: UseFormRegister<any>
) => {
  const { id, type, error } = field;
  const fieldConfig = config[id] || {};
  const registerResult = register(id, fieldConfig.validation);

  switch (type) {
    case 'text':
    case 'email':
    case 'password':
    case 'tel':
    case 'url':
      return (
        <TextInput
          id={id}
          fieldConfig={fieldConfig}
          formClassNameConfig={formClassNameConfig}
          formValues={formValues}
          disableAutocomplete={disableAutocomplete}
          showInlineError={showInlineError}
          horizontalLabel={horizontalLabel}
          labelWidth={labelWidth}
          registerResult={registerResult}
          error={error}
        />
      );
    case 'checkbox':
      return (
        <CheckboxInput
          id={id}
          fieldConfig={fieldConfig}
          formClassNameConfig={formClassNameConfig}
          formValues={formValues}
          showInlineError={showInlineError}
          horizontalLabel={horizontalLabel}
          labelWidth={labelWidth}
          registerResult={registerResult}
          error={error}
        />
      );
    case 'textarea':
      return (
        <TextareaInput
          id={id}
          fieldConfig={fieldConfig}
          formClassNameConfig={formClassNameConfig}
          formValues={formValues}
          disableAutocomplete={disableAutocomplete}
          showInlineError={showInlineError}
          horizontalLabel={horizontalLabel}
          labelWidth={labelWidth}
          registerResult={registerResult}
          error={error}
        />
      );
    case 'select':
      return (
        <SelectInput
          id={id}
          fieldConfig={fieldConfig}
          formClassNameConfig={formClassNameConfig}
          formValues={formValues}
          showInlineError={showInlineError}
          horizontalLabel={horizontalLabel}
          labelWidth={labelWidth}
          registerResult={registerResult}
          error={error}
        />
      );
    case 'radio':
      return (
        <RadioInput
          id={id}
          fieldConfig={fieldConfig}
          formClassNameConfig={formClassNameConfig}
          formValues={formValues}
          showInlineError={showInlineError}
          horizontalLabel={horizontalLabel}
          labelWidth={labelWidth}
          registerResult={registerResult}
          error={error}
        />
      );
    case 'date':
      return (
        <DateInput
          id={id}
          fieldConfig={fieldConfig}
          formClassNameConfig={formClassNameConfig}
          formValues={formValues}
          showInlineError={showInlineError}
          horizontalLabel={horizontalLabel}
          labelWidth={labelWidth}
          registerResult={registerResult}
          error={error}
        />
      );
    case 'number':
      return (
        <NumberInput
          id={id}
          fieldConfig={fieldConfig}
          formClassNameConfig={formClassNameConfig}
          formValues={formValues}
          disableAutocomplete={disableAutocomplete}
          showInlineError={showInlineError}
          horizontalLabel={horizontalLabel}
          labelWidth={labelWidth}
          registerResult={registerResult}
          error={error}
        />
      );
    case 'switch':
      return (
        <SwitchInput
          id={id}
          fieldConfig={fieldConfig}
          formClassNameConfig={formClassNameConfig}
          formValues={formValues}
          showInlineError={showInlineError}
          horizontalLabel={horizontalLabel}
          labelWidth={labelWidth}
          registerResult={registerResult}
          error={error}
        />
      );
    case 'time':
      return (
        <TimePicker
          id={id}
          fieldConfig={fieldConfig}
          formClassNameConfig={formClassNameConfig}
          formValues={formValues}
          showInlineError={showInlineError}
          horizontalLabel={horizontalLabel}
          labelWidth={labelWidth}
          registerResult={registerResult}
          error={error}
        />
      );
    case 'datetime-local':
      return (
        <DateTimePicker
          id={id}
          fieldConfig={fieldConfig}
          formClassNameConfig={formClassNameConfig}
          formValues={formValues}
          showInlineError={showInlineError}
          horizontalLabel={horizontalLabel}
          labelWidth={labelWidth}
          registerResult={registerResult}
          error={error}
        />
      );
    case 'combobox':
      return (
        <ComboBox
          id={id}
          fieldConfig={fieldConfig}
          formClassNameConfig={formClassNameConfig}
          formValues={formValues}
          showInlineError={showInlineError}
          horizontalLabel={horizontalLabel}
          labelWidth={labelWidth}
          registerResult={registerResult}
          error={error}
        />
      );
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
  register,
  formValues,
  disableAutocomplete,
  showInlineError,
}) => {
  return (
    <>
      {fields.map(field => (
        <React.Fragment key={field.id}>
          {renderInputComponent(
            field,
            config,
            formClassNameConfig,
            formValues,
            disableAutocomplete,
            showInlineError,
            horizontalLabel,
            labelWidth,
            register
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default FormContent;
