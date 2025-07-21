import { merge } from 'lodash';
import { DefaultTheme } from 'styled-components';

/**
 * Base theme with standardized values.
 */
const baseTheme = {
  colors: {
    // Primary Colors
    primary: '#FF902F',
    primaryLight: '#FFB97C', // Adjusted based on the provided shades
    'primary-hover': '#e5791e',
    'primary-100': '#FFF5EC',
    'primary-200': '#FFEBDA',
    'primary-300': '#FFE1C7',
    'primary-400': '#FFD7B4',
    'primary-500': '#FFCDA2',
    'primary-600': '#FFC38F',
    'primary-700': '#FFB97C',
    'primary-800': '#FFAF69',
    'primary-900': '#FF8012',
    'primary-1000': '#FF801F',

    // Secondary Colors
    secondary: '#212529',
    secondaryLight: '#646669', // Adjusted based on the provided shades
    'secondary-hover': '#0d0f10',
    'secondary-100': '#E9E9EA',
    'secondary-200': '#D3D3D4',
    'secondary-300': '#BCBEBF',
    'secondary-400': '#A6A8A9',
    'secondary-500': '#909294',
    'secondary-600': '#7A7C7F',
    'secondary-700': '#646669',
    'secondary-800': '#4D5154',
    'secondary-900': '#373B3E',

    // Success Colors
    success: '#55CE63',
    successLight: '#88DD92', // Adjusted based on the provided shades
    'success-hover': '#39b248',
    'success-100': '#EEFAEF',
    'success-200': '#DDF5E0',
    'success-300': '#CCF0D0',
    'success-400': '#BBEBC1',
    'success-500': '#AAE7B1',
    'success-600': '#99E2A1',
    'success-700': '#88DD92',
    'success-800': '#77D882',
    'success-900': '#66D373',

    // Danger Colors
    danger: '#FC133D',
    dangerLight: '#F96C85', // Adjusted based on the provided shades
    'danger-hover': '#e51037',
    'danger-100': '#FEEAEE',
    'danger-200': '#FDD5DC',
    'danger-300': '#FCC0CB',
    'danger-400': '#FBABB9',
    'danger-500': '#FB96A8',
    'danger-600': '#FA8197',
    'danger-700': '#F96C85',
    'danger-800': '#F85774',
    'danger-900': '#F74262',

    // Info Colors
    info: '#009EFB',
    infoLight: '#4DBBFC', // Adjusted based on the provided shades
    'info-hover': '#0075c7',
    'info-100': '#E6F5FF',
    'info-200': '#CCECFE',
    'info-300': '#B3E2FE',
    'info-400': '#99D8FD',
    'info-500': '#80CFFD',
    'info-600': '#66C5FD',
    'info-700': '#4DBBFC',
    'info-800': '#33B1FC',
    'info-900': '#1AA8FB',

    // Warning Colors
    warning: '#FFBC34',
    warningLight: '#FFD071', // Adjusted based on the provided shades
    'warning-hover': '#e5a62a',
    'warning-100': '#FFF8EB',
    'warning-200': '#FFF2D6',
    'warning-300': '#FFEBC2',
    'warning-400': '#FFE4AE',
    'warning-500': '#FFDE9A',
    'warning-600': '#FFD785',
    'warning-700': '#FFD071',
    'warning-800': '#FFC95D',
    'warning-900': '#FFC348',

    // Other Colors
    blue: '#00c5fb',
    'blue-hover': '#0097c7',
    maroon: '#f43b48',
    'maroon-hover': '#dc2734',
    violet: '#667eea',
    'violet-hover': '#5063c9',
    dark: '#29344a',
    light: '#D5D8DA',
    white: '#FFF',
    black: '#000',

    // Additional Colors
    purple: '#9368E9',
    'purple-100': '#F4F0FD',
    'purple-200': '#E9E1FB',
    'purple-300': '#DFD2F8',
    'purple-400': '#D4C3F6',
    'purple-500': '#C9B4F4',
    'purple-600': '#BEA4F2',
    'purple-700': '#B395F0',
    'purple-800': '#A986ED',
    'purple-900': '#9E77EB',

    pink: '#FC6075',
    'pink-100': '#FFEFF1',
    'pink-200': '#FEDFE3',
    'pink-300': '#FECFD6',
    'pink-400': '#FEBFC8',
    'pink-500': '#FEB0BA',
    'pink-600': '#FDA0AC',
    'pink-700': '#FD909E',
    'pink-800': '#FD8091',
    'pink-900': '#FF445D',
    teal: '#02a8b5',
    cyan: '#299cdb',
    green: '#35BA67',
    orange: '#fbc418',
    indigo: '#4d5ddb',
    yellow: '#ffd200',

    'light-100': '#FCFCFC',
    'light-200': '#F9F9F9',
    'light-300': '#F5F6F7',
    'light-400': '#F2F3F4',
    'light-500': '#EFF0F1',
    'light-600': '#ECEDEE',
    'light-700': '#E9EAEB',
    'light-800': '#E5E7E9',
    'light-900': '#E2E4E6',

    // Text Colors
    text: '#5B6670',
    'title-color': '#373B3E',
    'sub-title': '#4D5154',
    'text-muted': '#9595b5',

    // Background Colors
    background: '#f7f7f7',
    'body-dark-bg': '#263238',
    'wrapper-bg': '#f1f5f6',
    'default-background': '#f7f8f9',
    'black-bg': '#16191c',

    // Other Theming Colors
    'theme-title': '#97A2D2',
    'input-bg': '#2c2c50',
    'form-control-bg': '#FFF',

    // Social Media Colors
    facebook: '#3B5998',
    twitter: '#00ACEE',
    google: '#DD4B39',
    telegram: '#0088CC',
    linkedin: '#0E76A8',
    youtube: '#C4302B',
    instagram: '#3F729B',
    reddit: '#C6C6C6',
    pinterest: '#cc2127',
    vk: '#2B587A',
    rss: '#EE802F',
    skype: '#00AFF0',
    xing: '#126567',
    tumblr: '#34526F',
    email: '#6567A5',
    delicious: '#205CC0',
    stumbleupon: '#F74425',
    digg: '#191919',
    blogger: '#FC4F08',
    flickr: '#FF0084',
    vimeo: '#86C9EF',
    yahoo: '#720E9E',
    gplus: '#DD4B39',
    appstore: '#000',

    // Gradient Colors
    'primary-gradient':
      'linear-gradient(90.31deg, #FF902F -1.02%, #FF2D3D 132.59%)',
    'blue-gradient': 'linear-gradient(to right, #00c5fb 0%, #0253cc 100%)',
    'maroon-gradient': 'linear-gradient(to right, #f43b48 0%, #453a94 100%)',
    'violet-gradient': 'linear-gradient(to right, #667eea 0%, #764ba2 100%)',

    // Border Colors
    border: '#D3D3D4',
    'default-border': '#A6A8A9',
    'dark-border': '#2e3840',
    'input-border': '#C6C6C6',
    error: '#dc3545',
  },
  spacing: {
    gridUnit: 4, // Define the base grid unit
    spacingXXS: 2, // Added XXS spacing
    spacingXS: 4,
    spacingSM: 8,
    spacingMD: 16,
    spacingLG: 24,
    spacingXL: 32,
    spacingXXL: 48,
    spacing3XL: 64,
    spacing4XL: 80,
    // Add more spacing if necessary
  },
  typography: {
    primaryFont: 'Helvetica Neue, Arial, sans-serif', // Added a generic font family
    // Define font sizes based on the grid unit
    fontSizeXXS: 8, // Added XXS font size
    fontSizeXS: 10, // Added XS font size
    fontSizeSM: 13,
    fontSizeMD: 15,
    fontSizeLG: 20,
    fontSizeXL: 24,
    fontSizeXXL: 30,
    fontSize3XL: 36,
    fontSize4XL: 48,

    // Define font weights
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

    // Define headings
    h1: '2rem', // Relative to the base font size
    h2: '1.75rem',
    h3: '1.5rem',
    h4: '1.25rem',
    h5: '1.15rem',
    h6: '1rem',
  },
  borders: {
    // Define border widths
    borderWidth: 1,
    borderWidthSM: 1,
    borderWidthMD: 2,
    borderWidthLG: 4,
    // Define border radius
    borderRadiusSM: 4,
    borderRadiusMD: 6,
    borderRadiusLG: 8,
    borderRadiusXL: 10,
    borderRadius2XL: 12,
    borderRadiusRounded: '50%',
    borderRadiusPill: '1.5rem',
  },
  breakpoints: {
    // Define breakpoints based on common screen sizes
    breakpointXS: '0px',
    breakpointSM: '576px',
    breakpointMD: '768px',
    breakpointLG: '992px',
    breakpointXL: '1200px',
    breakpointXXL: '1400px',
  },
  shadows: {
    // Define shadows
    shadowSM: '0px 4px 8px 0px rgba(255, 255, 255, 0.15)', // Added light color for better visibility
    shadowMD: '0px 4px 16px 0px rgba(255, 255, 255, 0.7)', // Added light color for better visibility
    shadowLG: '0px 4px 24px 0px #BCBCBC40',
  },
  transitions: {
    // Define transitions
    transitionXS: '0.1s',
    transitionSM: '0.2s',
    transitionMD: '0.3s', // Default transition
    transitionLG: '0.4s',
    transitionXL: '0.5s',
    transitionEase: 'ease',
    transitionEaseIn: 'ease-in',
    transitionEaseOut: 'ease-out',
    transitionEaseInOut: 'ease-in-out',
    transitionLinear: 'linear',
    // Predefined transition effects
    transitionNormal: 'all 0.3s ease',
    transitionFast: 'all 0.2s ease-in-out',
    transitionSlow: 'all 0.4s ease',
    transitionButton:
      'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
    transitionInput: 'border-color 0.2s ease, box-shadow 0.2s ease',
  },
  componentDefaults: {
    // Define component defaults
    buttonPadding: '12px 24px', // Using spacingMD
    inputPadding: '12px',
    inputBorder: '1px solid #C6C6C6',
    inputBorderFocus: '1px solid #FF902F',
    buttonPrimaryBackground: '#FF902F',
    buttonPrimaryColor: '#FFF',
  },
  darkMode: {
    // Define dark mode colors
    darkBackground: '#333',
    darkText: '#FFF',
    darkBorder: '#666',
    // Add more dark mode colors if necessary
  },
};

/**
 * Default theme for the form.
 * Inherits from baseTheme and overrides specific values.
 */
export const defaultTheme: DefaultTheme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    // Override any specific colors here if needed
  },
  space: {
    ...baseTheme.spacing,
    xs: `${baseTheme.spacing.spacingXS}px`,
    sm: `${baseTheme.spacing.spacingSM}px`,
    md: `${baseTheme.spacing.spacingMD}px`,
    lg: `${baseTheme.spacing.spacingLG}px`,
    xl: `${baseTheme.spacing.spacingXL}px`,
    '2xl': `${baseTheme.spacing.spacingXXL}px`,
    '3xl': `${baseTheme.spacing.spacing3XL}px`,
    '4xl': `${baseTheme.spacing.spacing4XL}px`,
    '5xl': `${baseTheme.spacing.spacingXXL * 1.5}px`, // Example of calculated value
    '6xl': `${baseTheme.spacing.spacingXXL * 2}px`,
    '7xl': `${baseTheme.spacing.spacing3XL * 1.5}px`,
    '8xl': `${baseTheme.spacing.spacing3XL * 2}px`,
    '9xl': `${baseTheme.spacing.spacing4XL * 1.5}px`,
    // Add more custom spacing if necessary
  },
  fontSizes: {
    ...baseTheme.typography,
    '8': `${baseTheme.typography.fontSizeXXS}px`,
    '9': `${baseTheme.typography.fontSizeXS}px`,
    '10': `${baseTheme.typography.fontSizeXS + 2}px`,
    '11': `${baseTheme.typography.fontSizeXS + 3}px`,
    '12': `${baseTheme.typography.fontSizeSM - 1}px`,
    '13': `${baseTheme.typography.fontSizeSM}px`,
    '14': `${baseTheme.typography.fontSizeSM + 1}px`,
    small: `${baseTheme.typography.fontSizeSM}px`,
    medium: `${baseTheme.typography.fontSizeMD}px`,
    '17': `${baseTheme.typography.fontSizeMD + 2}px`,
    '18': `${baseTheme.typography.fontSizeMD + 3}px`,
    '19': `${baseTheme.typography.fontSizeMD + 4}px`,
    large: `${baseTheme.typography.fontSizeLG}px`,
    '22': `${baseTheme.typography.fontSizeLG + 2}px`,
    '23': `${baseTheme.typography.fontSizeLG + 3}px`,
    '24': `${baseTheme.typography.fontSizeXL}px`,
    '26': `${baseTheme.typography.fontSizeXL + 2}px`,
    '28': `${baseTheme.typography.fontSizeXL + 4}px`,
    '30': `${baseTheme.typography.fontSizeXXL}px`,
    '32': `${baseTheme.typography.fontSizeXXL + 2}px`,
    '34': `${baseTheme.typography.fontSizeXXL + 4}px`,
    '36': `${baseTheme.typography.fontSize3XL}px`,
    '40': `${baseTheme.typography.fontSize3XL + 4}px`,
    '42': `${baseTheme.typography.fontSize3XL + 6}px`,
    '48': `${baseTheme.typography.fontSize4XL}px`,
    '50': `${baseTheme.typography.fontSize4XL + 2}px`,
    '54': `${baseTheme.typography.fontSize4XL + 6}px`,
    '60': `${baseTheme.typography.fontSize4XL + 12}px`,
    h1: baseTheme.typography.h1,
    h2: baseTheme.typography.h2,
    h3: baseTheme.typography.h3,
    h4: baseTheme.typography.h4,
    h5: baseTheme.typography.h5,
    h6: baseTheme.typography.h6,
  },
  fontWeights: {
    ...baseTheme.typography,
    lighter: 'lighter',
    light: baseTheme.typography.fontWeightLight,
    normal: baseTheme.typography.fontWeightRegular,
    medium: baseTheme.typography.fontWeightMedium,
    semibold: baseTheme.typography.fontWeightBold - 100,
    bold: baseTheme.typography.fontWeightBold,
    bolder: 'bolder',
  },
  radius: {
    ...baseTheme.borders,
    sm: `${baseTheme.borders.borderRadiusSM}px`,
    md: `${baseTheme.borders.borderRadiusMD}px`,
    lg: `${baseTheme.borders.borderRadiusLG}px`,
    xl: `${baseTheme.borders.borderRadiusXL}px`,
    '2xl': `${baseTheme.borders.borderRadius2XL}px`,
    rounded: `${baseTheme.borders.borderRadiusRounded}`,
    pill: `${baseTheme.borders.borderRadiusPill}`,
  },
  breakpoints: {
    ...baseTheme.breakpoints,
    // Use the same values as baseTheme
    sm: baseTheme.breakpoints.breakpointSM,
    md: baseTheme.breakpoints.breakpointMD,
    lg: baseTheme.breakpoints.breakpointLG,
    xl: baseTheme.breakpoints.breakpointXL,
  },
  shadows: {
    ...baseTheme.shadows,
    // Use the same values as baseTheme
    sm: baseTheme.shadows.shadowSM,
    md: baseTheme.shadows.shadowMD,
    lg: baseTheme.shadows.shadowLG,
  },
};

/**
 * Create a custom theme by extending the default theme.
 *
 * @param customTheme - The custom theme object.
 * @returns The merged theme object.
 */
export const createTheme = <T extends Partial<DefaultTheme>>(
  customTheme: T
): DefaultTheme => {
  return merge({}, defaultTheme, customTheme);
};

export default createTheme<any>({});
