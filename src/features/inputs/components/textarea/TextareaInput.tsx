import React from 'react';
import { CommonInputProps } from '../../types';
import { InputLabel, InputWrapper, StyledTextarea } from './styled';
import { useBaseInput } from '../useBaseInput';

interface TextareaInputProps extends CommonInputProps {}

const TextareaInput: React.FC<TextareaInputProps> = ({
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
      <StyledTextarea
        {...field}
        {...inputProps}
        className={formClassNameConfig.textarea}
        id={id}
        autoComplete={disableAutocomplete ? 'off' : undefined}
      />
    </InputWrapper>
  );
};

export default TextareaInput;
