import { useMemo } from 'react';
import { debounce } from '../utils';

/**
 * Custom hook for debouncing a function.
 *
 * @param callback - The function to debounce.
 * @param delay - The debounce delay in milliseconds.
 * @returns The debounced function.
 */
const useDebounce = (callback: Function | undefined, delay: number) => {
  return useMemo(() => {
    return delay > 0 && callback ? debounce(callback, delay) : callback;
  }, [callback, delay]);
};

export default useDebounce;
