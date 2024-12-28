// DynamicFormContent.tsx
// src/features/core/components/DynamicFormContent.tsx
import React from 'react';
import {
  FormLayout,
  FormContent,
  FormFooter,
  useFormController,
  useFormFields,
  DynamicFormProps,
} from '.';
import { useFormContext } from 'react-hook-form';

interface DynamicFormContentProps extends DynamicFormProps {}

const DynamicFormContent: React.FC<DynamicFormContentProps> = ({
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
  const {
    formState,
    control,
    handleSubmit: rootHandleSubmit,
    getValues,
  } = useFormContext();

  useFormController({
    data,
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

  const {
    fields,
    fieldsToRender,
    conditionalFieldsConfig,
    flattenedConfig,
  } = useFormFields(data, config, formState, control);

  const handleSubmit = rootHandleSubmit(
    data => {
      if (onSubmit) {
        onSubmit(data);
      }
    },
    errors => {
      console.log('Form validation failed:', errors);
    }
  );

  return (
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
        flattenedConfig={flattenedConfig}
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
  );
};

export default DynamicFormContent;
