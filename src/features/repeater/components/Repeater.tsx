// Repeater.tsx
// src/features/repeater/components/Repeater.tsx
import React, { useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { RepeaterProps, AddButtonProps, RemoveButtonProps } from '../types';
import {
  AddButton as DefaultAddButton,
  RemoveButton as DefaultRemoveButton,
} from '../styles';
import RepeaterFields from './RepeaterFields';
import { flattenConfig } from '../../core/utils';

const Repeater: React.FC<RepeaterProps> = ({
  id,
  fieldConfig,
  formClassNameConfig,
}) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: id,
  });

  const flattenedFieldsConfig = useMemo(
    () => flattenConfig(fieldConfig.fields || {}),
    [fieldConfig.fields]
  );

  const AddButton = fieldConfig.addButtonComponent || DefaultAddButton;
  const RemoveButton = fieldConfig.removeButtonComponent || DefaultRemoveButton;

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id}>
          <RepeaterFields
            index={index}
            repeaterId={id}
            flattenedFieldsConfig={flattenedFieldsConfig}
            fieldConfig={fieldConfig}
            formClassNameConfig={formClassNameConfig}
          />
          <RemoveButton
            index={index}
            onRemove={remove}
            repeaterId={id}
            fieldConfig={fieldConfig}
            formClassNameConfig={formClassNameConfig}
            disabled={fields.length <= (fieldConfig.minItems || 0)}
          />
        </div>
      ))}
      <AddButton
        onAppend={append}
        repeaterId={id}
        fieldConfig={fieldConfig}
        formClassNameConfig={formClassNameConfig}
        disabled={fields.length >= (fieldConfig.maxItems || Infinity)}
      />
    </div>
  );
};

export default Repeater;
