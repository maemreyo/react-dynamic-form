// src/features/validation/customValidators.ts

import { FieldConfig } from '../dynamic-form';

interface ValidationRule {
  name: string;
  validator: (value: any, context: any) => Promise<boolean> | boolean;
}

export const getValidationRules = (
  fieldConfig: FieldConfig
): ValidationRule[] => {
  const rules: ValidationRule[] = [];
  if (fieldConfig.validation?.validate) {
    rules.push({
      name: 'customValidate',
      validator: async (value: any, context: any) => {
        const result = await fieldConfig.validation?.validate!(value);
        if (typeof result === 'string') {
          // Create a custom error using context.createError
          throw context.createError({ message: result });
        }
        return true;
      },
    });
  }
  return rules;
};
