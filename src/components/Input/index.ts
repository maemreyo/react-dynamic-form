// Filepath: /src/components/Input/index.ts
import styled, { css } from 'styled-components';

/**
 * Base styles for form elements.
 */
const baseFormElementStyles = css`
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 12px; /* Tăng padding */
  border-radius: 10px; /* Bo tròn nhiều hơn */
  font-size: ${({ theme }) => theme.fontSizes.medium};
  width: 100%;
  transition:
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  line-height: 1.5;
  outline: none; /* Loại bỏ outline mặc định */

  &:hover {
    border-color: ${({ theme }) => theme.colors['info-700']};
  }

  &:focus {
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors['info-500']}; /* Hiệu ứng focus rõ ràng */
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
