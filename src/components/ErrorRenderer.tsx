import React from 'react';
import styled from 'styled-components';
import {
  FieldError,
  FieldConfig,
} from '../features/dynamic-form';

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-top: ${({ theme }) => theme.space.xs};
`;

interface ErrorRendererProps {
  error: FieldError;
  formClassNameConfig?: any;
  fieldConfig?: FieldConfig; // Add fieldConfig prop
}

const ErrorRenderer: React.FC<ErrorRendererProps> = ({
  error,
  formClassNameConfig,
  fieldConfig, // Receive fieldConfig
}) => {
  let message = error.message || '';

  // Use validationMessages from fieldConfig if available
  if (fieldConfig && fieldConfig.validationMessages) {
    const template = fieldConfig.validationMessages[error.type];
    const values = {
      label: fieldConfig.label,
      value: error,
      error: error,
      config: fieldConfig,
    };
    if (typeof template === 'function') {
      message = template(values) as string;
    } else if (typeof template === 'string') {
      message = template;
    }
  }

  return (
    <ErrorMessage className={formClassNameConfig?.errorMessage}>
      {message}
    </ErrorMessage>
  );
};

export default ErrorRenderer;
