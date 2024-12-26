// components/FormFooter.tsx
import React from 'react';
import { FormClassNameConfig, FieldError } from '../types';
import SubmitButton from './SubmitButton';
import ErrorSummary from './ErrorSummary';
import { SubmitButton as StyledSubmitButton, FormContainer } from '../styles';

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
  formClassNameConfig: FormClassNameConfig;
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
          <StyledSubmitButton
            type="submit"
            disabled={isSubmitting}
            className={formClassNameConfig?.button}
          >
            Submit
          </StyledSubmitButton>
        ))}
      {showErrorSummary && Object.keys(errors).length > 0 && (
        <ErrorSummary errors={errors} />
      )}
    </>
  );
};

export default FormFooter;
