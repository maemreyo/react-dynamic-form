// src/features/form-renderer/FormRenderer.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormField,
  Condition,
  DynamicFormProps,
  FormValues,
} from '../dynamic-form';
import { FormLayout, FormContent, FormFooter } from './components';

interface FormRendererProps extends DynamicFormProps {
  fieldsToRender: string[];
  fields: FormField[];
  conditionalFieldsConfig: Condition[];
}

const FormRenderer: React.FC<FormRendererProps> = ({
  onSubmit,
  className,
  formClassNameConfig,
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
}) => {
  const form = useFormContext<FormValues>(); // Specify FormValues type
  const { formState } = form;

  return (
    <>
      <FormLayout
        onSubmit={onSubmit}
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
          conditionalFieldsConfig={[]}
        />
        <FormFooter
          footer={footer}
          formClassNameConfig={formClassNameConfig}
          showSubmitButton={showSubmitButton}
          renderSubmitButton={renderSubmitButton}
          isSubmitting={formState.isSubmitting}
          showErrorSummary={showErrorSummary}
          errors={formState.errors} // No need to transform errors
        />
      </FormLayout>
    </>
  );
};

export default FormRenderer;
