// Filepath: /src/components/Input/index.ts
import styled, { css } from 'styled-components';

/**
 * Base styles for form elements.
 */
const baseFormElementStyles = css`
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px 12px; /* Giảm padding */
  border-radius: 8px; /* Bo tròn */
  font-size: ${({ theme }) => theme.fontSizes.small}; /* Giảm font-size */
  width: 100%;
  transition:
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  line-height: 1.5;
  outline: none;

  &:hover {
    border-color: ${({ theme }) => theme.colors['info-700']};
  }

  &:focus {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors['info-200']}; /* Hiệu ứng focus */
    border-color: ${({ theme }) => theme.colors.info};
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.7;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
  }

  /* Add responsive styles using media queries */
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 300px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 400px;
  }
`;

/**
 * Styled input.
 */
export const Input = styled.input<{ className?: string }>`
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
