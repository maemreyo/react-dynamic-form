import React from 'react';
import { Label, ErrorMessage, InputWrapper } from '../../../styles';
import { FieldConfig, FormClassNameConfig, FieldError } from '../../core/types';
import styled from 'styled-components';

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  cursor: pointer;
`;

const SwitchInputStyled = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + .slider {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus + .slider {
    box-shadow: 0 0 1px ${({ theme }) => theme.colors.primary};
  }

  &:checked + .slider:before {
    transform: translateX(24px);
  }
`;

const Slider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

interface SwitchInputProps {
  id: string;
  fieldConfig: FieldConfig;
  formClassNameConfig: FormClassNameConfig;
  formValues: Record<string, any>;
  showInlineError?: boolean;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  registerResult: any;
  error?: FieldError;
}

const SwitchInput: React.FC<SwitchInputProps> = ({
  id,
  fieldConfig,
  formClassNameConfig,
  formValues,
  showInlineError,
  horizontalLabel,
  labelWidth,
  registerResult,
  error,
}) => {
  const { label } = fieldConfig;
  const fieldClassNameConfig = fieldConfig.classNameConfig || {};
  const formClassName = formClassNameConfig || {};

  return (
    <InputWrapper
      $horizontalLabel={horizontalLabel}
      $labelWidth={labelWidth}
      className={
        fieldClassNameConfig.inputWrapper || formClassName.inputWrapper
      }
    >
      {label && (
        <Label
          $horizontalLabel={horizontalLabel}
          $labelWidth={labelWidth}
          className={fieldClassNameConfig.label || formClassName.label}
        >
          {label}
        </Label>
      )}
      <SwitchContainer htmlFor={id}>
        <SwitchInputStyled
          {...registerResult}
          type="checkbox"
          id={id}
          checked={formValues[id] === true}
        />
        <Slider className="slider" />
      </SwitchContainer>
      {showInlineError && error && (
        <ErrorMessage
          className={
            fieldClassNameConfig.errorMessage || formClassName.errorMessage
          }
        >
          {error.message}
        </ErrorMessage>
      )}
    </InputWrapper>
  );
};

export default SwitchInput;
