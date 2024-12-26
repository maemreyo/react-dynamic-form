// hooks/useRHFOptions.ts
import { useMemo } from 'react';
import { UseFormProps, Resolver } from 'react-hook-form';
import { Schema } from 'yup';

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
  formOptions: UseFormProps | undefined,
  validationSchema: Schema<any> | undefined,
  validateOnSubmit: boolean,
  validateOnChange: boolean,
  validateOnBlur: boolean
): UseFormProps => {
  return useMemo(() => {
    const resolver: Resolver<any> | undefined = validationSchema
      ? async data => {
          try {
            const values = await validationSchema.validate(data, {
              abortEarly: false,
            });
            return { values, errors: {} };
          } catch (errors: any) {
            return {
              values: {},
              errors: errors.inner.reduce(
                (allErrors: any, currentError: any) => ({
                  ...allErrors,
                  [currentError.path]: {
                    type: currentError.type ?? 'validation',
                    message: currentError.message,
                  },
                }),
                {}
              ),
            };
          }
        }
      : undefined;

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
  }, [
    formOptions,
    validationSchema,
    validateOnSubmit,
    validateOnChange,
    validateOnBlur,
  ]);
};

export default useRHFOptions;
