// Filepath: /src/components/SubmitButton/index.ts
import styled from 'styled-components';

/**
 * Styled submit button.
 */
export const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.info};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 10px 20px; /* Giảm padding */
  border-radius: 8px; /* Bo tròn */
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition:
    background-color 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
  width: auto;
  font-size: ${({ theme }) => theme.fontSizes.medium}; /* Giảm font-size */
  box-shadow:
    0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12); /* Thêm đổ bóng */

  &:hover {
    background-color: ${({ theme }) => theme.colors['info-700']};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors['info-200']}; /* Hiệu ứng focus */
  }
`;
