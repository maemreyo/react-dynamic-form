import { useMemo } from 'react';
import { UseFormProps } from 'react-hook-form';
import * as yup from 'yup';

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
const useFormOptions = (
  formOptions: UseFormProps | undefined,
  validationSchema: yup.Schema<any> | undefined,
  validateOnSubmit: boolean,
  validateOnChange: boolean,
  validateOnBlur: boolean
) => {
  return useMemo(() => {
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
      resolver: validationSchema
        ? (data: any) => {
            try {
              validationSchema.validateSync(data, { abortEarly: false });
              return { values: data, errors: {} };
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
        : undefined,
    } as UseFormProps;
  }, [
    formOptions,
    validationSchema,
    validateOnSubmit,
    validateOnChange,
    validateOnBlur,
  ]);
};

export default useFormOptions;
