import React from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { CommonInputProps } from '../types';
import { FormValues } from '../../dynamic-form';
import {
  CheckboxInputStyled,
  CheckBoxInputWrapper,
  InputLabel,
} from './styled';

const CheckboxInput: React.FC<CommonInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig = {},
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
    <CheckBoxInputWrapper>
      {label && (
        <InputLabel
          htmlFor={id}
          $validation={fieldConfig.validation}
          className={formClassNameConfig.label}
        >
          {label}
        </InputLabel>
      )}
      <CheckboxInputStyled
        {...field}
        {...inputProps}
        className={formClassNameConfig.checkboxInput}
        type="checkbox"
        id={id}
        checked={!!field.value}
      />
    </CheckBoxInputWrapper>
  );
};

export default CheckboxInput;
