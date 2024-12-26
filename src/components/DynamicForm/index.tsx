// index.tsx
import React from 'react';
import { DynamicFormProps, FieldError } from './types';
import useFormFields from './hooks/useFormFields';
import useFormController from './hooks/useFormController';
import useRHFOptions from './hooks/useRHFOptions';
import FormLayout from './components/FormLayout';
import FormContent from './components/FormContent';
import FormFooter from './components/FormFooter';

const DynamicForm: React.FC<DynamicFormProps> = ({
  data,
  config = {},
  onChange,
  onSubmit,
  formOptions,
  validationSchema,
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
  renderInput,
}) => {
  const mergedFormOptions = useRHFOptions(
    formOptions,
    validationSchema,
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

  const { formState, watch } = form;
  const formValues = watch();

  const fields = useFormFields(
    data,
    config,
    form.register,
    readOnly,
    disableForm,
    formState
  );

  const handleSubmit = () => {
    form.handleSubmit(data => {
      if (onSubmit) {
        onSubmit(data);
      }
    })();
  };

  return (
    // @ts-ignore
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
        fields={fields}
        config={config}
        formClassNameConfig={formClassNameConfig}
        horizontalLabel={horizontalLabel}
        labelWidth={labelWidth}
        renderInput={renderInput}
        register={form.register}
        formValues={formValues}
        disableAutocomplete={disableAutocomplete}
        showInlineError={showInlineError}
      />
      <FormFooter
        footer={footer}
        showSubmitButton={showSubmitButton}
        renderSubmitButton={renderSubmitButton}
        isSubmitting={formState.isSubmitting}
        showErrorSummary={showErrorSummary}
        errors={Object.keys(formState.errors).reduce((acc, key) => {
          acc[key] = formState.errors[key] as FieldError;
          return acc;
        }, {} as Record<string, FieldError>)}
        formClassNameConfig={formClassNameConfig}
      />
    </FormLayout>
  );
};

export default DynamicForm;
