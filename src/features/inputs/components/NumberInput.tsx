import React, { useState, useEffect, useCallback } from 'react';
import { FormValues } from '../../dynamic-form';
import { useFormContext, useController } from 'react-hook-form';
import { CommonInputProps } from '../types';
import { Label } from '../../../styles';
import {
  NumberInputContainer,
  Required,
  SpinButton,
  StyledInput,
} from './styled';

interface NumberInputProps extends CommonInputProps {}

const NumberInput: React.FC<NumberInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig = {},
  disableAutocomplete,
  horizontalLabel,
  labelWidth,
}) => {
  const { label, inputProps } = fieldConfig;
  const { control } = useFormContext<FormValues>();
  const { field } = useController({
    name: id,
    control,
    rules: fieldConfig.validation,
    defaultValue: fieldConfig.defaultValue,
  });
  const [internalValue, setInternalValue] = useState<number>(+field.value || 0);
  const clampValue = useCallback(
    (value: number) => {
      const { min, max } = fieldConfig.validation || {};
      let clampedValue = value;
      if (min !== undefined && typeof min === 'object' && value < +min.value) {
        clampedValue = +min.value;
      }
      if (max !== undefined && typeof max === 'object' && value > +max.value) {
        clampedValue = +max.value;
      }
      return clampedValue;
    },
    [fieldConfig.validation]
  );
  useEffect(() => {
    setInternalValue(+field.value || 0);
  }, [field.value]);

  const handleIncrement = () => {
    const newValue = clampValue(internalValue + 1);
    setInternalValue(newValue);
    field.onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = clampValue(internalValue - 1);
    setInternalValue(newValue);
    field.onChange(newValue);
  };
  return (
    <>
      {label && (
        <Label
          htmlFor={id}
          $horizontalLabel={horizontalLabel}
          $labelWidth={labelWidth}
          className={formClassNameConfig.label}
        >
          {label}&nbsp;
          {fieldConfig.validation?.required && <Required>*</Required>}
        </Label>
      )}
      <NumberInputContainer
        className={formClassNameConfig.numberInputContainer}
      >
        <SpinButton
          type="button"
          onClick={handleDecrement}
          className={formClassNameConfig.numberInputButton}
          disabled={
            fieldConfig.validation?.min !== undefined &&
            typeof fieldConfig.validation.min === 'object' &&
            internalValue <= +fieldConfig.validation.min.value
          }
        >
          -
        </SpinButton>
        <StyledInput
          {...field}
          {...inputProps}
          className={formClassNameConfig.number}
          type="number"
          id={id}
          onChange={(e) => {
            field.onChange(e);
            setInternalValue(+e.target.value);
          }}
          onBlur={(e) => {
            field.onBlur();
            const clampedValue = clampValue(+e.target.value);
            setInternalValue(clampedValue);
            field.onChange(clampedValue);
          }}
          value={internalValue}
          autoComplete={disableAutocomplete ? 'off' : undefined}
        />
        <SpinButton
          type="button"
          onClick={handleIncrement}
          className={formClassNameConfig.numberInputButton}
          disabled={
            fieldConfig.validation?.max !== undefined &&
            typeof fieldConfig.validation.max === 'object' &&
            internalValue >= +fieldConfig.validation.max.value
          }
        >
          +
        </SpinButton>
      </NumberInputContainer>
    </>
  );
};

export default NumberInput;
