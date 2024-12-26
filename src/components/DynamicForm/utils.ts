import { FieldConfig, InputType, InputData, InputGroup } from './types';
import { UseFormRegister } from 'react-hook-form';

/**
 * Maps a value to an InputType.
 *
 * @param value - The value to map.
 * @returns The corresponding InputType.
 */
export const mapInputType = (value: any): InputType => {
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

/**
 * Flattens a nested object into a single-level object.
 *
 * @param obj - The object to flatten.
 * @param parentKey - The parent key (used for recursion).
 * @param result - The resulting flattened object.
 * @returns The flattened object.
 */
export const flattenObject = (
  obj: Record<string, any>,
  parentKey = '',
  result: Record<string, any> = {}
) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        flattenObject(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
};

/**
 * Generates an array of InputData or InputGroup objects from a data object.
 *
 * @param data - The data object.
 * @param config - The form configuration.
 * @param register - The `react-hook-form` register function.
 * @param readOnly - Whether the form is in read-only mode.
 * @param disableForm - Whether the form is disabled.
 * @param formState - The `react-hook-form` form state.
 * @returns An array of InputData or InputGroup objects.
 */
export function generateInputsFromObject(
  data: Record<string, any>,
  config: Record<string, FieldConfig> | undefined,
  register: UseFormRegister<any>,
  readOnly: boolean | undefined,
  disableForm: boolean | undefined,
  formState: any
): (InputData | InputGroup)[] {
  // TODO: Implement nested object rendering
  // Always flatten object data
  const flattenedData = flattenObject(data);

  const inputs: (InputData | InputGroup)[] = [];
  for (const key in flattenedData) {
    if (flattenedData.hasOwnProperty(key)) {
      const value = flattenedData[key];
      const fieldConfig = config?.[key] || ({} as FieldConfig);
      const inputType: InputType = fieldConfig.type || mapInputType(value);
      const validationConfig = fieldConfig.validation;
      const inputProps: any = {
        type: inputType,
        name: key,
        id: key,
        placeholder: fieldConfig.placeholder,
        readOnly:
          fieldConfig.readOnly !== undefined ? fieldConfig.readOnly : readOnly,
        disabled: disableForm,
        label: fieldConfig.label,
        value: value,
      };
      const registerProps: any = {};
      if (validationConfig) {
        if (validationConfig.required) {
          registerProps.required =
            typeof validationConfig.required === 'string'
              ? validationConfig.required
              : 'This field is required';
        }
        if (validationConfig.minLength) {
          registerProps.minLength =
            typeof validationConfig.minLength === 'number'
              ? {
                  value: validationConfig.minLength,
                  message: `Minimum length is ${validationConfig.minLength}`,
                }
              : validationConfig.minLength;
        }
        if (validationConfig.maxLength) {
          registerProps.maxLength =
            typeof validationConfig.maxLength === 'number'
              ? {
                  value: validationConfig.maxLength,
                  message: `Maximum length is ${validationConfig.maxLength}`,
                }
              : validationConfig.maxLength;
        }
        if (validationConfig.pattern) {
          registerProps.pattern =
            validationConfig.pattern instanceof RegExp
              ? {
                  value: validationConfig.pattern,
                  message: 'Invalid format',
                }
              : validationConfig.pattern;
        }
        if (validationConfig.validate) {
          registerProps.validate = validationConfig.validate;
        }
      }

      // Handle readOnly for custom components
      if (fieldConfig.component) {
        inputProps.readOnly =
          fieldConfig.readOnly !== undefined ? fieldConfig.readOnly : readOnly;
      }

      inputs.push({
        label: fieldConfig.label || key,
        inputProps: fieldConfig.component
          ? { ...inputProps, ...register(key, registerProps) }
          : { ...inputProps, ...register(key, registerProps) },
        id: key,
        error: formState?.errors?.[key]?.message,
      });
    }
  }
  return inputs;
}

/**
 * Debounces a function.
 *
 * @param func - The function to debounce.
 * @param wait - The debounce time in milliseconds.
 * @returns The debounced function.
 */
export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout | null;
  return function(...args: any[]) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Saves data to localStorage.
 *
 * @param key - The key to store the data under.
 * @param data - The data to store.
 */
export const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

/**
 * Loads data from localStorage.
 *
 * @param key - The key to load the data from.
 * @returns The loaded data, or null if no data is found.
 */
export const loadFromLocalStorage = (key: string): any | null => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
