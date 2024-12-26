// utils/formUtils.ts
import { RegisterOptions } from 'react-hook-form';

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
