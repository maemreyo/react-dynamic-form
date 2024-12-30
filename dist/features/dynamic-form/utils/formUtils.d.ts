import { FormConfig } from '../types';
/**
 * Flattens a nested object into a single-level object.
 *
 * @param obj - The object to flatten.
 * @param parentKey - The parent key (used for recursion).
 * @param result - The resulting flattened object.
 * @returns The flattened object.
 */
export declare const flattenObject: (obj: Record<string, any>, parentKey?: string, result?: Record<string, any>) => Record<string, any>;
/**
 * Flattens a nested config object into a single-level object.
 *
 * @param config - The config object to flatten.
 * @param parentKey - The parent key (used for recursion).
 * @param result - The resulting flattened config object.
 * @returns The flattened config object.
 */
export declare const flattenConfig: (config: FormConfig, parentKey?: string, result?: FormConfig) => FormConfig;
/**
 * Debounces a function.
 *
 * @param func - The function to debounce.
 * @param wait - The debounce time in milliseconds.
 * @returns The debounced function.
 */
export declare const debounce: (func: Function, wait: number) => (...args: any[]) => void;
/**
 * Saves data to localStorage.
 *
 * @param key - The key to store the data under.
 * @param data - The data to store.
 */
export declare const saveToLocalStorage: (key: string, data: any) => void;
/**
 * Loads data from localStorage.
 *
 * @param key - The key to load the data from.
 * @returns The loaded data, or null if no data is found.
 */
export declare const loadFromLocalStorage: (key: string) => any | null;
