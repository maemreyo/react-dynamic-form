// styles.ts
// src/features/repeater/styles.ts
import styled from 'styled-components';

export const AddButton = styled.button.attrs({
  type: 'button',
})<{
  $repeaterId: string;
  $fieldConfig: any;
  $formClassNameConfig?: any;
}>`
  background-color: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.light};
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin-top: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.md};

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.success &&
      `#${Math.max(0, parseInt(theme.colors.success.slice(1), 16) - 0x111111)
        .toString(16)
        .padStart(6, '0')}`};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const RemoveButton = styled.button.attrs({
  type: 'button',
})<{
  $index: number;
  $repeaterId: string;
  $fieldConfig: any;
  $formClassNameConfig?: any;
}>`
  background-color: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.light};
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin-left: ${({ theme }) => theme.space.md};

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.error &&
      `#${Math.max(0, parseInt(theme.colors.error.slice(1), 16) - 0x111111)
        .toString(16)
        .padStart(6, '0')}`};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
