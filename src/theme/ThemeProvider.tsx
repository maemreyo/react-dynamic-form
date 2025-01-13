import React, { FC, createContext, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { defaultTheme } from './index';

/**
 * The theme context.
 */
export const AppThemeContext = createContext(defaultTheme);

/**
 * Custom hook to access the theme context.
 *
 * @returns The theme object.
 */
export const useTheme = () => useContext(AppThemeContext);

/**
 * Theme provider component.
 */
interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: any;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children, theme }) => {
  const mergedTheme = theme ? { ...defaultTheme, ...theme } : defaultTheme;

  return (
    <AppThemeContext.Provider value={mergedTheme}>
      <StyledThemeProvider theme={mergedTheme}>{children}</StyledThemeProvider>
    </AppThemeContext.Provider>
  );
};

export default ThemeProvider;
