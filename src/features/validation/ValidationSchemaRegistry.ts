import * as yup from 'yup';
import { InputType } from '../dynamic-form';

// Create a map of input types to Yup schema
const validationSchemaRegistry: Record<
  InputType | string,
  yup.AnySchema | undefined
> = {
  text: yup.string(),
  email: yup.string().email('Invalid email format'),
  password: yup.string(),
  tel: yup.string(),
  url: yup.string().url('Invalid URL format'),
  checkbox: yup.boolean(),
  textarea: yup.string(),
  select: yup.string(),
  radio: yup.boolean(),
  date: yup.date(),
  number: yup.number(),
  switch: yup.boolean(),
  time: yup.string(),
  'datetime-local': yup.string(),
  combobox: yup.string(),
};

/**
 * Registers a new validation schema for a given type.
 *
 * @param type - The input type to register.
 * @param schema - The Yup schema to register.
 */
export const registerValidationSchema = (
  type: InputType | string,
  schema: yup.AnySchema
) => {
  console.log(
    `[registerValidationSchema] Registering schema for type: ${type}`,
    schema
  );

  validationSchemaRegistry[type] = schema;
};

/**
 * Retrieves the validation schema registered for a given input type.
 *
 * @param type - The input type to retrieve the schema for.
 * @returns The registered schema, or undefined if no schema is registered for the type.
 */
export const getValidationSchema = (
  type: InputType | string
): yup.AnySchema | undefined => {
  console.log(`[getValidationSchema] Retrieving schema for type: ${type}`);

  return validationSchemaRegistry[type];
};
