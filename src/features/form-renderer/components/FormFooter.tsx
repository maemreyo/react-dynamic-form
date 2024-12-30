// Filepath: /src/features/form-renderer/components/FormFooter.tsx
import React from 'react';
import { ErrorSummary } from '../../../components';
import { FormFooterProps } from '../types';

const FormFooter: React.FC<FormFooterProps> = ({
  footer,
  renderSubmitButton,
  isSubmitting,
  showErrorSummary,
  errors,
  formClassNameConfig,
}) => {
  return (
    <>
      {/* {showSubmitButton &&
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
        ))} */}
      {footer}
      {showErrorSummary && Object.keys(errors).length > 0 && (
        <ErrorSummary
          errors={errors}
          formClassNameConfig={formClassNameConfig}
        />
      )}
    </>
  );
};

export default FormFooter;
