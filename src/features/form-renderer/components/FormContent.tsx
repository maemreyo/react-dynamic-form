// src/features/form-renderer/components/FormContent.tsx
import React, { useEffect } from 'react';
import { FormValues, FieldError } from '../../dynamic-form/types'; // Import FieldError
import { useFormContext } from 'react-hook-form';
import { InputWrapper } from '../../../styles';
import { InputRenderer } from '../../inputs/components';
import { FormContentProps } from '../types';
import { CommonInputProps } from '../../inputs';

const FormContent: React.FC<FormContentProps> = ({
  fieldsToRender,
  fields,
  config,
  formClassNameConfig,
  horizontalLabel,
  labelWidth,
  disableAutocomplete,
  showInlineError,
  renderInput,
  conditionalFieldsConfig,
}) => {
  const {
    register,
    unregister,
    formState: { errors },
  } = useFormContext<FormValues>();

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
          // Access the nested error object correctly
          const fieldError = errors[field.id] as FieldError | undefined;

          const fieldConfig = config[field.id] || {};
          const fieldClassNameConfig = fieldConfig.classNameConfig || {};
          const formClassName = formClassNameConfig || {};

          const commonInputProps: CommonInputProps = {
            id: field.id,
            fieldConfig,
            formClassNameConfig,
            showInlineError,
            horizontalLabel,
            labelWidth,
            error: fieldError,
            disableAutocomplete,
          };

          const inputElement = renderInput ? (
            renderInput(field, fieldConfig, commonInputProps)
          ) : (
            <InputRenderer
              field={field}
              config={config}
              formClassNameConfig={formClassNameConfig}
              disableAutocomplete={disableAutocomplete}
              showInlineError={showInlineError}
              horizontalLabel={horizontalLabel}
              labelWidth={labelWidth}
            />
          );

          return (
            <InputWrapper
              key={field.id}
              $horizontalLabel={horizontalLabel}
              $labelWidth={labelWidth}
              className={
                fieldClassNameConfig.inputWrapper || formClassName.inputWrapper
              }
            >
              {inputElement}
            </InputWrapper>
          );
        })}
    </>
  );
};

export default FormContent;
