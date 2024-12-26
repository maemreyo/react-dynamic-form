import React from 'react';
import { FieldConfig, InputData, InputType } from './types';
import { useFormContext } from 'react-hook-form';
import { InputWrapper, Label, Input, ErrorMessage } from './styles';

interface DynamicFieldProps {
  inputData: InputData;
  config: FieldConfig;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  formValues: any;
}

const DynamicField: React.FC<DynamicFieldProps> = ({
  inputData,
  config,
  horizontalLabel,
  labelWidth,
  formValues,
}) => {
  const { register, setValue, getValues, formState } = useFormContext(); // Use form context
  const { label, inputProps, id, error } = inputData;

  if (!inputProps) {
    return null;
  }

  const fieldClassNameConfig = config.classNameConfig || {};

  const handleCustomOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(inputProps.name, e.target.value);
  };

  const renderInput = (type: InputType) => {
    switch (type) {
      case 'textarea':
        return (
          <Input
            as="textarea"
            className={fieldClassNameConfig.input}
            {...inputProps}
            {...register(inputProps.name, {
              validate: config.validation?.validate
                ? value => config.validation?.validate?.(value, getValues)
                : undefined,
            })}
            value={formValues[inputProps.name] || ''}
            {...(config.disableAutocomplete ? { autoComplete: 'off' } : {})}
          />
        );
      case 'checkbox':
        return (
          <Input
            type="checkbox"
            className={fieldClassNameConfig.input}
            {...inputProps}
            {...register(inputProps.name, {
              validate: config.validation?.validate
                ? value => config.validation?.validate?.(value, getValues)
                : undefined,
            })}
            checked={formValues[inputProps.name] === true}
            {...(config.disableAutocomplete ? { autoComplete: 'off' } : {})}
          />
        );
      // Add more cases for other input types if needed
      default:
        return (
          <Input
            className={fieldClassNameConfig.input}
            {...inputProps}
            {...register(inputProps.name, {
              validate: config.validation?.validate
                ? value => config.validation?.validate?.(value, getValues)
                : undefined,
            })}
            value={formValues[inputProps.name] || ''}
            {...(config.disableAutocomplete ? { autoComplete: 'off' } : {})}
          />
        );
    }
  };

  return (
    <InputWrapper
      $horizontalLabel={horizontalLabel}
      $labelWidth={labelWidth}
      className={fieldClassNameConfig.inputWrapper}
    >
      {label && (
        <Label
          htmlFor={id}
          $horizontalLabel={horizontalLabel}
          $labelWidth={labelWidth}
          className={fieldClassNameConfig.label}
        >
          {label}
          {config.validation?.required && (
            <span style={{ color: 'red' }}>*</span>
          )}
        </Label>
      )}
      {config.component
        ? config.component({
            inputData,
            formValues,
            register: register as any,
            onChange: handleCustomOnChange,
            onBlur: () => {},
            setValue,
            getValues,
          })
        : renderInput(inputProps.type as InputType)}
      {config.showInlineError && error && (
        <ErrorMessage className={fieldClassNameConfig.errorMessage}>
          {error}
        </ErrorMessage>
      )}
    </InputWrapper>
  );
};

export default DynamicField;
