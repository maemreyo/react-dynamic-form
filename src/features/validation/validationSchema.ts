import * as yup from 'yup';
import {
  FormConfig,
  CustomValidator,
  ValidationMessages,
} from '../dynamic-form';
import { getValidationSchema } from './ValidationSchemaRegistry';

/**
 * Handles the 'required' validation rule.
 *
 * @param fieldSchema - The current field schema.
 * @param ruleValue - The value of the 'required' rule.
 * @param validationMessages - The validation messages.
 * @returns The updated field schema.
 */
const handleRequired = (
  fieldSchema: yup.AnySchema,
  ruleValue: any,
  validationMessages: any
) => {
  const requiredMessage =
    typeof ruleValue === 'object'
      ? ruleValue.message
      : validationMessages?.required || 'This field is required';
  return (fieldSchema as yup.StringSchema).required(requiredMessage);
};

/**
 * Handles the 'minLength' validation rule.
 *
 * @param fieldSchema - The current field schema.
 * @param ruleValue - The value of the 'minLength' rule.
 * @param validationMessages - The validation messages.
 * @returns The updated field schema.
 */
const handleMinLength = (
  fieldSchema: yup.StringSchema,
  ruleValue: any,
  validationMessages: any
) => {
  if (
    typeof ruleValue === 'number' ||
    typeof ruleValue === 'string' ||
    typeof ruleValue?.value === 'number' ||
    typeof ruleValue?.value === 'string'
  ) {
    const value =
      typeof ruleValue === 'number' || typeof ruleValue === 'string'
        ? ruleValue
        : ruleValue.value;
    const message =
      ruleValue.message ||
      validationMessages?.minLength?.replace('{value}', value.toString()) ||
      `minLength should be ${value}`;
    return fieldSchema.min(value, message);
  }
  return fieldSchema;
};

/**
 * Handles the 'maxLength' validation rule.
 *
 * @param fieldSchema - The current field schema.
 * @param ruleValue - The value of the 'maxLength' rule.
 * @param validationMessages - The validation messages.
 * @returns The updated field schema.
 */
const handleMaxLength = (
  fieldSchema: yup.StringSchema,
  ruleValue: any,
  validationMessages: any
) => {
  if (
    typeof ruleValue === 'number' ||
    typeof ruleValue === 'string' ||
    typeof ruleValue?.value === 'number' ||
    typeof ruleValue?.value === 'string'
  ) {
    const value =
      typeof ruleValue === 'number' || typeof ruleValue === 'string'
        ? ruleValue
        : ruleValue.value;
    const message =
      ruleValue.message ||
      validationMessages?.maxLength?.replace('{value}', value.toString()) ||
      `maxLength should be ${value}`;
    return fieldSchema.max(value, message);
  }
  return fieldSchema;
};

/**
 * Handles the 'min' validation rule.
 *
 * @param fieldSchema - The current field schema.
 * @param ruleValue - The value of the 'min' rule.
 * @param validationMessages - The validation messages.
 * @returns The updated field schema.
 */
const handleMin = (
  fieldSchema: yup.NumberSchema,
  ruleValue: any,
  validationMessages: any
) => {
  if (
    typeof ruleValue === 'number' ||
    typeof ruleValue === 'string' ||
    typeof ruleValue?.value === 'number' ||
    typeof ruleValue?.value === 'string'
  ) {
    const value =
      typeof ruleValue === 'number' || typeof ruleValue === 'string'
        ? ruleValue
        : ruleValue.value;
    const message =
      ruleValue.message ||
      validationMessages?.min?.replace('{value}', value.toString()) ||
      `min should be ${value}`;
    return fieldSchema.min(value, message);
  }
  return fieldSchema;
};

/**
 * Handles the 'max' validation rule.
 *
 * @param fieldSchema - The current field schema.
 * @param ruleValue - The value of the 'max' rule.
 * @param validationMessages - The validation messages.
 * @returns The updated field schema.
 */
const handleMax = (
  fieldSchema: yup.NumberSchema,
  ruleValue: any,
  validationMessages: any
) => {
  if (
    typeof ruleValue === 'number' ||
    typeof ruleValue === 'string' ||
    typeof ruleValue?.value === 'number' ||
    typeof ruleValue?.value === 'string'
  ) {
    const value =
      typeof ruleValue === 'number' || typeof ruleValue === 'string'
        ? ruleValue
        : ruleValue.value;
    const message =
      ruleValue.message ||
      validationMessages?.max?.replace('{value}', value.toString()) ||
      `max should be ${value}`;
    return fieldSchema.max(value, message);
  }
  return fieldSchema;
};

/**
 * Handles the 'pattern' validation rule.
 *
 * @param fieldSchema - The current field schema.
 * @param ruleValue - The value of the 'pattern' rule.
 * @param validationMessages - The validation messages.
 * @returns The updated field schema.
 */
const handlePattern = (
  fieldSchema: yup.StringSchema,
  ruleValue: any,
  validationMessages: any
) => {
  const regex =
    ruleValue instanceof RegExp ? ruleValue : new RegExp(ruleValue.value);
  const message =
    ruleValue.message || validationMessages?.pattern || 'Invalid format';
  return fieldSchema.matches(regex, { message, excludeEmptyString: true });
};

/**
 * Applies a custom validation function to the field schema.
 *
 * @param fieldSchema - The current field schema.
 * @param validate - The custom validation function.
 * @returns The updated field schema.
 */
const applyCustomValidation = (
  fieldSchema: yup.AnySchema,
  validate: CustomValidator
) => {
  return fieldSchema.test(
    'custom-validation',
    'Custom validation failed',
    async (value, context) => {
      const result = await validate(value, context.parent);
      if (typeof result === 'string') {
        return context.createError({
          path: context.path,
          message: result,
        });
      }
      return result !== false;
    }
  );
};

/**
 * Creates a Yup validation schema based on the provided form configuration.
 *
 * @param config - The form configuration.
 * @param globalValidationMessages - Optional global validation messages.
 * @returns The Yup schema.
 */
export const createValidationSchema = (
  config: FormConfig,
  globalValidationMessages?: ValidationMessages
) => {
  const shape: { [key: string]: yup.AnySchema } = {};

  const validationHandlers: {
    [key: string]: (
      fieldSchema: yup.AnySchema,
      ruleValue: any,
      validationMessages: any
    ) => yup.AnySchema;
  } = {
    required: handleRequired,
    minLength: (fieldSchema, ruleValue, validationMessages) =>
      handleMinLength(
        fieldSchema as yup.StringSchema,
        ruleValue,
        validationMessages
      ),
    maxLength: (fieldSchema, ruleValue, validationMessages) =>
      handleMaxLength(
        fieldSchema as yup.StringSchema,
        ruleValue,
        validationMessages
      ),
    min: (fieldSchema, ruleValue, validationMessages) =>
      handleMin(fieldSchema as yup.NumberSchema, ruleValue, validationMessages),
    max: (fieldSchema, ruleValue, validationMessages) =>
      handleMax(fieldSchema as yup.NumberSchema, ruleValue, validationMessages),
    pattern: (fieldSchema, ruleValue, validationMessages) =>
      handlePattern(
        fieldSchema as yup.StringSchema,
        ruleValue,
        validationMessages
      ),
  };
  for (const fieldId in config) {
    const fieldConfig = config[fieldId];
    const { validation, type, validationMessages } = fieldConfig;

    // Merge global and field-level validation messages
    const mergedValidationMessages = {
      ...globalValidationMessages,
      ...validationMessages,
    };

    if (type === undefined) {
      console.warn(`Field type is undefined for field: ${fieldId}`);
    }

    console.log(
      `[createValidationSchema] Processing field: ${fieldId}, type: ${type}`
    );

    let fieldSchema: yup.AnySchema = getValidationSchema(type!) || yup.mixed();

    // Add warning for conflict between validate and registered schema
    if (
      validation &&
      typeof validation.validate === 'function' &&
      getValidationSchema(type!) !== undefined
    ) {
      console.warn(
        `[DynamicForm] Field "${fieldId}" (type: "${type}") has both a custom "validate" function and a registered validation schema. The "validate" function will take precedence.`
      );
    }

    if (validation) {
      const { validate, ...otherValidations } = validation;

      for (const rule in otherValidations) {
        if (otherValidations.hasOwnProperty(rule)) {
          const ruleValue = validation[
            rule as keyof typeof otherValidations
          ] as any;
          const handler = validationHandlers[rule];
          if (handler) {
            fieldSchema = handler(
              fieldSchema,
              ruleValue,
              mergedValidationMessages
            );
          }
        }
      }

      console.log(
        `[createValidationSchema] Applying validation for field: ${fieldId}`,
        validation
      );

      // Custom validation function (validate) is applied AFTER other validation rules,
      // therefore it takes precedence over the schema registered in validationSchemaRegistry.
      if (typeof validate === 'function') {
        fieldSchema = applyCustomValidation(fieldSchema, validate);
      }
    }

    shape[fieldId] = fieldSchema;
  }

  console.log('[createValidationSchema] Generated schema:', shape);

  return yup.object().shape(shape);
};
