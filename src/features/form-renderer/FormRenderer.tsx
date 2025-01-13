// @ts-nocheck
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../dynamic-form';
import { FormLayout, FormContent, FormFooter } from './components';
import { FormRendererProps } from './types';

const FormRenderer: React.FC<FormRendererProps> = ({
  className,
  formClassNameConfig = {},
  style,
  layout = 'grid',
  layoutConfig,
  horizontalLabel,
  theme,
  header,
  fieldsToRender,
  fields,
  config,
  footer,
  showSubmitButton = true,
  showErrorSummary = false,
  labelWidth,
  disableAutocomplete,
  showInlineError,
  customInputs,
  onSubmit,
  renderSubmitButton,
  renderFormContent,
  renderFormFooter,
  renderErrorSummary,
}) => {
  const form = useFormContext<FormValues>();
  const { formState, handleSubmit } = form;

  const content = renderFormContent ? (
    renderFormContent({
      fieldsToRender,
      fields,
      config,
      formClassNameConfig,
      horizontalLabel,
      labelWidth,
      disableAutocomplete,
      showInlineError,
      conditionalFieldsConfig: [],
      renderInput: (field, fieldConfig, commonInputProps) => <></>,
    })
  ) : (
    <FormContent
      fieldsToRender={fieldsToRender}
      fields={fields}
      config={config}
      formClassNameConfig={formClassNameConfig}
      horizontalLabel={horizontalLabel}
      labelWidth={labelWidth}
      disableAutocomplete={disableAutocomplete}
      showInlineError={showInlineError}
      conditionalFieldsConfig={[]}
      customInputs={customInputs}
    />
  );
  const footerContent = renderFormFooter ? (
    renderFormFooter({
      footer,
      showSubmitButton,
      renderSubmitButton: renderSubmitButton!,
      isSubmitting: formState.isSubmitting,
      showErrorSummary,
      errors: formState.errors,
      formClassNameConfig,
    })
  ) : (
    <FormFooter
      footer={footer}
      formClassNameConfig={formClassNameConfig}
      showSubmitButton={showSubmitButton}
      renderSubmitButton={renderSubmitButton}
      isSubmitting={formState.isSubmitting}
      showErrorSummary={showErrorSummary}
      errors={formState.errors}
    />
  );

  return (
    <>
      {header}
      {content}
      {footerContent}
    </>
  );
};

export default FormRenderer;
