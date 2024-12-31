// src/components/ErrorSummary.tsx
import React from 'react';
import ErrorRenderer from './ErrorRenderer';
import { FieldErrors, FormClassNameConfig } from '../features/dynamic-form';

interface ErrorSummaryProps {
  errors: FieldErrors;
  formClassNameConfig?: FormClassNameConfig;
}

const ErrorSummary: React.FC<ErrorSummaryProps> = ({
  errors,
  formClassNameConfig,
}) => {
  return (
    <div>
      <h3>Error Summary:</h3>
      <ul>
        {Object.entries(errors).map(([key, error]) => (
          <li key={key}>
            <ErrorRenderer
              error={error!}
              formClassNameConfig={formClassNameConfig}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorSummary;
