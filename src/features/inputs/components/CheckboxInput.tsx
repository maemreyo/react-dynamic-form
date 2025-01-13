import React from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { CommonInputProps } from '../types';
import { FormValues } from '../../dynamic-form';
import { Label } from '../../../styles';
import { CheckboxInputStyled, Required } from './styled';

const CheckboxInput: React.FC<CommonInputProps> = ({
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
    rules: fieldConfig.validation as any,
    defaultValue: fieldConfig.defaultValue,
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
          <CheckboxInputStyled
            {...field}
            {...inputProps}
            className={formClassNameConfig.checkboxInput}
            type="checkbox"
            id={id}
            checked={!!field.value}
          />
          {label}&nbsp;
          {fieldConfig.validation?.required && <Required>*</Required>}
        </Label>
      )}
    </>
  );
};

export default CheckboxInput;
