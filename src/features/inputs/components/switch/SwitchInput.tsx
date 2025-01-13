import React from 'react';
import { CommonInputProps } from '../../types';
import {
  SwitchContainer,
  SwitchInputStyled,
  SliderStyled,
  InputLabel,
  CheckBoxInputWrapper,
} from './styled';
import { useBaseInput } from '../useBaseInput';

interface SwitchInputProps extends CommonInputProps {}

const SwitchInput: React.FC<SwitchInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig = {},
}) => {
  const { label, inputProps } = fieldConfig;
  const { field } = useBaseInput(id, fieldConfig);

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
    </CheckBoxInputWrapper>
  );
};

export default SwitchInput;
