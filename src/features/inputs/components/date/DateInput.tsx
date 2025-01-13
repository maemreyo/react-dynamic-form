import React from 'react';
import { CommonInputProps } from '../../types';
import { InputWrapper, InputLabel, StyledDateInput } from './styled';
import { useBaseInput } from '../useBaseInput';

const DateInput: React.FC<CommonInputProps> = ({
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
      <StyledDateInput
        {...field}
        {...inputProps}
        className={formClassNameConfig.date}
        type="date"
        id={id}
      />
    </InputWrapper>
  );
};

export default DateInput;
