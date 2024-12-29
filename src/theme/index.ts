// src/theme/index.ts
import { DefaultTheme } from 'styled-components';

/**
 * Default theme for the form.
 */
export const defaultTheme: DefaultTheme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    text: '#212529',
    background: '#ffffff',
    border: '#ced4da',
    error: '#dc3545',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  fontSizes: {
    small: '12px',
    medium: '14px',
    large: '16px',
  },
  fontWeights: {
    normal: 400,
    bold: 700,
  },
  radii: {
    sm: '2px',
    md: '4px',
    lg: '8px',
  },
};

/**
 * Create a custom theme by extending the default theme.
 *
 * @param customTheme - The custom theme object.
 * @returns The merged theme object.
 */
export const createTheme = (customTheme: any): DefaultTheme => {
  return {
    ...defaultTheme,
    ...customTheme,
    colors: {
      ...defaultTheme.colors,
      ...(customTheme.colors || {}),
    },
    space: {
      ...defaultTheme.space,
      ...(customTheme.space || {}),
    },
    fontSizes: {
      ...defaultTheme.fontSizes,
      ...(customTheme.fontSizes || {}),
    },
    fontWeights: {
      ...defaultTheme.fontWeights,
      ...(customTheme.fontWeights || {}),
    },
    radii: {
      ...defaultTheme.radii,
      ...(customTheme.radii || {}),
    },
  };
};
