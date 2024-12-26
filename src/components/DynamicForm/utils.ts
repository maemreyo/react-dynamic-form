import { FieldConfig, InputData, InputGroup, InputType, ValidationConfig } from './types';
import { UseFormRegister } from 'react-hook-form';
import { Layout } from 'react-grid-layout';

export const mapInputType = (value: any): InputType => {
  if (typeof value === 'string') {
    return 'text';
  }
  if (typeof value === 'number') {
    return 'number';
  }
  if (typeof value === 'boolean') {
    return 'checkbox';
  }
  if (Array.isArray(value)) {
    return 'select'; // Hoặc một loại input khác cho array
  }
  return 'text'; // Default
};

export function generateInputsFromObject(
  data: Record<string, any>,
  config: Record<string, FieldConfig> | undefined,
  register: UseFormRegister<any>,
  readOnly: boolean | undefined,
  disableForm: boolean | undefined,
  formState: any,
  isFlatten: boolean
): (InputData | InputGroup)[] {
  if (isFlatten) {
    return generateInputsFromObject(
      flattenObject(data),
      config,
      register,
      readOnly,
      disableForm,
      formState,
      false
    );
  }
  const inputs: (InputData | InputGroup)[] = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      const fieldConfig = config?.[key] || ({} as FieldConfig);

      if (typeof value === 'object' && !Array.isArray(value)) {
        // Xử lý nested object
        const nestedInputs = processNestedObject(
          value,
          config,
          register,
          key,
          readOnly,
          disableForm,
          formState,
          isFlatten
        );
        inputs.push({
          label: fieldConfig.label || key,
          id: key,
          inputs: nestedInputs,
        });
      } else {
        // Xử lý input bình thường
        const inputType: InputType = fieldConfig.type || mapInputType(value);
        const validationConfig = fieldConfig.validation;
        const inputProps: any = {
          type: inputType,
          name: key,
          id: key,
          placeholder: fieldConfig.placeholder,
          readOnly:
            fieldConfig.readOnly !== undefined
              ? fieldConfig.readOnly
              : readOnly,
          disabled: disableForm,
          label: fieldConfig.label,
          value: value,
        };
        const registerProps: any = {};
        if (validationConfig) {
          // ... (validation config code)
        }

        // Handle readOnly for custom components
        if (fieldConfig.component) {
          inputProps.readOnly =
            fieldConfig.readOnly !== undefined
              ? fieldConfig.readOnly
              : readOnly;
        }

        inputs.push({
          label: fieldConfig.label || key,
          inputProps: fieldConfig.component
            ? { ...inputProps, ...register(key, registerProps) }
            : inputProps,
          id: key,
          error: formState?.errors?.[key]?.message,
        });
      }
    }
  }
  return inputs;
}

function processNestedObject(
  data: Record<string, any>,
  config: Record<string, FieldConfig> | undefined,
  register: UseFormRegister<any>,
  parentKey: string,
  readOnly: boolean | undefined,
  disableForm: boolean | undefined,
  formState: any,
  isFlatten: boolean
): (InputData | InputGroup)[] {
  if (isFlatten) {
    return generateInputsFromObject(
      flattenObject(data),
      config,
      register,
      readOnly,
      disableForm,
      formState,
      false
    );
  }
  const inputs: (InputData | InputGroup)[] = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      const fieldConfig =
        config?.[`${parentKey}.${key}`] || ({} as FieldConfig);

      if (typeof value === 'object' && !Array.isArray(value)) {
        // Tiếp tục đệ quy nếu là object
        const nestedInputs = processNestedObject(
          value,
          config,
          register,
          `${parentKey}.${key}`,
          readOnly,
          disableForm,
          formState,
          isFlatten
        );
        inputs.push({
          label: fieldConfig.label || key,
          id: `${parentKey}.${key}`,
          inputs: nestedInputs,
        });
      } else {
        // Xử lý input bình thường
        const inputType: InputType = fieldConfig.type || mapInputType(value);
        const validationConfig = fieldConfig.validation;
        const inputProps: any = {
          type: inputType,
          name: `${parentKey}.${key}`, // Cập nhật name cho nested field
          id: `${parentKey}.${key}`,
          placeholder: fieldConfig.placeholder,
          readOnly:
            fieldConfig.readOnly !== undefined
              ? fieldConfig.readOnly
              : readOnly,
          disabled: disableForm,
          label: fieldConfig.label,
          value: value,
        };
        const registerProps: any = {};
        if (validationConfig) {
          // ... (validation config code)
        }

        inputs.push({
          label: fieldConfig.label || key,
          inputProps: fieldConfig.component
            ? {
                ...inputProps,
                ...register(`${parentKey}.${key}`, registerProps),
              }
            : inputProps,
          id: `${parentKey}.${key}`,
          error: formState?.errors?.[`${parentKey}.${key}`]?.message,
        });
      }
    }
  }

  return inputs;
}

export const flattenObject = (
  obj: Record<string, any>,
  parentKey = '',
  result: Record<string, any> = {}
) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        flattenObject(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
};

export const generateDefaultLayout = (data: Record<string, any>): Layout[] => {
  const layout: Layout[] = [];
  let x = 0;
  let y = 0;
  const colWidth = 4; // Default column width

  Object.keys(data).forEach(key => {
    layout.push({
      i: key,
      x: x,
      y: y,
      w: colWidth,
      h: 1,
    });

    x += colWidth;
    if (x >= 12) {
      x = 0;
      y++;
    }
  });

  return layout;
};

export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout | null;
  return function(...args: any[]) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// LocalStorage functions (if enableLocalStorage is true)
export const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadFromLocalStorage = (key: string): any | null => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
