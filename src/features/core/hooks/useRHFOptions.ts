// Filename: /src/features/core/hooks/useRHFOptions.ts

import { useMemo } from 'react';
import { UseFormProps } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormConfig } from '../types';
import { createValidationSchema } from '../../validation';

/**
 * Custom hook for generating form options for `react-hook-form`'s `useForm` hook.
 *
 * @param config - The form configuration.
 * @param formOptions - User-provided form options.
 * @returns The generated form options.
 */
const useRHFOptions = (
  config: FormConfig,
  formOptions: UseFormProps | undefined
): UseFormProps => {
  const schema = useMemo(() => createValidationSchema(config), [config]);
  const resolver = yupResolver(schema);

  return {
    ...formOptions,
    criteriaMode: 'all',
    resolver,
  };
};

export default useRHFOptions;
