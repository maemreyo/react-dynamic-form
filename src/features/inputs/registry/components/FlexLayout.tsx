// Filepath: /src/features/core/components/FlexLayout.tsx

import React from 'react';
import { FormContainer, FormContainerProps } from '../../../../styles';

interface FlexLayoutProps extends FormContainerProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className?: string;
  formClassNameConfig?: any;
  style?: React.CSSProperties;
  layoutConfig?: any;
  horizontalLabel?: boolean;
}

const FlexLayout: React.FC<FlexLayoutProps> = ({
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
      $layout="flex"
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

export { FlexLayout };
