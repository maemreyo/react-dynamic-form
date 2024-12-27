import React from 'react';
import { ThemeProvider } from 'styled-components';
import { FormContainer, FormContainerProps } from '../../../styles';
import { defaultTheme } from '../../../theme';
import { useMemo } from 'react';
import { FormClassNameConfig, LayoutType } from '../types';

interface FormLayoutProps extends FormContainerProps {
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

  return (
    <ThemeProvider theme={mergedTheme}>
      <FormContainer
        onSubmit={handleSubmit}
        className={`${className || ''} ${formClassNameConfig?.formContainer ||
          ''}`}
        $layout={layout}
        $layoutConfig={layoutConfig}
        $horizontalLabel={horizontalLabel}
        data-layoutconfig={JSON.stringify(layoutConfig)}
        data-horizontallabel={horizontalLabel ? 'true' : 'false'}
        style={style}
      >
        {children}
      </FormContainer>
    </ThemeProvider>
  );
};

export default FormLayout;
