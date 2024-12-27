import React, { useEffect } from 'react';
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
}

const ConditionalFields: React.FC<ConditionalFieldsProps> = ({
  conditions,
  config,
  formClassNameConfig,
  disableAutocomplete,
  showInlineError,
  horizontalLabel,
  labelWidth,
}) => {
  const { control, register, unregister } = useFormContext();

  const watchedValues = useWatch({
    control,
    name: conditions.map(condition => condition.when),
  });

  const fieldsToRender = React.useMemo(() => {
    const fields = new Set<string>();
    conditions.forEach((condition, index) => {
      if (watchedValues[index] === condition.is) {
        condition.fields.forEach(fieldId => fields.add(fieldId));
      }
    });
    return Array.from(fields);
  }, [conditions, watchedValues]);

  useEffect(() => {
    fieldsToRender.forEach((fieldId) => {
        const fieldConfig = config[fieldId];
        if (fieldConfig) {
            register(fieldId, fieldConfig.validation);
        }
    });

    return () => {
        fieldsToRender.forEach((fieldId) => {
            unregister(fieldId);
        });
    };
}, [fieldsToRender, register, unregister, config]);

  return null;
};

export default ConditionalFields;