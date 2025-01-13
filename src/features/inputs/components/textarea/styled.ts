import styled, { css } from 'styled-components';
import { TextareaHTMLAttributes } from 'react';

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

export const StyledTextarea = styled.textarea<
  TextareaHTMLAttributes<HTMLTextAreaElement>
>`
  padding: ${({ theme }) => theme.space.lg};
  border: 1px solid ${({ theme }) => theme.colors['input-border']};
  border-radius: ${({ theme }) => theme.radius.md};
  width: 100%;
  box-sizing: border-box;
  min-height: 80px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  resize: vertical;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors['primary-200']};
  }
`;
