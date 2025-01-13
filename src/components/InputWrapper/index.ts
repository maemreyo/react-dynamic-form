import styled from 'styled-components';

/**
 * Props for the InputWrapper component.
 */
export interface InputWrapperProps {
  $horizontalLabel?: boolean;
  $labelWidth?: string | number;
}

/**
 * Styled input wrapper.
 */
export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  margin-bottom: ${({ theme }) => theme.space['2xl']};
  align-items: ${({ $horizontalLabel }) =>
    $horizontalLabel ? 'center' : 'flex-start'};
  flex-direction: ${({ $horizontalLabel }) =>
    $horizontalLabel ? 'row' : 'column'};

  /* > :first-child {
    margin-right: ${({ $horizontalLabel }) =>
    $horizontalLabel ? '0.5em' : '0'};
  } */
`;
