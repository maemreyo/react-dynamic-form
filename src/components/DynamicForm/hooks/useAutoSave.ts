import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

/**
 * Custom hook for implementing auto-save functionality.
 *
 * @param autoSave - Auto-save configuration.
 * @param form - The `react-hook-form` form object.
 */
const useAutoSave = (
  autoSave: { interval: number; save: (data: any) => void } | undefined | null,
  form: UseFormReturn<any>
) => {
  const { getValues } = form;

  useEffect(() => {
    let saveInterval: NodeJS.Timeout;

    if (autoSave) {
      saveInterval = setInterval(() => {
        const values = getValues();
        autoSave.save(values);
      }, autoSave.interval);
    }

    return () => {
      if (saveInterval) {
        clearInterval(saveInterval);
      }
    };
  }, [autoSave, getValues]);
};

export default useAutoSave;
