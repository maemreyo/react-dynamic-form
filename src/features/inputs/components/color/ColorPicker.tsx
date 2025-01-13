import React from 'react';
import { CommonInputProps } from '../../types';
import { ColorInput, InputLabel, InputWrapper } from './styled';
import { useBaseInput } from '../useBaseInput';

const ColorPicker: React.FC<CommonInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig = {},
  horizontalLabel,
  labelWidth,
}) => {
  const { label, inputProps } = fieldConfig;
  const { field } = useBaseInput(id, fieldConfig);

  return (
    <InputWrapper $horizontalLabel={horizontalLabel} $labelWidth={labelWidth}>
      {label && (
        <InputLabel
          htmlFor={id}
          $validation={fieldConfig.validation}
          className={formClassNameConfig.label}
        >
          {label}
        </InputLabel>
      )}
      <ColorInput
        {...field}
        {...inputProps}
        className={formClassNameConfig.input}
        type="color"
        id={id}
      />
    </InputWrapper>
  );
};

export default ColorPicker;
