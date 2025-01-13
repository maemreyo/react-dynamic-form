import React from 'react';
import { FormValues } from '../../dynamic-form';
import { useFormContext, useController } from 'react-hook-form';
import { CommonInputProps } from '../types';
import { Label } from '../../../styles';
import {
  SwitchContainer,
  SwitchInputStyled,
  SliderStyled,
  Required,
} from './styled';

interface SwitchInputProps extends CommonInputProps {}

const SwitchInput: React.FC<SwitchInputProps> = ({
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
    defaultValue: fieldConfig.defaultValue,
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
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
      <SwitchContainer
        htmlFor={id}
        className={formClassNameConfig.switchContainer}
      >
        <SwitchInputStyled
          {...field}
          {...inputProps}
          type="checkbox"
          id={id}
          checked={field.value}
          className={formClassNameConfig.switch}
        />
        <SliderStyled className={formClassNameConfig.switchSlider} />
      </SwitchContainer>
    </div>
  );
};

export default SwitchInput;
