// Filepath: /src/components/GridFormContainer/index.ts
import styled, { css } from 'styled-components';
import { FormContainer } from '../FormContainer';
import { FormLayoutProps } from '../../features/form-renderer';
/**
 * Props for the GridFormContainer component.
 */
export type GridFormContainerProps = Pick<
  FormLayoutProps,
  | 'children'
  | 'className'
  | 'formClassNameConfig'
  | 'style'
  | 'layoutConfig'
  | 'horizontalLabel'
> & {
  $minWidth?: string;
  $gap?: string;
  $breakpoints?: { [key: string]: number };
  $layoutConfig?: any;
  $horizontalLabel?: boolean;
};
/**
 * Styled grid form container.
 */
export const GridFormContainer = styled(FormContainer)<GridFormContainerProps>`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${(props) => props.$minWidth || '250px'}, 1fr)
  );
  gap: ${({ $gap, theme }) => $gap || theme.space.md};
  ${(props) => {
    const { $breakpoints = props.theme.breakpoints } = props;
    return Object.entries($breakpoints)
      .sort(([, a], [, b]) => Number(a) - Number(b))
      .map(
        ([, value]: any) => css`
          @media (min-width: ${value}px) {
            grid-template-columns: repeat(
              auto-fit,
              minmax(
                ${(props: any) => props.$minWidth || '250px'},
                // Use prop or default minWidth
                1fr
              )
            );
          }
        `
      );
  }}
`;
