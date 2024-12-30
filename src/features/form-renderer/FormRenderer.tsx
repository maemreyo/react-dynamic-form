// Filepath: /src/features/form-renderer/FormRenderer.tsx
// @ts-nocheck
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../dynamic-form';
import { FormLayout, FormContent, FormFooter } from './components';
import { FormRendererProps } from './types';
const FormRenderer: React.FC<FormRendererProps> = ({
  onSubmit,
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
  renderSubmitButton,
  showErrorSummary = false,
  labelWidth,
  disableAutocomplete,
  showInlineError,
  renderFormContent,
  renderFormFooter,
  customInputs,
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
      <FormLayout
        onSubmit={handleSubmit(onSubmit)}
        className={className}
        formClassNameConfig={formClassNameConfig}
        style={style}
        layout={layout}
        layoutConfig={layoutConfig}
        horizontalLabel={horizontalLabel}
        theme={theme}
      >
        {header}
        {content}
      </FormLayout>
      {footerContent}
    </>
  );
};

export default FormRenderer;
