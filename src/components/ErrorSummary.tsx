// Filename: /src/components/ErrorSummary.tsx

import React from 'react';
import { FieldError } from '../features/core';
import { FieldErrors } from 'react-hook-form';

interface ErrorSummaryProps {
  errors: FieldErrors;
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
