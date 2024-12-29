// Filepath: /src/features/core/hooks/useRHFOptions.ts

import { useMemo } from 'react';
import { UseFormProps } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormConfig } from '../types';
import { createValidationSchema } from '../../validation';

const useRHFOptions = (
  config: FormConfig,
  formOptions: UseFormProps | undefined,
  validateOnSubmit: boolean,
  validateOnChange: boolean,
  validateOnBlur: boolean
): UseFormProps => {
  return useMemo(() => {
    const schema = createValidationSchema(config);
    // Check if the schema is null
    if (!schema) {
      console.warn(
        'createValidationSchema returned null. No validation will be performed.'
      );
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
      };
    }

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
