// src/features/core/hooks/useRHFOptions.ts
import { useMemo } from 'react';
import { UseFormProps } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormConfig } from '../types';
import { createValidationSchema } from '../../validation';

/**
 * Custom hook for generating form options for `react-hook-form`'s `useForm` hook.
 *
 * @param formOptions - User-provided form options.
 * @param validationSchema - Optional `yup` validation schema.
 * @param validateOnSubmit - Whether to validate on submit.
 * @param validateOnChange - Whether to validate on change.
 * @param validateOnBlur - Whether to validate on blur.
 * @returns The generated form options.
 */

const useRHFOptions = (
  config: FormConfig,
  formOptions: UseFormProps | undefined,
  validateOnSubmit: boolean,
  validateOnChange: boolean,
  validateOnBlur: boolean
): UseFormProps => {
  return useMemo(() => {
    const schema = createValidationSchema(config)!;
    const resolver = yupResolver(schema);
    console.log('schema', schema);
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
    };
  }, [config, formOptions, validateOnSubmit, validateOnChange, validateOnBlur]);
};

export default useRHFOptions;
