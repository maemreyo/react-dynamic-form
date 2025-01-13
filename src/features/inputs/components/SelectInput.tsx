// Filepath: /src/features/inputs/components/SelectInput.tsx

import React from 'react';
import { FormValues } from '../../dynamic-form';
import { useFormContext, useController } from 'react-hook-form';
import { CommonInputProps } from '../types';
import { Label } from '../../../styles';
import { useTheme } from '../../../theme/ThemeProvider';
import { StyledSelect } from './styled';

interface SelectInputProps extends CommonInputProps {}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig = {},
  horizontalLabel,
  labelWidth,
}) => {
  const theme = useTheme();
  const { label, options, inputProps } = fieldConfig;
  const { control } = useFormContext<FormValues>();
  const { field } = useController({
    name: id,
    control,
    rules: fieldConfig.validation,
    defaultValue: fieldConfig.defaultValue,
  });
  return (
    <>
      {label && (
        <Label
          htmlFor={id}
          $horizontalLabel={horizontalLabel}
          $labelWidth={labelWidth}
          className={formClassNameConfig.label}
        >
          {label}&nbsp;
          {fieldConfig.validation?.required && (
            <span style={{ color: theme.colors.danger }}>*</span>
          )}
        </Label>
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
    </>
  );
};

export default SelectInput;
