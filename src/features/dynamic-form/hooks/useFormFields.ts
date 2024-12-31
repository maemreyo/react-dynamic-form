// Filepath: /src/features/dynamic-form/hooks/useFormFields.ts

import { useMemo, useState, useEffect } from 'react';
import {
  FormField,
  FormConfig,
  Condition,
  FormValues,
  ValidationMessages,
} from '../types';
import { FormState, useWatch, Control } from 'react-hook-form';
import { shouldRenderField, getFields, flattenConfig } from '../utils';

/**
 * Custom hook to generate form fields from data and config.
 *
 * @param config - The form configuration.
 * @param formState - The `react-hook-form` form state.
 * @param control - The `react-hook-form` control object.
 * @param globalValidationMessages - Optional global validation messages.
 * @returns An object containing the form fields and the fields to render.
 */
function useFormFields(
  config: FormConfig,
  formState: FormState<FormValues>,
  control: Control<FormValues>,
  globalValidationMessages: ValidationMessages | undefined
): {
  fields: FormField[];
  fieldsToRender: string[];
  conditionalFieldsConfig: Condition[];
} {
  // @ts-expect-error
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setUpdate((prev) => !prev);
  }, [config]);

  const flattenedConfig = useMemo(() => flattenConfig(config), [config]);

  const conditionalFieldsConfig = useMemo(
    () =>
      Object.keys(config)
        .filter(
          (fieldId) =>
            config[fieldId].conditional &&
            typeof config[fieldId].conditional?.when === 'string'
        )
        .map((fieldId) => ({
          when: config[fieldId].conditional!.when,
          operator: config[fieldId].conditional!.operator || 'is',
          value: config[fieldId].conditional?.value,
          comparator: config[fieldId].conditional?.comparator,
          fields: config[fieldId].conditional!.fields || [],
        })),
    [config]
  );

  const watchedValues = useWatch({
    control,
    name: conditionalFieldsConfig.map((condition) => condition.when),
  });

  const fieldsToRender = useMemo(
    () =>
      Object.keys(config).filter((fieldId) =>
        shouldRenderField(fieldId, conditionalFieldsConfig, watchedValues)
      ),
    [config, conditionalFieldsConfig, watchedValues]
  );

  const fields = useMemo(
    () => getFields(flattenedConfig, formState, globalValidationMessages),
    [flattenedConfig, formState, globalValidationMessages]
  );

  return { fields, fieldsToRender, conditionalFieldsConfig };
}

export default useFormFields;
