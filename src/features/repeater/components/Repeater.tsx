// Repeater.tsx
// src/features/repeater/components/Repeater.tsx
import React, { useMemo, useEffect, useRef } from 'react';
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

  const AddButton = fieldConfig.addButtonComponent || DefaultAddButton;
  const RemoveButton = fieldConfig.removeButtonComponent || DefaultRemoveButton;

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

  const handleAppend = (value: any) => {
    append(value);
    /**
     * The new index will be fields.length
     * because append happens before this callback
     */
    registerNestedFields(fields.length);
  };

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Handle remove button click event.
   * @param index Index of the field to remove
   */
/******  4f6f5edf-23c9-4c5d-ba84-e8151223b2cc  *******/
  const handleRemove = (index: number) => {
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
            index={index}
            onRemove={handleRemove}
            repeaterId={id}
            fieldConfig={fieldConfig}
            formClassNameConfig={formClassNameConfig}
            disabled={fields.length <= (fieldConfig.minItems || 0)}
          />
        </div>
      ))}
      <AddButton
        onAppend={handleAppend}
        repeaterId={id}
        fieldConfig={fieldConfig}
        formClassNameConfig={formClassNameConfig}
        disabled={fields.length >= (fieldConfig.maxItems || Infinity)}
      />
    </div>
  );
};

export default Repeater;
