import React from 'react';
import { FieldError } from '../features/dynamic-form';
interface ErrorSummaryProps {
    errors: Partial<Record<string, FieldError>>;
    formClassNameConfig?: any;
}
declare const ErrorSummary: React.FC<ErrorSummaryProps>;
export default ErrorSummary;
