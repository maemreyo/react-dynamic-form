import React from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { CommonInputProps } from '../types';
import { FormValues } from '../../dynamic-form';
import { Label } from '../../../styles';
import styled from 'styled-components';

const ColorInput = styled.input`
  width: 100px;
  height: 50px;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const ColorPicker: React.FC<CommonInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig = {},
  horizontalLabel,
  labelWidth,
}) => {
  const { label } = fieldConfig;
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
        className={formClassNameConfig.input}
        type="color"
        id={id}
      />
    </>
  );
};

export default ColorPicker;
