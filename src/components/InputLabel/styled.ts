import styled from 'styled-components';
import { InputLabelPosition } from './types';

interface LabelWrapperProps {
  $position: InputLabelPosition;
  disabled?: boolean;
  $hasTooltip: boolean;
}

interface LabelTextProps {
  disabled?: boolean;
  $position: InputLabelPosition;
}

export const LabelWrapper = styled.label<LabelWrapperProps>`
  display: flex;
  flex-direction: ${({ $position }) =>
    $position === 'left' ? 'row' : 'column'};
  align-items: ${({ $position }) =>
    $position === 'left' ? 'center' : 'flex-start'};
  margin-bottom: ${({ theme, $position }) =>
    $position === 'top' ? theme.space.xs : '0'};
  margin-right: ${({ theme, $position }) =>
    $position === 'left' ? theme.space.sm : '0'};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: ${({ $hasTooltip }) => ($hasTooltip ? 'help' : 'default')};
`;

export const LabelText = styled.span<LabelTextProps>`
  font-family: ${({ theme }) => theme.typography.primaryFont};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.5;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors['secondary-500'] : theme.colors.text};
  margin-right: ${({ theme, $position }) =>
    $position === 'left' ? theme.space.xs : '0'};
  margin-bottom: ${({ theme, $position }) =>
    $position === 'top' ? theme.space.xs : '0'};
`;

export const RequiredIndicator = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  margin-left: ${({ theme }) => theme.space['2xs']};
`;

export const OptionalIndicator = styled.span`
  color: ${({ theme }) => theme.colors['secondary-500']};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  margin-left: ${({ theme }) => theme.space['2xs']};
`;
