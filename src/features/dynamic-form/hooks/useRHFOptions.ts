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
  globalValidationMessages: ValidationMessages | undefined,
  beforeValidate?: (data: FormValues) => boolean | Promise<boolean>
): UseFormProps<FormValues> => {
  return useMemo(() => {
    const schema = createValidationSchema(config, globalValidationMessages);
    const yupResolverInstance = yupResolver(schema);

    const customResolver = async (
      values: FormValues,
      context: any,
      options: any
    ) => {
      // Run beforeValidate hook first
      if (beforeValidate) {
        const shouldContinue = await beforeValidate(values);
        if (!shouldContinue) {
          return {
            values: {},
            errors: {
              root: {
                type: 'beforeValidate',
                message: 'Validation stopped by beforeValidate hook',
              },
            },
          };
        }
      }

      // If beforeValidate passes or is not provided, proceed with Yup validation
      return yupResolverInstance(values, context, options);
    };

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
      resolver: customResolver,
    } as UseFormProps<FormValues>;
  }, [
    config,
    formOptions,
    validateOnSubmit,
    validateOnChange,
    validateOnBlur,
    globalValidationMessages,
    beforeValidate,
  ]);
};

export default useRHFOptions;
