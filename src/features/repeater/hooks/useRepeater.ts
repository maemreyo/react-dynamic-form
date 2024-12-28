// Filename: /src/features/repeater/hooks/useRepeater.ts

import { useEffect, useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { RepeaterFieldConfig } from '../../core/types';

interface UseRepeaterProps {
  repeaterId: string;
  fieldConfig: RepeaterFieldConfig;
}

interface UseRepeaterReturn {
  fields: { id: string }[];
  handleAppend: () => void;
  handleRemove: (index: number) => void;
}

const useRepeater = ({
  repeaterId,
  fieldConfig,
}: UseRepeaterProps): UseRepeaterReturn => {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: repeaterId,
  });

  console.log(`[useRepeater] fields for ${repeaterId}`, fields);
  const handleAppend = () => {
    append({});
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  // Log when the repeater field is watched
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      // if (name === repeaterId) {
      //   console.log(`[useRepeater] Watch triggered for ${repeaterId}`, value[repeaterId]);
      // }
      // Watch the array of fields instead of a single string
      if (Array.isArray(value[repeaterId])) {
        console.log(
          `[useRepeater] Watch triggered for ${repeaterId}`,
          value[repeaterId]
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, repeaterId]);

  // Use JSON.stringify(fieldConfig) in dependency list
  const memoizedFields = useMemo(() => fields, [
    fields,
    JSON.stringify(fieldConfig),
  ]);

  return { fields: memoizedFields, handleAppend, handleRemove };
};

export default useRepeater;
