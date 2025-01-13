import React from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { CommonInputProps } from '../types';
import { FormValues } from '../../dynamic-form';
import { Input, Label } from '../../../styles';
import { useTheme } from '../../../theme/ThemeProvider';
import { StyledInput } from './styled';

const DateTimePicker: React.FC<CommonInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig = {},
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
      <StyledInput
        {...field}
        {...inputProps}
        className={formClassNameConfig.dateTime}
        type="datetime-local"
        id={id}
      />
    </>
  );
};

export default DateTimePicker;
