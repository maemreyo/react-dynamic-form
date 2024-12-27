// src/features/core/components/FormFooter.tsx
import React from 'react';
import { FormClassNameConfig, FieldError } from '../types';
import { SubmitButton } from '../../../styles';
import { ErrorSummary } from '../../../components';

interface FormFooterProps {
  footer?: React.ReactNode;
  showSubmitButton: boolean;
  renderSubmitButton?: (
    handleSubmit: () => void,
    isSubmitting: boolean
  ) => React.ReactNode;
  isSubmitting: boolean;
  showErrorSummary: boolean;
  errors: Record<string, FieldError>;
  formClassNameConfig?: FormClassNameConfig;
}

const FormFooter: React.FC<FormFooterProps> = ({
  footer,
  showSubmitButton,
  renderSubmitButton,
  isSubmitting,
  showErrorSummary,
  errors,
  formClassNameConfig,
}) => {
  return (
    <>
      {footer}
      {showSubmitButton &&
        (renderSubmitButton ? (
          renderSubmitButton(() => {}, isSubmitting)
        ) : (
          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            className={formClassNameConfig?.button}
          >
            Submit
          </SubmitButton>
        ))}
      {showErrorSummary && Object.keys(errors).length > 0 && (
        <ErrorSummary errors={errors} />
      )}
    </>
  );
};

export default FormFooter;
