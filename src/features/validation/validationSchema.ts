// validationSchema.ts
// src/features/validation/validationSchema.ts

import * as yup from 'yup';
import { AnySchema } from 'yup';
import {
  FormConfig,
  RepeaterFieldConfig,
  InputFieldConfig,
  SelectFieldConfig,
  CheckboxFieldConfig,
  RadioFieldConfig,
  TextAreaFieldConfig,
  SwitchFieldConfig,
  DateFieldConfig,
  TimeFieldConfig,
  DateTimeFieldConfig,
  ComboBoxFieldConfig,
} from '../core/types';
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

    if (type === undefined) {
      console.warn(`Field type is undefined for field: ${fieldId}`);
      continue;
    }

    if (validation) {
      let fieldSchema: yup.AnySchema = createFieldSchema(
        fieldConfig as any,
        validation
      );
      shape[fieldId] = fieldSchema;
    }
  }

  return Object.keys(shape).length > 0
    ? yup.object().shape(shape)
    : yup.object();
};

const createFieldSchema = (
  fieldConfig:
    | InputFieldConfig
    | SelectFieldConfig
    | CheckboxFieldConfig
    | RadioFieldConfig
    | TextAreaFieldConfig
    | SwitchFieldConfig
    | DateFieldConfig
    | TimeFieldConfig
    | DateTimeFieldConfig
    | ComboBoxFieldConfig
    | RepeaterFieldConfig,
  validation: Record<string, any>
): yup.AnySchema => {
  let fieldSchema: yup.AnySchema = yup.mixed();

  switch (fieldConfig.type) {
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
    case 'radio':
      fieldSchema = yup.string();
      break;
    case 'repeater':
      const repeaterConfig = fieldConfig as RepeaterFieldConfig;
      const repeaterSchema = createValidationSchema(repeaterConfig.fields);
      fieldSchema = yup.array().of(repeaterSchema);
      if (validation.minItems) {
        fieldSchema = fieldSchema.min(
          validation.minItems,
          `Must have at least ${validation.minItems} items`
        );
      }
      if (validation.maxItems) {
        fieldSchema = fieldSchema.max(
          validation.maxItems,
          `Must have at most ${validation.maxItems} items`
        );
      }
      break;
    default:
      fieldSchema = yup.mixed();
  }

  for (const rule in validation) {
    const ruleValue = validation[rule];
    fieldSchema = applyValidationRule(
      fieldSchema,
      fieldConfig,
      rule,
      ruleValue
    );
  }

  return fieldSchema;
};

const applyValidationRule = (
  fieldSchema: yup.AnySchema,
  fieldConfig:
    | InputFieldConfig
    | SelectFieldConfig
    | CheckboxFieldConfig
    | RadioFieldConfig
    | TextAreaFieldConfig
    | SwitchFieldConfig
    | DateFieldConfig
    | TimeFieldConfig
    | DateTimeFieldConfig
    | ComboBoxFieldConfig
    | RepeaterFieldConfig,
  rule: string,
  ruleValue: any
): yup.AnySchema => {
  switch (rule) {
    case 'required':
      if (
        fieldSchema instanceof yup.StringSchema ||
        fieldSchema instanceof yup.ArraySchema
      ) {
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
      if (
        fieldSchema instanceof yup.NumberSchema ||
        fieldSchema instanceof yup.DateSchema
      ) {
        fieldSchema = fieldSchema.min(
          +ruleValue,
          `Value must be greater than or equal to ${ruleValue}`
        ) as AnySchema;
      }
      break;
    case 'max':
      if (
        fieldSchema instanceof yup.NumberSchema ||
        fieldSchema instanceof yup.DateSchema
      ) {
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
    case 'minItems':
    case 'maxItems':
      // Handled in repeater case
      break;
    default:
      console.warn(`Unknown validation rule: ${rule}`);
  }

  return fieldSchema;
};
