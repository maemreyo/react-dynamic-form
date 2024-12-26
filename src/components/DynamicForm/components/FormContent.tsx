// components/FormContent.tsx
import React from 'react';
import {
  FormField,
  FormConfig,
  FormClassNameConfig,
  UseFormRegister,
} from '../types';
import InputRenderer from './InputRenderer';

interface FormContentProps {
  fields: FormField[];
  config: FormConfig;
  formClassNameConfig: FormClassNameConfig;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  renderInput?: (
    field: FormField,
    register: UseFormRegister
  ) => React.ReactNode;
  register: UseFormRegister<any>;
  formValues: Record<string, any>;
  disableAutocomplete?: boolean;
  showInlineError?: boolean;
}

const FormContent: React.FC<FormContentProps> = ({
  fields,
  config,
  formClassNameConfig,
  horizontalLabel,
  labelWidth,
  renderInput,
  register,
  formValues,
  disableAutocomplete,
  showInlineError,
}) => {
  return (
    <>
      {fields.map(field => (
        <InputRenderer
          key={field.id}
          field={field}
          config={config}
          formClassNameConfig={formClassNameConfig}
          horizontalLabel={horizontalLabel}
          labelWidth={labelWidth}
          renderInput={renderInput}
          register={register}
          formValues={formValues}
          disableAutocomplete={disableAutocomplete}
          showInlineError={showInlineError}
        />
      ))}
    </>
  );
};

export default FormContent;
