import * as yup from 'yup';
import { InputType } from '../dynamic-form';
/**
 * Registers a new validation schema for a given type.
 *
 * @param type - The input type to register.
 * @param schema - The Yup schema to register.
 */
export declare const registerValidationSchema: (type: InputType, schema: yup.AnySchema) => void;
/**
 * Retrieves the validation schema registered for a given input type.
 *
 * @param type - The input type to retrieve the schema for.
 * @returns The registered schema, or undefined if no schema is registered for the type.
 */
export declare const getValidationSchema: (type: InputType) => yup.AnySchema | undefined;
