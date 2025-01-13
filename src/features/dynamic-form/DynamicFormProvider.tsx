import React, { FC, ReactNode } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { FormValues } from './types';

interface DynamicFormProviderProps {
  form: UseFormReturn<FormValues>;
  children: ReactNode;
}

const DynamicFormProvider: FC<DynamicFormProviderProps> = ({
  form,
  children,
}) => {
  return <FormProvider {...form}>{children}</FormProvider>;
};

export default DynamicFormProvider;
