import { FieldConfig, InputType, ValidationConfig } from './types';
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

interface InputProps {
  type: string;
  placeholder?: string;
  name: string;
  id: string;
  readOnly?: boolean;
  disabled?: boolean;
  label?: string;
}
interface InputData {
  label?: string;
  inputProps: InputProps | null;
  id: string;
  error?: {
    message: string;
    type: string;
  };
}

export function generateInputsFromObject(
  data: Record<string, any>,
  config: Record<string, FieldConfig> | undefined,
  register: UseFormRegister<any>,
  readOnly: boolean | undefined,
  disableForm: boolean | undefined
): InputData[] {
  const inputs: InputData[] = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      const fieldConfig = config?.[key] || ({} as FieldConfig);
      const inputType: InputType = fieldConfig.type || mapInputType(value);
      const validationConfig = fieldConfig.validation;
      const inputProps: any = {
        type: inputType,
        name: key,
        id: key,
        placeholder: fieldConfig.placeholder,
        readOnly:
          fieldConfig.readOnly !== undefined ? fieldConfig.readOnly : readOnly,
        disabled: disableForm,
        label: fieldConfig.label,
      };
      const registerProps: any = {};
      if (validationConfig) {
        if (validationConfig.required) {
          registerProps.required =
            typeof validationConfig.required === 'string'
              ? validationConfig.required
              : 'This field is required';
        }
        if (validationConfig.minLength) {
          registerProps.minLength =
            typeof validationConfig.minLength === 'number'
              ? {
                  value: validationConfig.minLength,
                  message: `Minimum length is ${validationConfig.minLength}`,
                }
              : validationConfig.minLength;
        }
        if (validationConfig.maxLength) {
          registerProps.maxLength =
            typeof validationConfig.maxLength === 'number'
              ? {
                  value: validationConfig.maxLength,
                  message: `Maximum length is ${validationConfig.maxLength}`,
                }
              : validationConfig.maxLength;
        }
        if (validationConfig.pattern) {
          registerProps.pattern =
            validationConfig.pattern instanceof RegExp
              ? {
                  value: validationConfig.pattern,
                  message: 'Invalid format',
                }
              : validationConfig.pattern;
        }
        if (validationConfig.validate) {
          registerProps.validate = validationConfig.validate;
        }
      }

      // Handle readOnly for custom components
      if (fieldConfig.component) {
        inputProps.readOnly =
          fieldConfig.readOnly !== undefined ? fieldConfig.readOnly : readOnly;
      }

      inputs.push({
        label: fieldConfig.label || key,
        inputProps: fieldConfig.component
          ? { ...inputProps, ...register(key, registerProps) }
          : inputProps,
        id: key,
        error: register(key, registerProps)?.error,
      });
    }
  }
  return inputs;
}

export const generateDefaultLayout = (data: Record<string, any>): Layout[] => {
  const layout: Layout[] = [];
  let x = 0;
  let y = 0;
  const colWidth = 4; // Default column width

  Object.keys(data).forEach((key) => {
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
  return function (...args: any[]) {
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
