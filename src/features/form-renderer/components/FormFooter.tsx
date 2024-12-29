// src/features/form-renderer/components/FormFooter.tsx
import React from 'react';
import { SubmitButton } from '../../../styles';
import { ErrorSummary } from '../../../components';
import { FormFooterProps } from '../types';
import { useTheme } from '../../../theme/ThemeProvider';

const FormFooter: React.FC<FormFooterProps> = ({
  footer,
  showSubmitButton,
  renderSubmitButton,
  isSubmitting,
  showErrorSummary,
  errors,
  formClassNameConfig,
}) => {
  const theme = useTheme();
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
        <ErrorSummary
          errors={errors}
          formClassNameConfig={formClassNameConfig}
        />
      )}
    </>
  );
};

export default FormFooter;
