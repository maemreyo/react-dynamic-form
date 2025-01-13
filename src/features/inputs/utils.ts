import { InputType } from '../dynamic-form/types';

/**
 * Maps a value to an InputType.
 *
 * @param value - The value to map.
 * @returns The corresponding InputType.
 */
export const getInputTypeFromValue = (value: any): InputType => {
  if (typeof value === 'string') {
    return 'text';
  }
  if (typeof value === 'number') {
    return 'number';
  }
  if (typeof value === 'boolean') {
    return 'checkbox';
  }
  if (Array.isArray(value)) {
    return 'select'; // TODO: Handle array input type
  }
  return 'text'; // Default
};
