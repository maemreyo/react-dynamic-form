// utils.ts
// src/features/repeater/utils.ts

import { FormConfig } from "../core/types";

/**
 * Gets the default values for a repeater field.
 *
 * @param fields - The fields of the repeater.
 * @returns The default values.
 */
export const getDefaultValues = (fields: FormConfig = {}): any => {
  const defaultValues: any = {};
  for (const fieldId in fields) {
    const fieldConfig = fields[fieldId];
    if (fieldConfig.type === 'number') {
      defaultValues[fieldId] = 0;
    } else if (
      fieldConfig.type === 'checkbox' ||
      fieldConfig.type === 'switch'
    ) {
      defaultValues[fieldId] = false;
    } else {
      defaultValues[fieldId] = '';
    }
  }
  return defaultValues;
};
