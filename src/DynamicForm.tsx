// Filename: /src/DynamicForm.tsx

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DynamicFormProps } from './features/core';
import DynamicFormContent from './DynamicFormContent';
import { createValidationSchema } from './features/validation';
import { useRHFOptions } from './features/core';

const DynamicForm: React.FC<DynamicFormProps> = ({
  data,
  config = {},
  onSubmit,
  formOptions,
  validationSchema,
  onFormReady,
  ...rest
}) => {
  const schema = createValidationSchema(config)!;
  const resolver = validationSchema
    ? yupResolver(validationSchema)
    : yupResolver(schema);

  const mergedFormOptions = useRHFOptions(config, {
    ...formOptions,
    resolver: resolver,
  });

  const form = useForm({
    ...mergedFormOptions,
    defaultValues: data,
  });

  return (
    <FormProvider {...form}>
      <DynamicFormContent
        data={data}
        config={config}
        onSubmit={onSubmit}
        onFormReady={onFormReady}
        {...rest}
      />
    </FormProvider>
  );
};

export default DynamicForm;
