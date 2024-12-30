// Filepath: /src/features/inputs/registry/components/FlexLayout.tsx

import React from 'react';
import styled from 'styled-components';
import { FormClassNameConfig } from '../../../dynamic-form/types';

const StyledFlexLayout = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme, $gap }: { theme: any; $gap: string }) =>
    $gap || theme.space.md};
  padding: ${({ theme }) => theme.space['3xl']};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
`;

interface FlexLayoutProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className?: string;
  formClassNameConfig?: FormClassNameConfig;
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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <StyledFlexLayout
      onSubmit={handleSubmit}
      className={`${className || ''} ${formClassNameConfig?.formContainer || ''}`}
      style={style}
      $gap={layoutConfig?.gap}
      data-layoutconfig={JSON.stringify(layoutConfig)}
      data-horizontallabel={horizontalLabel ? 'true' : 'false'}
    >
      {children}
    </StyledFlexLayout>
  );
};

export { FlexLayout };
