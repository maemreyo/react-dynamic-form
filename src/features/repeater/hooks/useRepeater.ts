// Filename: /src/features/repeater/hooks/useRepeater.ts

import { useMemo } from 'react';
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
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: repeaterId,
  });

  const handleAppend = () => {
    append({});
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  // Use JSON.stringify(fieldConfig) in dependency list
  const memoizedFields = useMemo(() => fields, [
    fields,
    JSON.stringify(fieldConfig),
  ]);

  return { fields: memoizedFields, handleAppend, handleRemove };
};

export default useRepeater;
