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
  const {
    control,
    register,
    unregister,
    getValues,
    setValue,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: id,
  });
  const registeredFieldsRef = useRef<string[]>([]);
  const fieldArrayValuesRef = useRef<Record<string, any>[]>([]);

  const flattenedFieldsConfig = useMemo(
    () => flattenConfig(fieldConfig.fields || {}),
    [fieldConfig.fields]
  );

  const registerNestedFields = (index: number) => {
    Object.keys(flattenedFieldsConfig).forEach(fieldId => {
      const nestedFieldId = `${id}.${index}.${fieldId}`;
      const validationRules = fieldConfig.fields?.[fieldId]?.validation;

      if (
        !registeredFieldsRef.current.includes(nestedFieldId) &&
        validationRules
      ) {
        register(nestedFieldId, validationRules);
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
    const unregisterAllNestedFields = () => {
      registeredFieldsRef.current.forEach(fieldId => {
        unregister(fieldId);
      });
      registeredFieldsRef.current = [];
    };

    fields.forEach((field, index) => {
      registerNestedFields(index);
    });

    return () => {
      unregisterAllNestedFields();
    };
  }, [fields, flattenedFieldsConfig, id, register, unregister]);

  useEffect(() => {
    fieldArrayValuesRef.current = getValues(id) || [];
  }, [fields, getValues, id]);

  const handleAppend = () => {
    const newIndex = fields.length;
    append({});
    const newValues = [...fieldArrayValuesRef.current];
    newValues.push({});
    fieldArrayValuesRef.current = newValues;
  };

  const handleRemove = (index: number) => {
    const newValues = [...fieldArrayValuesRef.current];
    newValues.splice(index, 1);
    fieldArrayValuesRef.current = newValues;

    unregisterNestedFields(index);
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
