import styled, { css } from 'styled-components';

/**
 * Styled form container.
 */
export const FormContainer = styled.form<{
  $layout: 'flex' | 'grid';
  $layoutConfig?: any;
  $horizontalLabel?: boolean;
}>`
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
 * Styled label.
 */
export const Label = styled.label<{
  $horizontalLabel?: boolean;
  $labelWidth?: string | number;
}>`
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
 * Styled input wrapper.
 */
export const InputWrapper = styled.div<{
  $horizontalLabel?: boolean;
  $labelWidth?: string | number;
}>`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space.md};

  label {
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
  }

  ${({ $horizontalLabel }) =>
    $horizontalLabel &&
    css`
      flex-direction: row;
      align-items: center;

      > :first-child {
        margin-right: 0.5em;
      }
    `}

  ${({ $horizontalLabel }) =>
    !$horizontalLabel &&
    css`
      flex-direction: column;
      align-items: flex-start;
    `}
`;

/**
 * Styled input.
 */
export const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.medium};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }

  &[type='number'] {
    -moz-appearance: textfield; /* Firefox */
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none; /* Chrome, Safari, Edge */
    margin: 0;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
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
