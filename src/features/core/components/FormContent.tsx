import React, { useEffect, useMemo } from 'react';
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
import { useFormContext, useWatch } from 'react-hook-form';
import ConditionalFields from '../../conditional/components/ConditionalFields';

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
  config,
  formClassNameConfig,
  horizontalLabel,
  labelWidth,
  disableAutocomplete,
  showInlineError,
}) => {
  const { control, register, unregister } = useFormContext();

  const conditionalFieldsConfig = useMemo(
    () =>
      Object.keys(config)
        .filter(
          fieldId =>
            config[fieldId].conditional &&
            typeof config[fieldId].conditional?.when === 'string'
        )
        .map(fieldId => ({
          when: config[fieldId].conditional!.when, // Now 'when' is guaranteed to be a string
          is: config[fieldId].conditional!.is,
          fields: config[fieldId].conditional!.fields || [],
        })),
    [config]
  );

  const watchedValues = useWatch({
    control,
    name: conditionalFieldsConfig.map(condition => condition.when),
  });

  const fieldsToRender = useMemo(() => {
    const shouldRenderField = (fieldId: string): boolean => {
      // Check if the field is part of any conditional logic
      const isConditionalField = conditionalFieldsConfig.some(condition =>
        condition.fields.includes(fieldId)
      );

      // If it's a conditional field, check if the condition is met
      if (isConditionalField) {
        return conditionalFieldsConfig.some(condition => {
          const conditionIndex = conditionalFieldsConfig.indexOf(condition);
          const watchedValue = watchedValues[conditionIndex];
          return (
            condition.fields.includes(fieldId) && watchedValue === condition.is
          );
        });
      }

      // If it's not a conditional field, render it
      return true;
    };

    return Object.keys(config).filter(shouldRenderField);
  }, [config, conditionalFieldsConfig, watchedValues]);

  useEffect(() => {
    fieldsToRender.forEach(fieldId => {
      const fieldConfig = config[fieldId] || {};
      register(fieldId, fieldConfig.validation);
    });

    // Unregister fields that are not rendered
    const allFields = Object.keys(config);
    allFields.forEach(fieldId => {
      if (!fieldsToRender.includes(fieldId)) {
        unregister(fieldId);
      }
    });
  }, [config, register, unregister, fieldsToRender]);

  return (
    <>
      {fieldsToRender.map(fieldId => {
        const fieldConfig = config[fieldId] || {};
        const field: FormField = {
          id: fieldId,
          type: fieldConfig.type || 'text', // Default to 'text' if type is not specified
          label: fieldConfig.label,
          error: undefined, // Assuming error handling is done elsewhere
        };

        return (
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
        );
      })}

      <ConditionalFields
        conditions={conditionalFieldsConfig}
        config={config}
        formClassNameConfig={formClassNameConfig}
        disableAutocomplete={disableAutocomplete}
        showInlineError={showInlineError}
        horizontalLabel={horizontalLabel}
        labelWidth={labelWidth}
        fieldsToRender={fieldsToRender}
      />
    </>
  );
};

export default FormContent;
