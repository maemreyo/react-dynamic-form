import React, { useMemo } from 'react';
import { RepeaterProps } from '../types';
import { AddButton, RemoveButton } from '../styles';
import RepeaterFields from './RepeaterFields';
import { flattenConfig } from '../../core/utils';
import useRepeater from '../hooks/useRepeater';
import { useFormContext } from 'react-hook-form';

const Repeater: React.FC<RepeaterProps> = ({
  id,
  fieldConfig,
  formClassNameConfig,
}) => {
  const { fields, handleAppend, handleRemove } = useRepeater({
    repeaterId: id,
    fieldConfig,
  });

  const flattenedFieldsConfig = flattenConfig(fieldConfig.fields || {});

  // Pass form down to RepeaterFields
  const form = useFormContext();

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
            form={form}
            parentFieldId={id} // Pass id as parentFieldId
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
