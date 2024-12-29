// src/features/dynamic-form/hooks/conditionalRendering.ts
import { Condition } from '../types';

/**
 * Determines if a field should be rendered based on the conditional logic.
 *
 * @param fieldId - The ID of the field to check.
 * @param conditionalFieldsConfig - The conditional fields configuration.
 * @param watchedValues - The watched values from useWatch.
 * @returns True if the field should be rendered, false otherwise.
 */
export const shouldRenderField = (
  fieldId: string,
  conditionalFieldsConfig: Condition[],
  watchedValues: any[]
): boolean => {
  const isConditionalField = conditionalFieldsConfig.some(condition =>
    condition.fields.includes(fieldId)
  );

  if (!isConditionalField) {
    return true;
  }

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
};
