import { DefaultTheme } from 'styled-components';

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
  fontSizes: {
    small: '12px',
    medium: '14px',
    large: '16px',
  },
  fontWeights: {
    light: 300,
    regular: 400,
    bold: 700,
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radii: {
    sm: '2px',
    md: '4px',
    lg: '8px',
  },
};
