import styled, { css } from 'styled-components';

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

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-top: ${({ theme }) => theme.space.xs};
`;

export const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  border: none;
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
