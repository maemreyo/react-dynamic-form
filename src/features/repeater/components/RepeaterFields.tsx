// Filename: /src/features/repeater/components/RepeaterFields.tsx

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import renderInputComponent from '../../inputs/components/InputRenderer';
import { FieldConfig, FormField, FormClassNameConfig } from '../../core/types';
import { RepeaterFieldsProps } from '../types';
import useRepeaterFields from '../hooks/useRepeaterFields';

const RepeaterFields: React.FC<RepeaterFieldsProps> = ({
  index,
  repeaterId,
  fieldId,
  flattenedFieldsConfig,
  fieldConfig,
  formClassNameConfig,
}) => {
  const form = useFormContext();
  const { fields } = useRepeaterFields({
    index,
    repeaterId,
    fieldId,
    flattenedFieldsConfig,
    fieldConfig,
    form,
  });

  return (
    <>
      {fields.map(({ field, formField, config, rules }) => (
        <Controller
          key={field.name}
          name={field.name}
          control={form.control}
          defaultValue=""
          rules={rules}
          render={({ field: renderField, fieldState }) => {
            return (
              <React.Fragment key={field.name}>
                {renderInputComponent({
                  field: {
                    ...formField,
                    ...renderField,
                    error: fieldState.error,
                  },
                  config,
                  formClassNameConfig,
                })}
              </React.Fragment>
            );
          }}
        />
      ))}
    </>
  );
};

export default RepeaterFields;
