import React from 'react';
import styled from 'styled-components';
import { FormClassNameConfig } from '../../../dynamic-form/types';
import { DefaultTheme } from 'styled-components';

interface StyledGridLayoutProps {
  $minWidth?: string;
  $gap?: string;
  $breakpoints?: { [key: string]: number };
  theme: DefaultTheme;
  className?: string;
  style?: React.CSSProperties;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
  'data-layoutconfig'?: string;
  'data-horizontallabel'?: string;
}

const StyledGridLayout = styled.form<StyledGridLayoutProps>`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${(props) => props.$minWidth || '250px'}, 1fr)
  );
  gap: ${({ theme, $gap }) => $gap || theme.space.md};
  padding: ${({ theme }) => theme.space['3xl']};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  ${(props) => {
    const { $breakpoints = props.theme.breakpoints } = props;
    return Object.entries($breakpoints)
      .sort(([, a], [, b]) => Number(a) - Number(b))
      .map(
        ([, value]: any) => `
          @media (min-width: ${value}px) {
            grid-template-columns: repeat(
              auto-fit,
              minmax(
                ${(props: any) => props.$minWidth || '250px'},
                1fr
              )
            );
          }
        `
      );
  }}
`;

interface GridLayoutProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className?: string;
  formClassNameConfig?: FormClassNameConfig;
  style?: React.CSSProperties;
  layoutConfig?: any;
  horizontalLabel?: boolean;
  $minWidth?: string;
  $gap?: string;
  $breakpoints?: { [key: string]: number };
}

const GridLayout: React.FC<GridLayoutProps> = ({
  onSubmit,
  children,
  className,
  formClassNameConfig,
  style,
  layoutConfig,
  horizontalLabel,
  $minWidth,
  $gap,
  $breakpoints,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <StyledGridLayout
      onSubmit={handleSubmit}
      className={`${className || ''} ${formClassNameConfig?.formContainer || ''}`}
      style={style}
      $minWidth={$minWidth}
      $gap={$gap}
      $breakpoints={$breakpoints}
      data-layoutconfig={JSON.stringify(layoutConfig)}
      data-horizontallabel={horizontalLabel ? 'true' : 'false'}
    >
      {children}
    </StyledGridLayout>
  );
};

export { GridLayout };
