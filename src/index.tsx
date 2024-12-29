// src/index.tsx
import React, { FC, HTMLAttributes } from 'react';
import ThemeProvider from './theme/ThemeProvider';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  /** custom content, defaults to 'the snozzberries taste like snozzberries' */
  children?: any;
  /** optional theme */
  theme?: any;
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
/**
 * A custom Thing component. Neat!
 */
export const Thing: FC<Props> = ({ children, theme }) => {
  return (
    <ThemeProvider theme={theme}>
      <div>{children || `the snozzberries taste like snozzberries`}</div>
    </ThemeProvider>
  );
};

// src/index.tsx
export * from './features/dynamic-form';
export * from './features/form-renderer';
export * from './features/inputs';
export * from './components';
export * from './theme';
export { default as DynamicForm } from './DynamicForm';
