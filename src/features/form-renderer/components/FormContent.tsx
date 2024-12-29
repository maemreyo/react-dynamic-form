// src/features/form-renderer/components/FormContent.tsx
import React, { useEffect } from 'react';
import {
  FormField,
  FormConfig,
  FormClassNameConfig,
  Condition,
  FieldError,
} from '../../dynamic-form/types';
import { useFormContext } from 'react-hook-form';
import ErrorRenderer from '../../../components/ErrorRenderer';
import { getInputComponent } from '../../inputs/registry/InputRegistry';
import { InputWrapper } from '../../../styles';
import { InputRenderer } from '../../inputs/components';

interface FormContentProps {
  fields: FormField[];
  fieldsToRender: string[];
  config: FormConfig;
  formClassNameConfig: FormClassNameConfig;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  disableAutocomplete?: boolean;
  showInlineError?: boolean;
  conditionalFieldsConfig: Condition[];
}

const FormContent: React.FC<FormContentProps> = ({
  fieldsToRender,
  fields,
  config,
  formClassNameConfig,
  horizontalLabel,
  labelWidth,
  disableAutocomplete,
  showInlineError,
}) => {
  const {
    register,
    unregister,
    formState: { errors },
  } = useFormContext();
console.log(errors)
  useEffect(() => {
    fields.forEach(field => {
      const fieldConfig = config[field.id] || {};
      if (fieldsToRender.includes(field.id)) {
        register(field.id, fieldConfig.validation);
      } else {
        unregister(field.id);
      }
    });
  }, [register, unregister, config]);

  return (
    <>
      {fields
        .filter(field => fieldsToRender.includes(field.id))
        .map(field => {
          const fieldError = errors[field.id] as FieldError | undefined; // Get the error for the field

          const fieldConfig = config[field.id] || {};
          const InputComponent = getInputComponent(field.type);
          const fieldClassNameConfig = fieldConfig.classNameConfig || {};
          const formClassName = formClassNameConfig || {};

          const commonInputProps = {
            id: field.id,
            fieldConfig,
            formClassNameConfig,
            showInlineError,
            horizontalLabel,
            labelWidth,
            error: fieldError,
          };
          return (
            <InputWrapper
              key={field.id}
              $horizontalLabel={horizontalLabel}
              $labelWidth={labelWidth}
              className={
                fieldClassNameConfig.inputWrapper || formClassName.inputWrapper
              }
            >
              <InputRenderer
                field={field}
                config={config}
                formClassNameConfig={formClassNameConfig}
                disableAutocomplete={disableAutocomplete}
                showInlineError={showInlineError}
                horizontalLabel={horizontalLabel}
                labelWidth={labelWidth}
              />
              {showInlineError && fieldError && (
                <ErrorRenderer
                  error={fieldError}
                  formClassNameConfig={formClassNameConfig}
                />
              )}
            </InputWrapper>
          );
        })}
    </>
  );
};

export default FormContent;
