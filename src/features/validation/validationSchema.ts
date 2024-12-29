// Filepath: /src/features/validation/validationSchema.ts

import * as yup from 'yup';
import { FormConfig, CustomValidator } from '../dynamic-form';
import { getValidationRules } from './customValidators';
import { getValidationSchema } from './ValidationSchemaRegistry';

/**
 * Creates a Yup validation schema based on the provided form configuration.
 *
 * @param config - The form configuration.
 * @returns The Yup schema.
 */
export const createValidationSchema = (
  config: FormConfig,
  customValidators?: Record<
    string,
    (value: any, context: any) => string | undefined
  >
) => {
  const shape: { [key: string]: any } = {};

  for (const fieldId in config) {
    const fieldConfig = config[fieldId];
    const { validation, type, validationMessages } = fieldConfig;

    if (type === undefined) {
      console.warn(`Field type is undefined for field: ${fieldId}`);
    }

    let fieldSchema: yup.AnySchema = getValidationSchema(type!) || yup.mixed();
    // ...other code
    if (validation) {
      const { validate, ...otherValidations } = validation;
      for (const rule in otherValidations) {
        if (otherValidations.hasOwnProperty(rule)) {
          const ruleValue = validation[
            rule as keyof typeof otherValidations
          ] as any; // Explicitly cast to any

          if (rule === 'required') {
            if (typeof ruleValue === 'boolean' && ruleValue) {
              fieldSchema = (fieldSchema as yup.StringSchema).required(
                validation.requiredMessage ||
                  validationMessages?.required ||
                  'This field is required'
              );
            } else if (
              typeof ruleValue === 'object' &&
              ruleValue.value === true
            ) {
              fieldSchema = (fieldSchema as yup.StringSchema).required(
                ruleValue.message ||
                  validationMessages?.required ||
                  'This field is required'
              );
            }
          } else if (
            rule === 'minLength' ||
            rule === 'maxLength' ||
            rule === 'min' ||
            rule === 'max'
          ) {
            if (typeof ruleValue === 'number') {
              if (typeof (fieldSchema as any)[rule] === 'function') {
                fieldSchema = (fieldSchema as any)[rule](
                  ruleValue,
                  validationMessages?.[rule]?.replace(
                    '{value}',
                    ruleValue.toString()
                  ) || `${rule} should be ${ruleValue}`
                );
              }
            } else if (
              typeof ruleValue === 'object' &&
              typeof ruleValue.value === 'number'
            ) {
              if (typeof (fieldSchema as any)[rule] === 'function') {
                fieldSchema = (fieldSchema as any)[rule](
                  ruleValue.value,
                  ruleValue.message ||
                    validationMessages?.[rule]?.replace(
                      '{value}',
                      ruleValue.value.toString()
                    ) ||
                    `${rule} should be ${ruleValue.value}`
                );
              }
            } else if (
              typeof ruleValue === 'object' &&
              typeof ruleValue.value === 'string'
            ) {
              if (typeof (fieldSchema as any)[rule] === 'function') {
                fieldSchema = (fieldSchema as any)[rule](
                  ruleValue.value,
                  ruleValue.message ||
                    validationMessages?.[rule]?.replace(
                      '{value}',
                      ruleValue.value.toString()
                    ) ||
                    `${rule} should be ${ruleValue.value}`
                );
              }
            }
          } else if (rule === 'pattern') {
            if (
              ruleValue instanceof RegExp ||
              (typeof ruleValue === 'object' &&
                ruleValue.value instanceof RegExp)
            ) {
              const regex =
                ruleValue instanceof RegExp ? ruleValue : ruleValue.value;
              const message =
                !(ruleValue instanceof RegExp) && ruleValue.message
                  ? ruleValue.message
                  : validationMessages?.[rule] || 'Invalid format';
              fieldSchema = (fieldSchema as yup.StringSchema).matches(
                regex,
                message
              );
            } else if (
              typeof ruleValue === 'object' &&
              typeof ruleValue.value === 'string'
            ) {
              // Handle string pattern (e.g., when passed as a string from JSON)
              const regex = new RegExp(ruleValue.value);
              const message =
                ruleValue.message ||
                validationMessages?.[rule] ||
                'Invalid format';
              fieldSchema = (fieldSchema as yup.StringSchema).matches(
                regex,
                message
              );
            }
          }
        }
      }

      if (typeof validate === 'function') {
        const customValidator = validate as CustomValidator;
        fieldSchema = fieldSchema.test(
          'custom-validation',
          'Custom validation failed',
          async (value, context) => {
            const result = await customValidator(value, context.parent);
            if (typeof result === 'string') {
              return context.createError({
                path: context.path,
                message: result,
              });
            }
            return result !== false;
          }
        );
      }
    }

    shape[fieldId] = fieldSchema;
  }

  return yup.object().shape(shape);
};
