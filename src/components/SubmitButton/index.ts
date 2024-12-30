// Filepath: /src/components/SubmitButton/index.ts
import styled from 'styled-components';

/**
 * Styled submit button.
 */
export const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  border: none;
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space['3xl']};
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition:
    background-color 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
  width: auto; /* Remove width: 100% */
  font-size: ${({ theme }) => theme.fontSizes.large};

  &:hover {
    background-color: ${({ theme }) => theme.colors['primary-hover']};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }
`;
