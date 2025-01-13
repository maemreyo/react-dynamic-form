import React from 'react';
import { ErrorSummary } from '../../../components';
import { FormFooterProps } from '../types';

const FormFooter: React.FC<FormFooterProps> = ({
  footer,
  showErrorSummary,
  errors,
  formClassNameConfig,
}) => {
  return (
    <>
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
