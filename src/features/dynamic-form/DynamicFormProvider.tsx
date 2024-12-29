// src/features/dynamic-form/DynamicFormProvider.tsx
import React, { FC } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';

interface DynamicFormProviderProps {
  form: UseFormReturn<any>;
  children: React.ReactNode;
}

const DynamicFormProvider: FC<DynamicFormProviderProps> = ({
  form,
  children,
}) => {
  return <FormProvider {...form}>{children}</FormProvider>;
};

export default DynamicFormProvider;
