import React from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { CommonInputProps } from '../types';
import { FormValues } from '../../dynamic-form';
import { Label } from '../../../styles';
import { ColorInput } from './styled';

const ColorPicker: React.FC<CommonInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig = {},
  horizontalLabel,
  labelWidth,
}) => {
  const { label, inputProps } = fieldConfig;
  const { control } = useFormContext<FormValues>();
  const { field } = useController({
    name: id,
    control,
    rules: fieldConfig.validation,
    defaultValue: fieldConfig.defaultValue || '#ffffff', // Default to white
  });

  return (
    <>
      {label && (
        <Label
          htmlFor={id}
          $horizontalLabel={horizontalLabel}
          $labelWidth={labelWidth}
          className={formClassNameConfig.label}
        >
          {label}
        </Label>
      )}
      <ColorInput
        {...field}
        {...inputProps}
        className={formClassNameConfig.input}
        type="color"
        id={id}
      />
    </>
  );
};

export default ColorPicker;
