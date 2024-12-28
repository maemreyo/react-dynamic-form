// useRepeaterFields.ts
// src/features/repeater/hooks/useRepeaterFields.ts
import { useMemo } from 'react';
import {
  UseFormRegister,
  FieldValues,
  UseFormReturn,
  ControllerRenderProps,
} from 'react-hook-form';
import { FormField, FieldConfig, RepeaterFieldConfig } from '../../core/types';

interface UseRepeaterFieldsProps {
  index: number;
  repeaterId: string;
  fieldId: string;
  flattenedFieldsConfig: Record<string, FieldConfig>;
  fieldConfig: RepeaterFieldConfig;
  form: UseFormReturn<FieldValues>;
}

type UseRepeaterFieldsReturn = {
  fields: {
    field: ControllerRenderProps<FieldValues, string>;
    formField: FormField;
    config: {
      [key: string]: FieldConfig;
    };
    rules: any
  }[];
};

const useRepeaterFields = ({
  index,
  repeaterId,
  fieldId,
  flattenedFieldsConfig,
  fieldConfig,
  form,
}: UseRepeaterFieldsProps): UseRepeaterFieldsReturn => {

  const fields = useMemo(() => {
    return Object.entries(flattenedFieldsConfig).map(
      ([nestedFieldId, config]) => {
        const fullNestedFieldId = `${repeaterId}.${index}.${nestedFieldId}`;
        const validationRules = fieldConfig.fields?.[nestedFieldId]?.validation;
        console.log('[useRepeaterFields] fullNestedFieldId', fullNestedFieldId);
        console.log('[useRepeaterFields] validationRules', validationRules);
        return {
          field: {
            name: fullNestedFieldId,
            onBlur: () => {},
            onChange: () => {},
            ref: () => {},
            value: form.watch(fullNestedFieldId) || '',
          },
          formField: {
            label: fieldConfig.fields?.[nestedFieldId]?.label,
            id: fullNestedFieldId,
            type: config.type || 'text',
            error: form.formState.errors[fullNestedFieldId] as any,
          },
          config: {
            [fullNestedFieldId]: {
              ...fieldConfig.fields?.[nestedFieldId]!,
              validation: validationRules,
            },
          },
          rules: validationRules,
        };
      }
    );
  }, [index, repeaterId, flattenedFieldsConfig, fieldConfig, form]);

  return { fields };
};

export default useRepeaterFields;
