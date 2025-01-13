import React from 'react';
import { StyledInput, InputWrapper, InputLabel } from './styled';
import { useBaseInput } from '../useBaseInput';
import { CommonInputProps } from '../../types';

const TextInput: React.FC<CommonInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig = {},
  disableAutocomplete,
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
        className={formClassNameConfig.input}
        id={id}
        autoComplete={disableAutocomplete ? 'off' : undefined}
      />
    </InputWrapper>
  );
};

export default TextInput;
