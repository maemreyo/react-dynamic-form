import React from 'react';
import { FieldConfig } from '../../dynamic-form';
import { useFormContext, useController } from 'react-hook-form';
import { FormValues } from '../../dynamic-form';

interface BaseInputProps {
  id: string;
  fieldConfig: FieldConfig;
}

const BaseInput: React.FC<BaseInputProps> = ({ id, fieldConfig }) => {
  const { control } = useFormContext<FormValues>();
  const { field } = useController({
    name: id,
    control,
    rules: fieldConfig.validation,
    defaultValue: fieldConfig.defaultValue,
  });

  return null;
};

export default BaseInput;
