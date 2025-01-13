import React from 'react';
import { CommonInputProps } from '../../types';
import { InputLabel, InputWrapper, StyledInput } from './styled';
import { useBaseInput } from '../useBaseInput';

const TimePicker: React.FC<CommonInputProps> = ({
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
      <StyledInput
        {...field}
        {...inputProps}
        className={formClassNameConfig.time}
        type="time"
        id={id}
      />
    </InputWrapper>
  );
};

export default TimePicker;
