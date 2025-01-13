export interface Item {
  id: string;
  label: string;
}

export interface SearchResponse<T> {
  data: T[];
  total?: number;
}

export interface SearchParams {
  query: string;
  pageIndex?: number;
  pageSize?: number;
}

export interface CustomComboBoxProps {
  onItemsChange?: (items: Item[]) => void;
  searchApi: (params: SearchParams) => Promise<SearchResponse<any>>;
  transformResponse?: (item: any) => Item;
  debounceTime?: number;
  label?: string;
  maxItems?: number;
  placeholder?: string;
  noResultsMessage?: string;
  loadingMessage?: string;
  disabled?: boolean;
  enablePagination?: boolean;
  defaultPageSize?: number;
  required?: boolean;
}
