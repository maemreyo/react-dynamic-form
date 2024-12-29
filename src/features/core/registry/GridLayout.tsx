// Filepath: /src/features/core/components/GridLayout.tsx

import React from 'react';
import { FormContainer, FormContainerProps } from '../../../styles';

interface GridLayoutProps extends FormContainerProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className?: string;
  formClassNameConfig?: any;
  style?: React.CSSProperties;
  layoutConfig?: any;
  horizontalLabel?: boolean;
}

const GridLayout: React.FC<GridLayoutProps> = ({
  onSubmit,
  children,
  className,
  formClassNameConfig,
  style,
  layoutConfig,
  horizontalLabel,
}) => {
  return (
    <FormContainer
      onSubmit={onSubmit}
      className={`${className || ''} ${formClassNameConfig?.formContainer ||
        ''}`}
      $layout="grid"
      $layoutConfig={layoutConfig}
      $horizontalLabel={horizontalLabel}
      data-layoutconfig={JSON.stringify(layoutConfig)}
      data-horizontallabel={horizontalLabel ? 'true' : 'false'}
      style={style}
    >
      {children}
    </FormContainer>
  );
};

export { GridLayout };
