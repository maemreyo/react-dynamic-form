// Filepath: /src/DynamicForm.tsx
import React from 'react';
import {
  useDynamicForm,
  useRHFOptions,
  useFormFields,
  DynamicFormProvider,
  DynamicFormProps,
} from './features/dynamic-form';
import { FormRenderer } from './features/form-renderer';

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
  autoSave,
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

  const form = useDynamicForm({
    data,
    formOptions: mergedFormOptions,
    autoSave,
    enableLocalStorage,
    resetOnSubmit,
    focusFirstError,
    debounceOnChange,
    onChange,
    onFormReady,
  });

  const { formState, control, handleSubmit } = form; // Destructure handleSubmit here

  const { fields, fieldsToRender, conditionalFieldsConfig } = useFormFields(
    data,
    config,
    formState,
    control
  );

  // Use the handleSubmit from useDynamicForm
  const onSubmitHandler = () => {
    handleSubmit(data => {
      if (onSubmit) {
        onSubmit(data);
      }
    })();
  };

  return (
    <DynamicFormProvider form={form}>
      <FormRenderer
        onSubmit={onSubmitHandler} // Pass the onSubmit handler
        className={className}
        formClassNameConfig={formClassNameConfig}
        style={style}
        layout={layout}
        layoutConfig={layoutConfig}
        horizontalLabel={horizontalLabel}
        theme={theme}
        header={header}
        fieldsToRender={fieldsToRender}
        fields={fields}
        config={config}
        footer={footer}
        readOnly={readOnly}
        disableForm={disableForm}
        showSubmitButton={showSubmitButton}
        renderSubmitButton={renderSubmitButton}
        formOptions={formOptions}
        showErrorSummary={showErrorSummary}
        labelWidth={labelWidth}
        disableAutocomplete={disableAutocomplete}
        showInlineError={showInlineError}
        conditionalFieldsConfig={conditionalFieldsConfig}
        data={data}
      />
    </DynamicFormProvider>
  );
};

export default DynamicForm;
