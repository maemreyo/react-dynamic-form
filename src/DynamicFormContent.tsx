import React, { useMemo, useCallback } from 'react';
import {
  FormLayout,
  FormContent,
  FormFooter,
  useFormController,
  useFormFields,
  DynamicFormProps,
} from '.';
import { useFormContext, FieldErrors } from 'react-hook-form';

const DynamicFormContent: React.FC<DynamicFormProps> = ({
  data,
  config = {},
  onChange,
  onSubmit,
  formOptions,
  header,
  footer,
  readOnly = false,
  disableForm = false,
  showSubmitButton = true,
  autoSave = null,
  resetOnSubmit = false,
  focusFirstError = false,
  className,
  formClassNameConfig = {},
  style,
  layout = 'flex',
  layoutConfig = { gap: '10px', columns: 2 },
  horizontalLabel = false,
  labelWidth,
  enableLocalStorage = false,
  debounceOnChange = 0,
  disableAutocomplete = false,
  showInlineError = true,
  showErrorSummary = false,
  validateOnBlur = false,
  validateOnChange = true,
  validateOnSubmit = true,
  theme,
  onFormReady,
  renderSubmitButton,
}) => {
  const form = useFormController({
    data,
    config,
    mergedFormOptions: {
      ...formOptions,
      defaultValues: data,
    },
    autoSave,
    enableLocalStorage,
    resetOnSubmit,
    focusFirstError,
    debounceOnChange,
    onChange,
    onFormReady: form => {
      if (onFormReady) {
        onFormReady(form);
      }
    },
  });

  const { handleSubmit: rootHandleSubmit, formState } = form;

  const { fields, flattenedConfig } = useFormFields(data, config, formState);

  const handleSubmit = useCallback(
    rootHandleSubmit(
      data => {
        if (onSubmit) {
          const allValues = form.getValues(); // Get all values using getValues()
          console.log('Form submitted with values:', allValues); // Log all values
          onSubmit(allValues);
        }
      },
      errors => {
        console.log('Form validation failed:', errors);
      }
    ),
    [onSubmit, form, rootHandleSubmit]
  );

  const formLayoutProps = useMemo(
    () => ({
      onSubmit: handleSubmit,
      className,
      formClassNameConfig,
      style,
      layout,
      layoutConfig,
      horizontalLabel,
      theme,
    }),
    [
      handleSubmit,
      className,
      formClassNameConfig,
      style,
      layout,
      layoutConfig,
      horizontalLabel,
      theme,
    ]
  );

  return (
    <FormLayout {...formLayoutProps}>
      {header}
      <FormContent
        fields={fields}
        config={config}
        formClassNameConfig={formClassNameConfig}
        horizontalLabel={horizontalLabel}
        labelWidth={labelWidth}
        disableAutocomplete={disableAutocomplete}
        showInlineError={showInlineError}
        flattenedConfig={flattenedConfig}
      />
      <FormFooter
        footer={footer}
        formClassNameConfig={formClassNameConfig}
        showSubmitButton={showSubmitButton}
        renderSubmitButton={renderSubmitButton}
        isSubmitting={formState.isSubmitting}
        showErrorSummary={showErrorSummary}
        errors={formState.errors as FieldErrors<any>}
      />
    </FormLayout>
  );
};

export default DynamicFormContent;
