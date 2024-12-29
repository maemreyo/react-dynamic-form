// src/features/dynamic-form/hooks/useRHFOptions.ts
import { useMemo } from 'react';
import { UseFormProps } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createValidationSchema } from '../../validation';
import { FormConfig } from '../types';

const useRHFOptions = (
  config: FormConfig,
  formOptions: UseFormProps | undefined,
  validateOnSubmit: boolean,
  validateOnChange: boolean,
  validateOnBlur: boolean
): UseFormProps => {
  return useMemo(() => {
    const schema = createValidationSchema(config);
    const resolver = yupResolver(schema);
    console.log('schema', schema);
    return {
      ...formOptions,
      // mode: validateOnSubmit
      //   ? 'onSubmit'
      //   : validateOnChange
      //   ? 'onChange'
      //   : validateOnBlur
      //   ? 'onBlur'
      //   : 'onSubmit',
      criteriaMode: 'all',
      resolver,
    };
  }, [config, formOptions, validateOnSubmit, validateOnChange, validateOnBlur]);
};

export default useRHFOptions;
