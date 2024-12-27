// RepeaterFields.tsx
// src/features/repeater/components/RepeaterFields.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import renderInputComponent from '../../inputs/components/InputRenderer';
import {
  FieldConfig,
  FormField,
  FormClassNameConfig,
  RepeaterFieldConfig,
} from '../../core/types';
import { RepeaterFieldsProps } from '../types';

const RepeaterFields: React.FC<RepeaterFieldsProps> = ({
  index,
  repeaterId,
  flattenedFieldsConfig,
  fieldConfig,
  formClassNameConfig,
}) => {
  const { formState } = useFormContext();

  return (
    <>
      {Object.entries(flattenedFieldsConfig).map(([fieldId, config]) => {
        const field: FormField = {
          label: config.label,
          id: `${repeaterId}.${index}.${fieldId}`,
          type: config.type || 'text',
          error: formState.errors?.[repeaterId]?.[index]?.[fieldId] as any,
        };
        return (
          <React.Fragment key={field.id}>
            {renderInputComponent({
              field,
              config: {
                ...flattenedFieldsConfig,
                //[`${repeaterId}.${index}.${fieldId}`]: config, // remove this line
              },
              formClassNameConfig,
            })}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default RepeaterFields;
