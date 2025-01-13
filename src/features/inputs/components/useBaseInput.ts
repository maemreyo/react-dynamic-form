import {
  useFormContext,
  useController,
  ControllerRenderProps,
} from 'react-hook-form';
import { FieldConfig, FormValues } from '../../dynamic-form';

export const useBaseInput = (
  id: string,
  fieldConfig: FieldConfig
): {
  field: ControllerRenderProps;
} => {
  const { control } = useFormContext<FormValues>();
  const { field } = useController({
    name: id,
    control,
    rules: fieldConfig.validation,
    defaultValue: fieldConfig.defaultValue,
  });

  return { field };
};
