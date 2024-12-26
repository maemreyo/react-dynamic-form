import React from 'react';
import { FieldError } from '../types';

interface ErrorSummaryProps {
  errors: Partial<Record<string, FieldError>>;
}

const ErrorSummary: React.FC<ErrorSummaryProps> = ({ errors }) => {
  return (
    <div>
      <h3>Error Summary:</h3>
      <ul>
        {Object.entries(errors).map(([key, error]) => (
          <li key={key}>{error?.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorSummary;
