// src/features/dynamic-form/utils/formUtils.ts
import {
  FieldClassNameConfig,
  FormClassNameConfig,
  FormConfig,
} from '../types';

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
): Record<string, any> => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
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
 * Flattens a nested config object into a single-level object.
 *
 * @param config - The config object to flatten.
 * @param parentKey - The parent key (used for recursion).
 * @param result - The resulting flattened config object.
 * @returns The flattened config object.
 */
export const flattenConfig = (
  config: FormConfig,
  parentKey = '',
  result: FormConfig = {}
): FormConfig => {
  for (const key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      const fieldConfig = config[key];
      if (fieldConfig.fields) {
        flattenConfig(fieldConfig.fields, newKey, result);
      } else {
        result[newKey] = fieldConfig;
      }
    }
  }
  return result;
};

/**
 * Debounces a function.
 *
 * @param func - The function to debounce.
 * @param wait - The debounce time in milliseconds.
 * @returns The debounced function.
 */
export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout | null;
  return function (...args: any[]) {
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

/**
 * Merges multiple classNameConfig objects into a single object.
 *
 * @param defaultClassNames - The default classNameConfig object.
 * @param formClassNames - The form-level classNameConfig object.
 * @param fieldClassNames - The field-level classNameConfig object.
 * @returns The merged classNameConfig object.
 */
export const mergeClassNames = (
  defaultClassNames: FormClassNameConfig,
  formClassNames?: FormClassNameConfig,
  fieldClassNames?: FieldClassNameConfig
): FormClassNameConfig => {
  return {
    ...defaultClassNames,
    ...formClassNames,
    ...fieldClassNames,
  };
};
