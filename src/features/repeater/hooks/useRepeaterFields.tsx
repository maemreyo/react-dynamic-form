// Filename: /src/features/repeater/hooks/useRepeaterFields.ts

import { useMemo } from 'react';
import {
  FieldValues,
  UseFormReturn,
  ControllerRenderProps,
  RegisterOptions,
} from 'react-hook-form';
import { FormField, FieldConfig, RepeaterFieldConfig } from '../../core/types';

interface UseRepeaterFieldsProps {
  index: number;
  repeaterId: string;
  fieldId: string;
  flattenedFieldsConfig: Record<string, FieldConfig>;
  fieldConfig: RepeaterFieldConfig;
  form: UseFormReturn<FieldValues>;
  parentFieldId?: string;
}

type UseRepeaterFieldsReturn = {
  fields: {
    field: ControllerRenderProps<FieldValues, string>;
    formField: FormField;
    config: {
      [key: string]: FieldConfig;
    };
    rules: RegisterOptions;
  }[];
};

const useRepeaterFields = ({
  index,
  repeaterId,
  fieldId,
  flattenedFieldsConfig,
  fieldConfig,
  form,
  parentFieldId,
}: UseRepeaterFieldsProps): UseRepeaterFieldsReturn => {
  const fields = useMemo(() => {
    return Object.entries(flattenedFieldsConfig).map(
      ([nestedFieldId, config]) => {
        // Construct fullNestedFieldId using parentFieldId
        const fullNestedFieldId = parentFieldId
          ? `${parentFieldId}.${index}.${nestedFieldId}`
          : `${repeaterId}.${index}.${nestedFieldId}`;
        const validationRules = fieldConfig.fields?.[nestedFieldId]?.validation;
        console.log(
          `[useRepeaterFields] Creating field: ${fullNestedFieldId}`,
          validationRules
        );
        return {
          field: {
            name: fullNestedFieldId,
            onBlur: () => {},
            onChange: () => {},
            ref: () => {},
            value: (form.watch(fullNestedFieldId) || '') as string,
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
          rules: validationRules as RegisterOptions,
        };
      }
    );
  }, [
    index,
    repeaterId,
    flattenedFieldsConfig,
    JSON.stringify(fieldConfig),
    parentFieldId,
  ]);

  return { fields };
};

export default useRepeaterFields;
