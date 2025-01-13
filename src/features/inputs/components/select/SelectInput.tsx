import React from 'react';
import { CommonInputProps } from '../../types';
import { InputLabel, InputWrapper, StyledSelect } from './styled';
import { useBaseInput } from '../useBaseInput';

interface SelectInputProps extends CommonInputProps {}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig = {},
  horizontalLabel,
  labelWidth,
}) => {
  const { label, options, inputProps } = fieldConfig;
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
      <StyledSelect
        {...field}
        {...inputProps}
        className={formClassNameConfig.select}
        id={id}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </InputWrapper>
  );
};

export default SelectInput;
