import React from 'react';
import { CommonInputProps } from '../../types';
import {
  CheckboxInputStyled,
  CheckBoxInputWrapper,
  InputLabel,
} from './styled';
import { useBaseInput } from '../useBaseInput';

const CheckboxInput: React.FC<CommonInputProps> = ({
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
