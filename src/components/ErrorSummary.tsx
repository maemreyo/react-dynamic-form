// Filepath: /src/components/ErrorSummary.tsx

import React from 'react';
import ErrorRenderer from './ErrorRenderer';
import { FieldError } from '../features/dynamic-form';

interface ErrorSummaryProps {
  errors: Partial<Record<string, FieldError>>;
  formClassNameConfig?: any;
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
            {/* Use ErrorRenderer here */}
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
