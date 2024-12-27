// Repeater.tsx
// src/features/repeater/components/Repeater.tsx
import React, { useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { RepeaterProps } from '../types';
import { AddButton, RemoveButton } from '../styles';
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

  const handleAppend = () => {
    append({});
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id}>
          <RepeaterFields
            index={index}
            repeaterId={id}
            fieldId={field.id}
            flattenedFieldsConfig={flattenedFieldsConfig}
            fieldConfig={fieldConfig}
            formClassNameConfig={formClassNameConfig}
          />
          <RemoveButton
            $index={index}
            $repeaterId={id}
            $fieldConfig={fieldConfig}
            $formClassNameConfig={formClassNameConfig}
            onClick={() => handleRemove(index)}
            disabled={fields.length <= (fieldConfig.minItems || 0)}
          >
            {fieldConfig.removeButtonLabel || 'Remove'}
          </RemoveButton>
        </div>
      ))}
      <AddButton
        $repeaterId={id}
        $fieldConfig={fieldConfig}
        $formClassNameConfig={formClassNameConfig}
        onClick={handleAppend}
        disabled={fields.length >= (fieldConfig.maxItems || Infinity)}
      >
        {fieldConfig.addButtonLabel || 'Add'}
      </AddButton>
    </div>
  );
};

export default Repeater;
