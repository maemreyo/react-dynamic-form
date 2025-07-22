// src/features/inputs/components/react-select-combobox/types.ts
import { FieldError } from 'react-hook-form';
import { FieldConfig, FormClassNameConfig } from '../../../dynamic-form';

export interface Item {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface SearchParams {
  query: string;
  pageIndex: number;
  pageSize: number;
}

export interface SearchResponse<T> {
  data: T[];
  total?: number;
  hasMore?: boolean;
}

export interface ReactSelectComboBoxProps {
  id: string;
  fieldConfig: FieldConfig;
  formClassNameConfig?: FormClassNameConfig;
  showInlineError?: boolean;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  error?: FieldError;

  // Custom props from fieldConfig.inputProps
  searchApi?: (params: SearchParams) => Promise<SearchResponse<any>>;
  transformResponse?: (item: any) => Item;
  onItemsChange?: (items: Item[]) => void;
  debounceTime?: number;
  maxItems?: number;
  placeholder?: string;
  disabled?: boolean;
  showDraggableList?: boolean;
  overrideOnMismatchLabel?: boolean;
  disabledItemsPosition?: 'top' | 'bottom' | 'none';
  draggableListDirection?: 'horizontal' | 'vertical';
  loadInitialItems?: boolean;
  hideSelectedOptions?: boolean;
}
