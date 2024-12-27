import React, { useEffect } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';
import { Condition, FormClassNameConfig, FormConfig } from '../../core/types';

interface ConditionalFieldsProps {
  conditions: Condition[];
  config: FormConfig;
}

const ConditionalFields: React.FC<ConditionalFieldsProps> = ({
  conditions,
  config,
}) => {
  const { control, register, unregister } = useFormContext();

  const watchedValues = useWatch({
    control,
    name: conditions.map(condition => condition.when),
  });

  const fieldsToRender = React.useMemo(() => {
    const fields = new Set<string>();
    conditions.forEach((condition, index) => {
      const {
        when,
        operator,
        value,
        comparator,
        fields: conditionFields,
      } = condition;
      const watchedValue = watchedValues[index];
      let conditionMet = false;

      switch (operator) {
        case 'is':
          conditionMet = watchedValue === value;
          break;
        case 'isNot':
          conditionMet = watchedValue !== value;
          break;
        case 'greaterThan':
          conditionMet = watchedValue > value;
          break;
        case 'lessThan':
          conditionMet = watchedValue < value;
          break;
        case 'greaterThanOrEqual':
          conditionMet = watchedValue >= value;
          break;
        case 'lessThanOrEqual':
          conditionMet = watchedValue <= value;
          break;
        case 'contains':
          conditionMet =
            typeof watchedValue === 'string' &&
            typeof value === 'string' &&
            watchedValue.includes(value);
          break;
        case 'startsWith':
          conditionMet =
            typeof watchedValue === 'string' &&
            typeof value === 'string' &&
            watchedValue.startsWith(value);
          break;
        case 'endsWith':
          conditionMet =
            typeof watchedValue === 'string' &&
            typeof value === 'string' &&
            watchedValue.endsWith(value);
          break;
        case 'custom':
          conditionMet = comparator ? comparator(watchedValue) : false;
          break;
        default:
          console.warn(`Unknown operator: ${operator}`);
          conditionMet = false;
      }

      if (conditionMet) {
        conditionFields.forEach(fieldId => fields.add(fieldId));
      }
    });
    return Array.from(fields);
  }, [conditions, watchedValues]);

  useEffect(() => {
    fieldsToRender.forEach(fieldId => {
      const fieldConfig = config[fieldId] || {};
      register(fieldId, fieldConfig.validation);
    });

    const allConditionalFields = conditions.flatMap(
      condition => condition.fields
    );
    allConditionalFields.forEach(fieldId => {
      if (!fieldsToRender.includes(fieldId)) {
        unregister(fieldId);
      }
    });
  }, [register, unregister, config]);

  return null;
};

export default ConditionalFields;
