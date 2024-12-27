// src/features/validation/customValidators.ts


import { FieldConfig } from '../core/types';

interface ValidationRule {
  name: string;
  validator: (value: any) => Promise<boolean> | boolean;
}

export const getValidationRules = (
  fieldConfig: FieldConfig
): ValidationRule[] => {
  const rules: ValidationRule[] = [];

  if (fieldConfig.validation?.validate) {
    rules.push({
      name: 'customValidate',
      validator: async (value: any) => {
        const result = await fieldConfig.validation?.validate!(value);
        if (typeof result === 'string') {
          return Promise.reject(new Error(result));
        }
        return Promise.resolve(true);
      },
    });
  }
  return rules;
};