// types.ts
// src/features/repeater/types.ts
import {
  FieldConfig,
  FormClassNameConfig,
  RepeaterFieldConfig,
} from '../core/types';
import { FormState } from 'react-hook-form';

export type AddButtonComponent = React.FC<AddButtonProps>;
export type RemoveButtonComponent = React.FC<RemoveButtonProps>;

export interface RepeaterProps {
  id: string;
  fieldConfig: RepeaterFieldConfig;
  formClassNameConfig?: FormClassNameConfig;
}

export interface AddButtonProps {
  onAppend: (value: any) => void;
  repeaterId: string;
  fieldConfig: RepeaterFieldConfig;
  formClassNameConfig?: FormClassNameConfig;
  disabled?: boolean;
}

export interface RemoveButtonProps {
  index: number;
  onRemove: (index: number) => void;
  repeaterId: string;
  fieldConfig: RepeaterFieldConfig;
  formClassNameConfig?: FormClassNameConfig;
  disabled?: boolean;
}

export interface RepeaterFieldsProps {
  index: number;
  repeaterId: string;
  flattenedFieldsConfig: Record<string, FieldConfig>;
  fieldConfig: RepeaterFieldConfig;
  formClassNameConfig?: FormClassNameConfig;
}
