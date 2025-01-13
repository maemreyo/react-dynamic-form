import styled, { css } from 'styled-components';
import { InputHTMLAttributes } from 'react';

interface ValidationProps {
  $validation?: any;
}

interface InputWrapperProps {
  $horizontalLabel?: boolean;
  $labelWidth?: string | number;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  // align-items: center;
  margin-bottom: ${({ theme }) => theme.space.xl};
  flex-direction: ${({ $horizontalLabel }) =>
    $horizontalLabel ? 'row' : 'column'};
  ${({ $labelWidth }) =>
    $labelWidth &&
    `& > label {
      width: ${typeof $labelWidth === 'number' ? `${$labelWidth}px` : $labelWidth};
      flex-shrink: 0;
    }`}
`;

export const InputLabel = styled.label<ValidationProps>`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  /* font-style: italic; */
  display: block;
  color: ${({ theme }) => theme.colors['secondary-900']};
  margin-bottom: ${({ theme }) => theme.space.sm};

  ${({ $validation }) =>
    !!$validation?.required &&
    css`
      &::after {
        content: '*';
        color: ${({ theme }) => theme.colors.danger};
        margin-left: ${({ theme }) => theme.space.sm};
      }
    `}
`;

export const NumberInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const SpinButton = styled.button`
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.lg};
  border: 1px solid ${({ theme }) => theme.colors['input-border']};
  border-radius: ${({ theme }) => theme.radius.lg};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors['light-200']};
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors['primary-200']};
  }
  &:first-of-type {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:last-of-type {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export const StyledInput = styled.input<InputHTMLAttributes<HTMLInputElement>>`
  padding: ${({ theme }) => theme.space.md};
  border: 1px solid ${({ theme }) => theme.colors['input-border']};
  border-radius: ${({ theme }) => theme.radius.sm};
  width: 100%;
  max-width: 80px;
  box-sizing: border-box;
  flex: 1;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.medium};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors['primary-200']};
  }
`;
