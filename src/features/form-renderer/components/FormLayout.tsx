// src/features/form-renderer/components/FormLayout.tsx
import React, { useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../../theme';
import { FormLayoutProps } from '../types';
import { getLayoutComponent } from '../../inputs';

const FormLayout: React.FC<FormLayoutProps> = ({
  onSubmit,
  children,
  className,
  formClassNameConfig,
  style,
  layout,
  layoutConfig,
  horizontalLabel,
  theme,
}) => {
  const mergedTheme = useMemo(() => {
    return theme ? { ...defaultTheme, ...theme } : defaultTheme;
  }, [theme]);

  // Get the layout component from the registry
  const LayoutComponent = getLayoutComponent(layout);

  if (!LayoutComponent) {
    console.warn(`No layout component found for type: ${layout}`);
    return null; // Or return a default layout component
  }

  return (
    <ThemeProvider theme={mergedTheme}>
      <LayoutComponent
        onSubmit={onSubmit}
        className={className}
        formClassNameConfig={formClassNameConfig}
        style={style}
        layoutConfig={layoutConfig}
        horizontalLabel={horizontalLabel}
      >
        {children}
      </LayoutComponent>
    </ThemeProvider>
  );
};

export default FormLayout;
