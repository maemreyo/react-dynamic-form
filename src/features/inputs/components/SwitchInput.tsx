// Filepath: /src/features/inputs/components/SwitchInput.tsx
import React from 'react';
import { FormValues } from '../../dynamic-form';
import { useFormContext, useController } from 'react-hook-form';
import { CommonInputProps } from '../types';
import { Label, ErrorMessage, InputWrapper } from '../../../styles';
import styled from 'styled-components';

const SwitchContainer = styled.label<{ className?: string }>`
  position: relative;
  display: inline-block;
  width: 40px; /* Giảm kích thước */
  height: 20px; /* Giảm kích thước */
  cursor: pointer;
`;

const SwitchInputStyled = styled.input<{ className?: string }>`
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + .slider {
    background-color: ${({ theme }) => theme.colors.info};
  }
  &:focus + .slider {
    box-shadow: 0 0 1px ${({ theme }) => theme.colors.info};
  }
  &:checked + .slider:before {
    transform: translateX(19px); /* Chỉnh vị trí slider */
  }
  &:disabled + .slider {
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Slider = styled.span<{ className?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
  &:hover {
    background-color: #979797;
  }
  &:before {
    position: absolute;
    content: '';
    height: 16px; /* Giảm kích thước slider */
    width: 16px; /* Giảm kích thước slider */
    left: 2px; /* Chỉnh vị trí slider */
    bottom: 2px; /* Chỉnh vị trí slider */
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

interface SwitchInputProps extends CommonInputProps {}

const SwitchInput: React.FC<SwitchInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig = {},
  showInlineError,
  horizontalLabel,
  labelWidth,
  error,
}) => {
  const { label } = fieldConfig;
  const { control } = useFormContext<FormValues>();
  const { field } = useController({
    name: id,
    control,
    rules: fieldConfig.validation,
    defaultValue: fieldConfig.defaultValue,
  });
  return (
    <InputWrapper
      $horizontalLabel={horizontalLabel}
      $labelWidth={labelWidth}
      className={formClassNameConfig.inputWrapper}
    >
      {label && (
        <Label
          $horizontalLabel={horizontalLabel}
          $labelWidth={labelWidth}
          className={formClassNameConfig.label}
        >
          {label}
        </Label>
      )}
      <SwitchContainer
        htmlFor={id}
        className={formClassNameConfig.switchContainer}
      >
        <SwitchInputStyled
          {...field}
          type="checkbox"
          id={id}
          className={formClassNameConfig.switch}
        />
        <Slider className={formClassNameConfig.switchSlider} />
      </SwitchContainer>
      {showInlineError && error && (
        <ErrorMessage className={formClassNameConfig.errorMessage}>
          {error.message}
        </ErrorMessage>
      )}
    </InputWrapper>
  );
};

export default SwitchInput;
