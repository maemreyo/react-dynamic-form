// src/features/dynamic-form/hooks/useFormFields.ts
import { useMemo } from 'react';
import {
  FormField,
  FormConfig,
  FieldError,
  Condition,
  FormValues,
} from '../types';
import { flattenConfig } from '../utils';
import { FormState, useWatch, Control } from 'react-hook-form';
import { getInputTypeFromValue } from '../../inputs/utils';

/**
 * Custom hook to generate form fields from data and config.
 *
 * @param data - The form data.
 * @param config - The form configuration.
 * @param formState - The `react-hook-form` form state.
 * @param control - The `react-hook-form` control object.
 * @returns An object containing the form fields and the fields to render.
 */
function useFormFields(
  data: FormValues,
  config: FormConfig,
  formState: FormState<FormValues>,
  control: Control<FormValues>
): {
  fields: FormField[];
  fieldsToRender: string[];
  conditionalFieldsConfig: Condition[];
} {
  const flattenedConfig = useMemo(() => flattenConfig(config), [config]);

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
          operator: config[fieldId].conditional!.operator || 'is',
          value: config[fieldId].conditional?.value,
          comparator: config[fieldId].conditional?.comparator,
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
          let conditionMet = false;

          switch (condition.operator) {
            case 'is':
              conditionMet = watchedValue === condition.value;
              break;
            case 'isNot':
              conditionMet = watchedValue !== condition.value;
              break;
            case 'greaterThan':
              conditionMet = watchedValue > condition.value;
              break;
            case 'lessThan':
              conditionMet = watchedValue < condition.value;
              break;
            case 'greaterThanOrEqual':
              conditionMet = watchedValue >= condition.value;
              break;
            case 'lessThanOrEqual':
              conditionMet = watchedValue <= condition.value;
              break;
            case 'contains':
              conditionMet =
                typeof watchedValue === 'string' &&
                typeof condition.value === 'string' &&
                watchedValue.includes(condition.value);
              break;
            case 'startsWith':
              conditionMet =
                typeof watchedValue === 'string' &&
                typeof condition.value === 'string' &&
                watchedValue.startsWith(condition.value);
              break;
            case 'endsWith':
              conditionMet =
                typeof watchedValue === 'string' &&
                typeof condition.value === 'string' &&
                watchedValue.endsWith(condition.value);
              break;
            case 'custom':
              conditionMet = condition.comparator
                ? condition.comparator(watchedValue)
                : false;
              break;
            default:
              console.warn(`Unknown operator: ${condition.operator}`);
              conditionMet = false;
          }

          return condition.fields.includes(fieldId) && conditionMet;
        });
      }

      return true;
    };

    return Object.keys(config).filter(shouldRenderField);
  }, [config, conditionalFieldsConfig, watchedValues]);

  const fields = useMemo(() => {
    return Object.entries(flattenedConfig).map(([key, fieldConfig]) => {
      const inputType = fieldConfig.type || getInputTypeFromValue(data[key]);

      return {
        label: fieldConfig.label,
        id: key,
        type: inputType,
        error: formState.errors?.[key] as FieldError | undefined, // Type assertion
      };
    });
  }, [flattenedConfig, formState, data]);

  return { fields, fieldsToRender, conditionalFieldsConfig };
}

export default useFormFields;
