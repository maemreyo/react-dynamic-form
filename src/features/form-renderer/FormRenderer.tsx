// src/features/form-renderer/FormRenderer.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormField,
  Condition,
  DynamicFormProps,
  FormValues,
  RenderFormContentProps,
  RenderFormFooterProps,
} from '../dynamic-form';
import { FormLayout, FormContent, FormFooter } from './components';
import { FormRendererProps } from './types';

const FormRenderer: React.FC<FormRendererProps> = ({
  onSubmit,
  className,
  formClassNameConfig, // Add formClassNameConfig here
  style,
  layout,
  layoutConfig,
  horizontalLabel,
  theme,
  header,
  fieldsToRender,
  fields,
  config,
  footer,
  showSubmitButton,
  renderSubmitButton,
  showErrorSummary,
  labelWidth,
  disableAutocomplete,
  showInlineError,
  renderFormContent,
  renderFormFooter,
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
    <FormLayout
      onSubmit={handleSubmit(onSubmit)} // Use handleSubmit from react-hook-form
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
      {footerContent}
    </FormLayout>
  );
};

export default FormRenderer;
