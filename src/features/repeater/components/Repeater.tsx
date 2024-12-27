// Repeater.tsx
// src/features/repeater/components/Repeater.tsx
import React, { useMemo, useEffect, useRef } from 'react';
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
  const { control, register, unregister } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: id,
  });
  const registeredFieldsRef = useRef<string[]>([]);

  const flattenedFieldsConfig = useMemo(
    () => flattenConfig(fieldConfig.fields || {}),
    [fieldConfig.fields]
  );

  const registerNestedFields = (index: number) => {
    Object.keys(flattenedFieldsConfig).forEach(fieldId => {
      const nestedFieldId = `${id}.${index}.${fieldId}`;
      if (!registeredFieldsRef.current.includes(nestedFieldId)) {
        register(nestedFieldId, flattenedFieldsConfig[fieldId]?.validation);
        registeredFieldsRef.current.push(nestedFieldId);
      }
    });
  };

  const unregisterNestedFields = (index: number) => {
    Object.keys(flattenedFieldsConfig).forEach(fieldId => {
      const nestedFieldId = `${id}.${index}.${fieldId}`;
      unregister(nestedFieldId);
      registeredFieldsRef.current = registeredFieldsRef.current.filter(
        field => field !== nestedFieldId
      );
    });
  };

  useEffect(() => {
    fields.forEach((field, index) => {
      registerNestedFields(index);
    });

    return () => {
      fields.forEach((field, index) => {
        unregisterNestedFields(index);
      });
    };
  }, [fields, flattenedFieldsConfig, id, register, unregister]);

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
