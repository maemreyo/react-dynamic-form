// Filepath: /src/features/inputs/components/TextInput.tsx
import React from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { CommonInputProps } from '../types';
import { FormValues } from '../../dynamic-form';
import { useTheme } from '../../../theme/ThemeProvider';
import { Label } from '../../../styles';
import { StyledInput } from './styled';

const TextInput: React.FC<CommonInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig = {},
  disableAutocomplete,
  horizontalLabel,
  labelWidth,
}) => {
  const theme = useTheme();
  const { label, inputProps } = fieldConfig;
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
          {fieldConfig.validation?.required &&
            typeof fieldConfig.validation.required === 'object' && (
              <span style={{ color: theme.colors.danger }}>*</span>
            )}
        </Label>
      )}
      <StyledInput
        {...field}
        {...inputProps}
        className={formClassNameConfig.input}
        id={id}
        autoComplete={disableAutocomplete ? 'off' : undefined}
      />
    </>
  );
};

export default TextInput;
