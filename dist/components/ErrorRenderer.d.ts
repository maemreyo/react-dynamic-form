import React from 'react';
import { FieldError, FieldConfig } from '../features/dynamic-form';
interface ErrorRendererProps {
    error: FieldError;
    formClassNameConfig?: any;
    fieldConfig?: FieldConfig;
}
declare const ErrorRenderer: React.FC<ErrorRendererProps>;
export default ErrorRenderer;
