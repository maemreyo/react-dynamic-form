// useFormFields.ts
// src/features/core/hooks/useFormFields.ts
import { useMemo } from 'react';
import { FormField, FormConfig, FieldError, Condition } from '../types';
import { getInputTypeFromValue } from '../../inputs/utils';
import { FormState, useWatch } from 'react-hook-form';
import { flattenConfig } from '../utils';

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
  data: Record<string, any>,
  config: FormConfig,
  formState: FormState<any>,
  control: any
): {
  fields: FormField[];
  fieldsToRender: string[];
  conditionalFieldsConfig: Condition[];
  flattenedConfig: FormConfig; // Add flattenedConfig to props
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
    const getFieldsToRenderRecursively = (
      currentConfig: FormConfig,
      parentFieldId?: string
    ): string[] => {
      let result: string[] = [];

      for (const fieldId in currentConfig) {
        const fullFieldId = parentFieldId
          ? `${parentFieldId}.${fieldId}`
          : fieldId;
        const fieldConfig = currentConfig[fieldId];

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

        if (shouldRenderField(fieldId)) {
          result.push(fullFieldId);
        }

        if (fieldConfig.type === 'repeater' && fieldConfig.fields) {
          // Don't add nested fields here, only add the repeater field
          // result = result.concat(repeaterFieldIds); // Remove this line
        }
      }

      return result;
    };

    return getFieldsToRenderRecursively(config);
  }, [config, conditionalFieldsConfig, watchedValues]);

  const fields = useMemo(() => {
    return Object.entries(flattenedConfig).map(([key, fieldConfig]) => {
      const inputType = fieldConfig.type || getInputTypeFromValue(data[key]);

      return {
        label: fieldConfig.label,
        id: key,
        type: inputType,
        error: formState.errors?.[key] as FieldError | undefined,
      };
    });
  }, [formState, data]);

  return { fields, fieldsToRender, conditionalFieldsConfig, flattenedConfig };
}

export default useFormFields;
