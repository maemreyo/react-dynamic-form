// FormContent.tsx
// src/features/core/components/FormContent.tsx
import React, { useEffect } from 'react';
import {
  FormField,
  FormConfig,
  FormClassNameConfig,
  Condition,
  RepeaterFieldConfig,
} from '../types';
import { useFormContext } from 'react-hook-form';
import renderInputComponent from '../../inputs/components/InputRenderer';
import Repeater from '../../repeater/components/Repeater';

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
  flattenedConfig: FormConfig;
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
  conditionalFieldsConfig,
  flattenedConfig,
}) => {
  const { register, unregister } = useFormContext();
  useEffect(() => {
    fields.forEach(field => {
      /**
       * Only register/unregister non-repeater fields in FormContent
       */
      const fieldConfig = flattenedConfig[field.id] || {};
      if (fieldConfig.type !== 'repeater') {
        if (fieldsToRender.includes(field.id)) {
          register(field.id, fieldConfig.validation);
        } else {
          unregister(field.id);
        }
      }
    });
  }, [register, unregister, flattenedConfig]);

  return (
    <>
      {fields
        .filter(field => {
          return fieldsToRender.includes(field.id);
        })
        .map(field => {
          const fieldConfig = flattenedConfig[field.id] || {};
          return (
            <React.Fragment key={field.id}>
              {fieldConfig.type === 'repeater' ? (
                <Repeater
                  id={field.id}
                  fieldConfig={fieldConfig as RepeaterFieldConfig}
                  formClassNameConfig={formClassNameConfig}
                />
              ) : (
                renderInputComponent({
                  field,
                  config: flattenedConfig, // use flattened config here
                  formClassNameConfig,
                  disableAutocomplete,
                  showInlineError,
                  horizontalLabel,
                  labelWidth,
                })
              )}
            </React.Fragment>
          );
        })}
    </>
  );
};

export default FormContent;
