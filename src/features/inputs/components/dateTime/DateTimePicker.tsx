import React from 'react';
import { CommonInputProps } from '../../types';
import { InputLabel, InputWrapper, StyledDateTimeInput } from './styled';
import { useBaseInput } from '../useBaseInput';

const DateTimePicker: React.FC<CommonInputProps> = ({
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
      <StyledDateTimeInput
        {...field}
        {...inputProps}
        className={formClassNameConfig.dateTime}
        type="datetime-local"
        id={id}
      />
    </InputWrapper>
  );
};

export default DateTimePicker;
