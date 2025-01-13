import styled from 'styled-components';

/**
 * Styled error message.
 */
export const ErrorMessage = styled.div<{ className?: string }>`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-top: ${({ theme }) => theme.space.xs};
  display: block;
`;
