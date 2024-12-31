import React from 'react';
import styled from 'styled-components';
import { FieldConfig } from '../features/dynamic-form';

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-top: ${({ theme }) => theme.space.xs};
`;

interface ErrorRendererProps {
  error: any;
  formClassNameConfig?: any;
  fieldConfig?: FieldConfig;
}

const ErrorRenderer: React.FC<ErrorRendererProps> = ({
  error,
  formClassNameConfig,
  fieldConfig,
}) => {
  let message = error && error.message ? error.message : '';

  if (fieldConfig && fieldConfig.validationMessages) {
    const errorType = error && error.type;
    if (errorType) {
      const template = fieldConfig.validationMessages[errorType];
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
  }

  return (
    <ErrorMessage className={formClassNameConfig?.errorMessage}>
      {message}
    </ErrorMessage>
  );
};

export default ErrorRenderer;
