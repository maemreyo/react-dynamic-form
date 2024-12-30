// Filepath: /src/features/form-renderer/components/FormLayout.tsx
import React, { useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../../theme';
import { FormClassNameConfig, LayoutType } from '../../dynamic-form/types';
import {
  FormContainer,
  GridFormContainer,
  FormContainerProps,
  GridFormContainerProps,
} from '../../../styles';

type LayoutComponentProps = FormContainerProps &
  Partial<Omit<GridFormContainerProps, keyof FormContainerProps>> & {
    children?: React.ReactNode;
  };

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

  const LayoutComponent: React.ComponentType<LayoutComponentProps> =
    layout === 'grid' ? GridFormContainer : FormContainer;
  const layoutComponentProps: LayoutComponentProps = {
    onSubmit: handleSubmit,
    className: `${className || ''} ${formClassNameConfig?.formContainer || ''}`,
    style,
    $layout: layout,
    $layoutConfig: layoutConfig,
    $horizontalLabel: horizontalLabel,
    $minWidth: layoutConfig?.minWidth,
    $gap: layoutConfig?.gap,
    $breakpoints: layoutConfig?.breakpoints,
    children: children,
  };
  return (
    <ThemeProvider theme={mergedTheme}>
      <LayoutComponent {...layoutComponentProps} />
    </ThemeProvider>
  );
};

export default FormLayout;
