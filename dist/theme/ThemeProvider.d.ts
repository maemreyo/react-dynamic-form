import React, { FC } from 'react';
/**
 * The theme context.
 */
export declare const AppThemeContext: React.Context<import("styled-components").DefaultTheme>;
/**
 * Custom hook to access the theme context.
 *
 * @returns The theme object.
 */
export declare const useTheme: () => import("styled-components").DefaultTheme;
/**
 * Theme provider component.
 */
interface ThemeProviderProps {
    children: React.ReactNode;
    theme?: any;
}
declare const ThemeProvider: FC<ThemeProviderProps>;
export default ThemeProvider;
