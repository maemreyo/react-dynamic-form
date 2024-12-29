import React, { useEffect } from 'react';
import {
  FormField,
  FormConfig,
  FormClassNameConfig,
  Condition,
} from '../types';
import { useFormContext } from 'react-hook-form';
import renderInputComponent from '../../inputs/components/InputRenderer';
import ErrorRenderer from '../../../components/ErrorRenderer';

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
          return (
            <React.Fragment key={field.id}>
              {renderInputComponent({
                field,
                config,
                formClassNameConfig,
                disableAutocomplete,
                showInlineError,
                horizontalLabel,
                labelWidth,
              })}
              {showInlineError && fieldError && (
                <ErrorRenderer
                  error={fieldError}
                  formClassNameConfig={formClassNameConfig}
                />
              )}
            </React.Fragment>
          );
        })}
    </>
  );
};

export default FormContent;
