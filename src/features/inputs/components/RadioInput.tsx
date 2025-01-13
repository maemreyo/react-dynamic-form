import React from 'react';
import { FormValues } from '../../dynamic-form';
import { useFormContext, useController } from 'react-hook-form';
import { CommonInputProps } from '../types';
import { Label } from '../../../styles';
import { RadioGroup, RadioLabel, RadioInputStyled, Required } from './styled';

interface RadioInputProps extends CommonInputProps {}

const RadioInput: React.FC<RadioInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig = {},
  horizontalLabel,
  labelWidth,
}) => {
  const { label, options, inputProps } = fieldConfig;
  const { control } = useFormContext<FormValues>();
  const { field } = useController({
    name: id,
    control,
    rules: fieldConfig.validation,
    defaultValue: fieldConfig.defaultValue,
  });
  return (
    <>
      {label && (
        <Label
          $horizontalLabel={horizontalLabel}
          $labelWidth={labelWidth}
          className={formClassNameConfig.label}
        >
          {label}&nbsp;
          {fieldConfig.validation?.required && <Required>*</Required>}
        </Label>
      )}
      <RadioGroup className={formClassNameConfig.radioGroup}>
        {options?.map((option) => (
          <RadioLabel
            key={option.value}
            htmlFor={`${id}-${option.value}`}
            className={formClassNameConfig.radioLabel}
          >
            <RadioInputStyled
              {...field}
              {...inputProps}
              type="radio"
              id={`${id}-${option.value}`}
              name={id}
              value={option.value}
              checked={field.value === option.value}
              className={formClassNameConfig.radioButton}
            />
            {option.label}
          </RadioLabel>
        ))}
      </RadioGroup>
    </>
  );
};

export default RadioInput;
