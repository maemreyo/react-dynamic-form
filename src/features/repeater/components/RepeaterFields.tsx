// RepeaterFields.tsx
// src/features/repeater/components/RepeaterFields.tsx
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import renderInputComponent from '../../inputs/components/InputRenderer';
import { FieldConfig, FormField, FormClassNameConfig } from '../../core/types';
import { RepeaterFieldsProps } from '../types';

const RepeaterFields: React.FC<RepeaterFieldsProps> = ({
  index,
  repeaterId,
  fieldId,
  flattenedFieldsConfig,
  fieldConfig,
  formClassNameConfig,
}) => {
  const { control } = useFormContext();

  return (
    <>
      {Object.entries(flattenedFieldsConfig).map(([nestedFieldId, config]) => {
        const fullNestedFieldId = `${repeaterId}.${index}.${nestedFieldId}`;
        console.log('[RepeaterFields] fullNestedFieldId', fullNestedFieldId);
        const validationRules = fieldConfig.fields?.[nestedFieldId]?.validation;
        console.log('[RepeaterFields] validationRules', validationRules);
        return (
          <Controller
            key={nestedFieldId}
            name={fullNestedFieldId}
            control={control}
            defaultValue=""
            rules={validationRules} // Truyền validation rules vào đây
            render={({ field, fieldState }) => {
              const formField: FormField = {
                label: fieldConfig.fields?.[nestedFieldId]?.label,
                id: field.name,
                type: config.type || 'text',
                error: fieldState.error,
              };

              return renderInputComponent({
                field: { ...field, ...formField },
                config: {
                  [field.name]: fieldConfig.fields?.[nestedFieldId]!,
                },
                formClassNameConfig,
              });
            }}
          />
        );
      })}
    </>
  );
};

export default RepeaterFields;
