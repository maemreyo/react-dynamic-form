// styles.ts
import styled, { css } from 'styled-components';
import { LayoutType } from './features/core';

/**
 * Base styles for form elements.
 */
const baseFormElementStyles = css`
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.medium};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
  }
`;

/**
 * Props for the FormContainer component.
 */
export interface FormContainerProps {
  $layout: LayoutType;
  $layoutConfig?: any;
  $horizontalLabel?: boolean;
  formClassNameConfig?: {
    formContainer?: string;
  };
  style?: React.CSSProperties;
}

/**
 * Styled form container.
 */
export const FormContainer = styled.form<FormContainerProps>`
  display: ${({ $layout }) => ($layout === 'grid' ? 'grid' : 'flex')};
  flex-direction: ${({ $layout, $horizontalLabel }) =>
    $layout === 'grid' || $horizontalLabel ? 'row' : 'column'};
  gap: ${({ $layoutConfig, theme }) => $layoutConfig?.gap || theme.space.md};

  ${({ $layout, $layoutConfig }) =>
    $layout === 'grid' &&
    css`
      grid-template-columns: repeat(${$layoutConfig?.columns || 12}, 1fr);
    `}

  padding: ${({ theme }) => theme.space.lg};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
`;

/**
 * Props for the Label component.
 */
export interface LabelProps {
  $horizontalLabel?: boolean;
  $labelWidth?: string | number;
}

/**
 * Common styles for labels.
 */
const labelCommonStyles = css<LabelProps>`
  margin-bottom: ${({ theme, $horizontalLabel }) =>
    $horizontalLabel ? '0' : theme.space.sm};
  margin-right: ${({ theme, $horizontalLabel }) =>
    $horizontalLabel ? theme.space.md : '0'};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  width: ${({ $labelWidth }) =>
    $labelWidth
      ? typeof $labelWidth === 'number'
        ? `${$labelWidth}px`
        : $labelWidth
      : 'auto'};
  flex-shrink: 0;
`;

/**
 * Styled label.
 */
export const Label = styled.label<LabelProps>`
  ${labelCommonStyles}
`;

/**
 * Props for the InputWrapper component.
 */
export interface InputWrapperProps {
  $horizontalLabel?: boolean;
  $labelWidth?: string | number;
}

/**
 * Styled input wrapper.
 */
export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  margin-bottom: ${({ theme }) => theme.space.md};
  align-items: ${({ $horizontalLabel }) =>
    $horizontalLabel ? 'center' : 'flex-start'};
  flex-direction: ${({ $horizontalLabel }) =>
    $horizontalLabel ? 'row' : 'column'};

  label {
    ${labelCommonStyles}
  }

  > :first-child {
    margin-right: ${({ $horizontalLabel }) =>
      $horizontalLabel ? '0.5em' : '0'};
  }
`;

/**
 * Styled input.
 */
export const Input = styled.input`
  ${baseFormElementStyles}

  &[type='number'] {
    -moz-appearance: textfield; /* Firefox */
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none; /* Chrome, Safari, Edge */
    margin: 0;
  }
`;

/**
 * Styled submit button.
 */
export const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.primary &&
      `#${Math.max(0, parseInt(theme.colors.primary.slice(1), 16) - 0x111111)
        .toString(16)
        .padStart(6, '0')}`};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

/**
 * Styled error message.
 */
export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-top: ${({ theme }) => theme.space.xs};
`;
