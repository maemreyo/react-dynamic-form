// src/features/dynamic-form/hooks/useRHFOptions.ts
import { useMemo } from 'react';
import { UseFormProps } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createValidationSchema } from '../../validation';
import { FormConfig, FormValues, ValidationMessages } from '../types';

const useRHFOptions = (
  config: FormConfig,
  formOptions: UseFormProps<FormValues> | undefined,
  validateOnSubmit: boolean,
  validateOnChange: boolean,
  validateOnBlur: boolean,
  globalValidationMessages: ValidationMessages | undefined
): UseFormProps<FormValues> => {
  return useMemo(() => {
    const schema = createValidationSchema(config, globalValidationMessages);
    const resolver = yupResolver(schema);

    return {
      ...formOptions,
      mode: validateOnSubmit
        ? 'onSubmit'
        : validateOnChange
        ? 'onChange'
        : validateOnBlur
        ? 'onBlur'
        : 'onSubmit',
      criteriaMode: 'all',
      resolver,
    } as UseFormProps<FormValues>;
  }, [
    config,
    formOptions,
    validateOnSubmit,
    validateOnChange,
    validateOnBlur,
    globalValidationMessages,
  ]);
};

export default useRHFOptions;
