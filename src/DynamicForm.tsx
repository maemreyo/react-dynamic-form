import React from 'react';
import {
  FormLayout,
  FormContent,
  FormFooter,
  useFormController,
  useFormFields,
  useRHFOptions,
  DynamicFormProps,
} from './features/core';
import { FormProvider } from 'react-hook-form';

const DynamicForm: React.FC<DynamicFormProps> = ({
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
  const mergedFormOptions = useRHFOptions(
    config,
    formOptions,
    validateOnSubmit,
    validateOnChange,
    validateOnBlur
  );

  const form = useFormController({
    data,
    mergedFormOptions,
    autoSave,
    enableLocalStorage,
    resetOnSubmit,
    focusFirstError,
    debounceOnChange,
    onChange,
    onFormReady,
  });

  const { formState, control } = form;

  const { fields, fieldsToRender, conditionalFieldsConfig } = useFormFields(
    data,
    config,
    formState,
    control
  );

  const handleSubmit = () => {
    form.handleSubmit(data => {
      if (onSubmit) {
        onSubmit(data);
      }
    })();
  };

  return (
    <FormProvider {...form}>
      {/* @ts-ignore */}
      <FormLayout
        onSubmit={handleSubmit}
        className={className}
        formClassNameConfig={formClassNameConfig}
        style={style}
        layout={layout}
        layoutConfig={layoutConfig}
        horizontalLabel={horizontalLabel}
        theme={theme}
      >
        {header}
        <FormContent
          fieldsToRender={fieldsToRender}
          fields={fields}
          config={config}
          formClassNameConfig={formClassNameConfig}
          horizontalLabel={horizontalLabel}
          labelWidth={labelWidth}
          disableAutocomplete={disableAutocomplete}
          showInlineError={showInlineError}
          conditionalFieldsConfig={conditionalFieldsConfig}
        />
        <FormFooter
          footer={footer}
          formClassNameConfig={formClassNameConfig}
          showSubmitButton={showSubmitButton}
          renderSubmitButton={renderSubmitButton}
          isSubmitting={formState.isSubmitting}
          showErrorSummary={showErrorSummary}
          errors={Object.keys(formState.errors).reduce((acc, key) => {
            acc[key] = formState.errors[key] as any;
            return acc;
          }, {} as Record<string, any>)}
        />
      </FormLayout>
    </FormProvider>
  );
};

export default DynamicForm;
