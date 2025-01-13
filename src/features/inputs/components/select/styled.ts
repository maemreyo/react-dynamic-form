// File: /components/inputs/select/styled.ts
import styled, { css } from 'styled-components';
import { SelectHTMLAttributes } from 'react';

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

export const StyledSelect = styled.select<
  SelectHTMLAttributes<HTMLSelectElement>
>`
  padding: ${({ theme }) => theme.space.lg};
  border: 1px solid ${({ theme }) => theme.colors['input-border']};
  border-radius: ${({ theme }) => theme.radius.md};
  width: 100%;
  box-sizing: border-box;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
  padding-right: 40px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors['primary-200']};
  }
`;
