import { Condition } from '../types';
/**
 * Determines if a field should be rendered based on the conditional logic.
 *
 * @param fieldId - The ID of the field to check.
 * @param conditionalFieldsConfig - The conditional fields configuration.
 * @param watchedValues - The watched values from useWatch.
 * @returns True if the field should be rendered, false otherwise.
 */
export declare const shouldRenderField: (fieldId: string, conditionalFieldsConfig: Condition[], watchedValues: any[]) => boolean;
