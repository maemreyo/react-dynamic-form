import styled, { css } from 'styled-components';

/**
 * Props for the Label component.
 */
export interface LabelProps {
  $horizontalLabel?: boolean;
  $labelWidth?: string | number;
  className?: string;
}

/**
 * Common styles for labels.
 */
const labelCommonStyles = css<LabelProps>`
  margin-bottom: ${({ theme, $horizontalLabel }) =>
    $horizontalLabel ? '0' : theme.space.sm};
  margin-right: ${({ theme, $horizontalLabel }) =>
    $horizontalLabel ? theme.space.md : '0'};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  width: ${({ $labelWidth }) =>
    $labelWidth
      ? typeof $labelWidth === 'number'
        ? `${$labelWidth}px`
        : $labelWidth
      : 'auto'};
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  display: block;
`;

/**
 * Styled label.
 */
export const Label = styled.label<LabelProps>`
  ${labelCommonStyles}
`;
