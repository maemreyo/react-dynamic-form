// src/features/validation/validationSchema.ts

import * as yup from 'yup';
import { AnySchema } from 'yup';
import { FormConfig } from '../core/types';
import { getValidationRules } from './customValidators';

/**
 * Creates a Yup validation schema based on the provided form configuration.
 *
 * @param config - The form configuration.
 * @returns The Yup schema.
 */
export const createValidationSchema = (config: FormConfig) => {
  const shape: { [key: string]: any } = {};
  for (const fieldId in config) {
    const fieldConfig = config[fieldId];
    const { validation, type } = fieldConfig;

    // Even without explicit type, add field to shape to avoid null
    if (type === undefined) {
      console.warn(`Field type is undefined for field: ${fieldId}`);
    }

    if (validation) {
      let fieldSchema: yup.AnySchema = yup.mixed();

      switch (type) {
        case 'text':
        case 'email':
        case 'password':
        case 'tel':
        case 'url':
        case 'textarea':
        case 'combobox':
          fieldSchema = yup.string();
          break;
        case 'number':
          fieldSchema = yup.number();
          break;
        case 'checkbox':
        case 'switch':
        case 'radio':
          fieldSchema = yup.boolean();
          break;
        case 'date':
        case 'time':
        case 'datetime-local':
          fieldSchema = yup.date();
          break;
        case 'select': // Assuming select values are strings
          fieldSchema = yup.string();
          break;
        default:
          fieldSchema = yup.mixed();
      }

      for (const rule in validation) {
        const ruleValue = validation[rule];

        switch (rule) {
          case 'required':
            if (fieldSchema instanceof yup.StringSchema) {
              fieldSchema = (ruleValue
                ? fieldSchema.required(
                    typeof ruleValue === 'string'
                      ? ruleValue
                      : 'This field is required'
                  )
                : fieldSchema) as AnySchema;
            }
            break;
          case 'minLength':
            if (fieldSchema instanceof yup.StringSchema) {
              if (typeof ruleValue === 'number') {
                fieldSchema = fieldSchema.min(
                  ruleValue,
                  `Minimum length is ${ruleValue}`
                ) as AnySchema;
              } else if (typeof ruleValue === 'object' && ruleValue.value) {
                fieldSchema = fieldSchema.min(
                  ruleValue.value,
                  ruleValue.message || `Minimum length is ${ruleValue.value}`
                ) as AnySchema;
              }
            }
            break;
          case 'maxLength':
            if (fieldSchema instanceof yup.StringSchema) {
              if (typeof ruleValue === 'number') {
                fieldSchema = fieldSchema.max(
                  ruleValue,
                  `Maximum length is ${ruleValue}`
                ) as AnySchema;
              } else if (typeof ruleValue === 'object' && ruleValue.value) {
                fieldSchema = fieldSchema.max(
                  ruleValue.value,
                  ruleValue.message || `Maximum length is ${ruleValue.value}`
                ) as AnySchema;
              }
            }
            break;
          case 'pattern':
            if (fieldSchema instanceof yup.StringSchema) {
              if (ruleValue instanceof RegExp) {
                fieldSchema = fieldSchema.matches(
                  ruleValue,
                  'Invalid format'
                ) as AnySchema;
              } else if (typeof ruleValue === 'object' && ruleValue.value) {
                fieldSchema = fieldSchema.matches(
                  ruleValue.value,
                  ruleValue.message || 'Invalid format'
                ) as AnySchema;
              }
            }
            break;
          case 'min':
            if (fieldSchema instanceof yup.NumberSchema) {
              fieldSchema = fieldSchema.min(
                +ruleValue,
                `Value must be greater than or equal to ${ruleValue}`
              ) as AnySchema;
            }
            break;
          case 'max':
            if (fieldSchema instanceof yup.NumberSchema) {
              fieldSchema = fieldSchema.max(
                +ruleValue,
                `Value must be less than or equal to ${ruleValue}`
              ) as AnySchema;
            }
            break;
          case 'validate':
            const customRules = getValidationRules(fieldConfig);
            customRules.forEach(({ name, validator }) => {
              fieldSchema = fieldSchema.test(
                name,
                'Validation failed',
                validator
              ) as AnySchema;
            });
            break;
          default:
            console.warn(`Unknown validation rule: ${rule}`);
        }
      }

      shape[fieldId] = fieldSchema;
    }
  }
  return yup.object().shape(shape); // Always return a yup object, even if shape is empty
};
