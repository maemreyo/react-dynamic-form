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

const FormContent: React.FC<FormContentProps> = ({
  config,
  formClassNameConfig,
  horizontalLabel,
  labelWidth,
  disableAutocomplete,
  showInlineError,
}) => {
  const { control } = useFormContext();

  const conditionalFieldsConfig = useMemo(
    () =>
      Object.keys(config)
        .filter(
          fieldId =>
            config[fieldId].conditional &&
            typeof config[fieldId].conditional?.when === 'string'
        )
        .map(fieldId => ({
          when: config[fieldId].conditional!.when,
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
      const isConditionalField = conditionalFieldsConfig.some(condition =>
        condition.fields.includes(fieldId)
      );

      if (isConditionalField) {
        return conditionalFieldsConfig.some(condition => {
          const conditionIndex = conditionalFieldsConfig.indexOf(condition);
          const watchedValue = watchedValues[conditionIndex];
          return (
            condition.fields.includes(fieldId) && watchedValue === condition.is
          );
        });
      }

      return true;
    };

    return Object.keys(config).filter(shouldRenderField);
  }, [config, conditionalFieldsConfig, watchedValues]);

  return (
    <>
      {fieldsToRender.map(fieldId => {
        const fieldConfig = config[fieldId] || {};
        const field: FormField = {
          id: fieldId,
          type: fieldConfig.type || 'text',
          label: fieldConfig.label,
          error: undefined,
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
      />
    </>
  );
};

export default FormContent;