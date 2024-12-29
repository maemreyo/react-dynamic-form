// src/features/form-renderer/components/FormLayout.tsx
import React, { useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../../theme';
import { FormClassNameConfig, LayoutType } from '../../dynamic-form/types';
import { getLayoutComponent } from '../../inputs/registry/LayoutRegistry';

interface FormLayoutProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  theme?: any;
  className?: string;
  formClassNameConfig?: FormClassNameConfig;
  style?: React.CSSProperties;
  layout: LayoutType;
  layoutConfig?: any;
  horizontalLabel?: boolean;
}

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
  };

  // Get the layout component from the registry
  const LayoutComponent = getLayoutComponent(layout);

  if (!LayoutComponent) {
    console.warn(`No layout component found for type: ${layout}`);
    return null; // Or return a default layout component
  }

  return (
    <ThemeProvider theme={mergedTheme}>
      <LayoutComponent
        onSubmit={handleSubmit}
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
