import React from 'react';
import { useWatch, useFormContext } from 'react-hook-form';
import { FormClassNameConfig, FormConfig } from '../../core/types';

interface Condition {
  when: string;
  is: any;
  fields: string[];
}

interface ConditionalFieldsProps {
  conditions: Condition[];
  config: FormConfig;
  formClassNameConfig: FormClassNameConfig;
  disableAutocomplete?: boolean;
  showInlineError?: boolean;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  fieldsToRender: string[];
}

const ConditionalFields: React.FC<ConditionalFieldsProps> = ({
  conditions,
  config,
  formClassNameConfig,
  disableAutocomplete,
  showInlineError,
  horizontalLabel,
  labelWidth,
  fieldsToRender,
}) => {
  const { control, register } = useFormContext();

  // Watch the values of the fields used in the conditions
  const watchedValues = useWatch({
    control,
    name: conditions.map(condition => condition.when),
  });

  const shouldRenderField = (fieldId: string): boolean => {
    return conditions.some(condition => {
      const conditionIndex = conditions.indexOf(condition);
      const watchedValue = watchedValues[conditionIndex];
      return (
        condition.fields.includes(fieldId) && watchedValue === condition.is
      );
    });
  };

  React.useEffect(() => {
    const conditionalFields = Object.keys(config).filter(
      fieldId => config[fieldId].conditional
    );

    conditionalFields.forEach(fieldId => {
      const shouldRender = shouldRenderField(fieldId);
      const fieldConfig = config[fieldId] || {};

      if (shouldRender) {
        // Register the field if it should be rendered
        register(fieldId, fieldConfig.validation);
      }
    });
  }, [fieldsToRender, register, config]);

  return null;
};

export default ConditionalFields;
