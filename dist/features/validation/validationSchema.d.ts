import * as yup from 'yup';
import { FormConfig } from '../dynamic-form';
/**
 * Creates a Yup validation schema based on the provided form configuration.
 *
 * @param config - The form configuration.
 * @returns The Yup schema.
 */
export declare const createValidationSchema: (config: FormConfig) => yup.ObjectSchema<{
    [x: string]: never;
}, yup.AnyObject, {
    [x: string]: any;
}, "">;
