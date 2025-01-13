import React from 'react';
import { FormValues } from '../../dynamic-form';
import { useFormContext, useController } from 'react-hook-form';
import { CommonInputProps } from '../types';
import { Label } from '../../../styles';
import { useTheme } from '../../../theme/ThemeProvider';
import { StyledTextarea } from './styled';

interface TextareaInputProps extends CommonInputProps {}

const TextareaInput: React.FC<TextareaInputProps> = ({
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
          {fieldConfig.validation?.required && (
            <span style={{ color: theme.colors.danger }}>*</span>
          )}
        </Label>
      )}
      <StyledTextarea
        {...field}
        {...inputProps}
        className={formClassNameConfig.textarea}
        id={id}
        autoComplete={disableAutocomplete ? 'off' : undefined}
      />
    </>
  );
};

export default TextareaInput;
