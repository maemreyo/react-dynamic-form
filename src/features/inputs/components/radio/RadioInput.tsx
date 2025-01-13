import React from 'react';
import { CommonInputProps } from '../../types';
import {
  RadioGroup,
  RadioLabel,
  RadioInputStyled,
  InputLabel,
  InputWrapper,
} from './styled';
import { useBaseInput } from '../useBaseInput';

interface RadioInputProps extends CommonInputProps {}

const RadioInput: React.FC<RadioInputProps> = ({
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
      <RadioGroup className={formClassNameConfig.radioGroup}>
        {options?.map((option) => (
          <RadioLabel
            key={option.value}
            htmlFor={`${id}-${option.value}`}
            className={formClassNameConfig.radioLabel}
          >
            <RadioInputStyled
              {...field}
              {...inputProps}
              type="radio"
              id={`${id}-${option.value}`}
              name={id}
              value={option.value}
              checked={field.value === option.value}
              className={formClassNameConfig.radioButton}
            />
            {option.label}
          </RadioLabel>
        ))}
      </RadioGroup>
    </InputWrapper>
  );
};

export default RadioInput;
