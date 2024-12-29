// src/features/form-renderer/components/FormContent.tsx
import React, { useEffect } from 'react';
import { FormValues } from '../../dynamic-form/types';
import { useFormContext } from 'react-hook-form';
import { getInputComponent } from '../../inputs/registry/InputRegistry';
import { InputWrapper } from '../../../styles';
import { InputRenderer } from '../../inputs/components';
import { FormContentProps } from '../types';

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
  conditionalFieldsConfig, // Remove the extra conditionalFieldsConfig prop
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
  }, [register, unregister, config, fieldsToRender]);

  return (
    <>
      {fields
        .filter(field => fieldsToRender.includes(field.id))
        .map(field => {
          const fieldError = errors[field.id];

          const fieldConfig = config[field.id] || {};
          const InputComponent = getInputComponent(field.type);
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
