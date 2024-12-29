// src/features/form-renderer/FormRenderer.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, Condition, DynamicFormProps } from '../dynamic-form';
import { FormLayout, FormContent, FormFooter } from './components/';

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
  const form = useFormContext();
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
          errors={Object.keys(formState.errors).reduce((acc, key) => {
            acc[key] = formState.errors[key] as any;
            return acc;
          }, {} as Record<string, any>)}
        />
      </FormLayout>
    </>
  );
};

export default FormRenderer;
