// Filepath: /src/components/ErrorRenderer.tsx
import React from 'react';
import { FieldError } from '../features/core';
import styled from 'styled-components';

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-top: ${({ theme }) => theme.space.xs};
`;

interface ErrorRendererProps {
  error: FieldError;
  formClassNameConfig?: any;
}

const ErrorRenderer: React.FC<ErrorRendererProps> = ({
  error,
  formClassNameConfig,
}) => {
  if (error && error.message) {
    return (
      <ErrorMessage className={formClassNameConfig?.errorMessage}>
        {error.message}
      </ErrorMessage>
    );
  }

  return null;
};

export default ErrorRenderer;
