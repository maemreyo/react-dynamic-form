// Filepath: /src/components/Input/index.ts
import styled, { css } from 'styled-components';

/**
 * Base styles for form elements.
 */
const baseFormElementStyles = css`
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  width: 100%; /* Set default width to 100% */
  transition:
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out; /* Add transition */
  line-height: 1.5;

  &:hover {
    border-color: ${({ theme }) =>
      theme.colors['info-700']}; /* Change border color on hover */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.info};
    border-color: ${({ theme }) =>
      theme.colors.info}; /* Change border color on focus */
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
