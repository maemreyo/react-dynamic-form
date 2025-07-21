import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useFormContext, useController, FieldError } from 'react-hook-form';
import {
  InputLabel,
  SortableTagPicker,
  SortableTagPickerProps,
} from '@matthew.ngo/react-form-kit';
import { Container } from './styled';
import {
  CustomComboBoxProps,
  Item,
  SearchParams,
  SearchResponse,
} from './types';
import { FieldConfig, FormClassNameConfig } from '../../../dynamic-form';

interface ComboBoxProps
  extends Omit<CustomComboBoxProps, 'onItemsChange'>,
    Omit<
      SortableTagPickerProps,
      'value' | 'onChange' | 'options' | 'onSearch' | 'onRemoveItem' | 'error'
    > {
  id: string;
  fieldConfig: FieldConfig;
  formClassNameConfig?: FormClassNameConfig;
  showInlineError?: boolean;
  horizontalLabel?: boolean;
  labelWidth?: string | number;
  error?: FieldError;
}
const PAGE_SIZE = 20;

const defaultTransformResponse = (item: any): Item => ({
  id: item.id || item.value,
  label: item.label,
  disabled: item.disabled,
});

const loadAllPagesUntilDefaultsFound = async (
  defaultIds: string[],
  searchApi: any,
  transformResponse: any
) => {
  let page = 1;
  const foundIds = new Set<string>();
  let allFoundItems: Item[] = [];

  while (defaultIds.length > foundIds.size) {
    try {
      const response = await searchApi({
        query: '',
        pageIndex: page,
        pageSize: PAGE_SIZE,
      });

      const transformedItems = response.data.map(transformResponse);

      const foundInThisPage = transformedItems.filter((item: any) =>
        defaultIds.includes(item.id)
      );

      foundInThisPage.forEach((item: any) => foundIds.add(item.id));
      allFoundItems = [...allFoundItems, ...transformedItems];

      if (
        transformedItems.length < PAGE_SIZE ||
        foundIds.size === defaultIds.length
      ) {
        break;
      }

      page++;
    } catch (error) {
      console.error('Error loading all pages:', error);
      break;
    }
  }

  return allFoundItems;
};

const initializeData = async (
  searchApi: (params: SearchParams) => Promise<SearchResponse<any>>,
  transformResponse: (item: any) => Item,
  fieldConfig: FieldConfig,
  loadInitialItems: boolean,
  overrideOnMismatchLabel: boolean,
  setIsLoading: (loading: boolean) => void,
  setSearchResults: (items: Item[]) => void,
  setAllItems: (items: Item[]) => void,
  setSelectedItems: (items: Item[]) => void,
  setError: (error: string | null) => void,
  setLabelMismatchWarning: (warning: string | null) => void,
  field: any
) => {
  if (!searchApi) return;

  setIsLoading(true);
  try {
    if (
      loadInitialItems ||
      (fieldConfig.defaultValue &&
        Array.isArray(fieldConfig.defaultValue) &&
        fieldConfig.defaultValue.length > 0)
    ) {
      const response = await searchApi({
        query: '',
        pageIndex: 1,
        pageSize: PAGE_SIZE,
      });
      const initialItems = response.data.map(transformResponse);
      setSearchResults(initialItems);
      setAllItems(initialItems);

      if (
        fieldConfig.defaultValue &&
        Array.isArray(fieldConfig.defaultValue) &&
        fieldConfig.defaultValue.length > 0
      ) {
        const defaultIds = fieldConfig.defaultValue.map((item) => item.id);
        const foundInInitial = initialItems.filter((item) =>
          defaultIds.includes(item.id)
        );

        let allFoundItems = foundInInitial;
        if (foundInInitial.length < defaultIds.length) {
          const items = await loadAllPagesUntilDefaultsFound(
            defaultIds,
            searchApi,
            transformResponse
          );
          allFoundItems = items;
          // @ts-ignore
          setAllItems((prevItems) => {
            const newItems = [...items];
            // @ts-ignore
            prevItems.forEach((item) => {
              if (!newItems.some((newItem) => newItem.id === item.id)) {
                newItems.push(item);
              }
            });
            return newItems;
          });
        }

        const labelMismatches = fieldConfig.defaultValue.filter(
          (defaultItem) => {
            const matchingItem = allFoundItems.find(
              (item) => item.id === defaultItem.id
            );
            return matchingItem && matchingItem.label !== defaultItem.label;
          }
        );

        if (labelMismatches.length > 0) {
          console.warn('Label mismatch detected for items:', labelMismatches);
          setLabelMismatchWarning(
            `Warning: Some items have different labels in the system. Labels have been updated to match the system values.`
          );
        }

        const defaultItems = fieldConfig.defaultValue.map((defaultItem) => {
          const foundItem = allFoundItems.find(
            (item) => item.id === defaultItem.id
          );
          return foundItem || defaultItem;
        });

        setSelectedItems(defaultItems);

        if (overrideOnMismatchLabel) {
          field.onChange(defaultItems);
        }
      }
    }
  } catch (error) {
    console.error('Error initializing data:', error);
    setError('Failed to load initial data');
  } finally {
    setIsLoading(false);
  }
};

const ComboBox: React.FC<ComboBoxProps> = ({
  id,
  fieldConfig,
  formClassNameConfig = {},
  ...props
}) => {
  const { label } = fieldConfig;
  const {
    onItemsChange,
    searchApi,
    transformResponse = defaultTransformResponse,
    debounceTime = 500,
    maxItems,
    placeholder = 'Search items...',
    // noResultsMessage = 'No results found',
    // loadingMessage = 'Loading...',
    disabled = false,
    showDraggableList,
    overrideOnMismatchLabel = true,
    disabledItemsPosition = 'top',
    draggableListDirection = 'vertical',
    loadInitialItems = false,
    hideSelectedOptions = false,
  } = fieldConfig.inputProps as CustomComboBoxProps;

  const { control } = useFormContext();
  const { field } = useController({
    name: id,
    control,
    rules: fieldConfig.validation,
    defaultValue: fieldConfig.defaultValue,
  });

  const [allItems, setAllItems] = useState<Item[]>([]);
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setError] = useState<string | null>(null);
  // @ts-ignore
  const [labelMismatchWarning, setLabelMismatchWarning] = useState<
    string | null
  >(null);
  // @ts-ignore
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = useCallback(
    async (query: string) => {
      if (!searchApi) {
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        setCurrentPage(1);
        const response = await searchApi({
          query,
          pageIndex: 1,
          pageSize: PAGE_SIZE,
        });

        if (!response || !Array.isArray(response.data)) {
          console.error('Invalid API response structure:', response);
          setSearchResults([]);
          setError('Invalid response format from server');
          return;
        }

        const transformedItems = response.data
          .map(transformResponse)
          .filter((item) => item && item.id && item.label); // Filter out invalid items

        setSearchResults(transformedItems);

        setAllItems((prevItems) => {
          const newItemsMap = new Map(prevItems.map((i) => [i.id, i]));
          transformedItems.forEach((item) => {
            if (item && item.id) {
              newItemsMap.set(item.id, item);
            }
          });
          return Array.from(newItemsMap.values());
        });
      } catch (err) {
        console.error('Failed to fetch search results:', err);
        setError('Failed to fetch search results');
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [searchApi, transformResponse]
  );

  const handleOnChange = useCallback(
    (values: string[]) => {
      const updatedItems = values.map(
        (value) =>
          allItems.find((item) => item.id === value) ||
          selectedItems.find((item) => item.id === value) || {
            id: value,
            label: '',
            disabled: false,
          }
      );
      setSelectedItems(updatedItems);
      field.onChange(updatedItems);

      if (onItemsChange) {
        onItemsChange(updatedItems);
      }
    },
    [allItems, selectedItems, field]
  );

  const handleDropdownOpen = useCallback(async () => {
    if (searchResults.length === 0 && !isLoading) {
      await handleSearch('');
    }
  }, [searchResults.length, isLoading, handleSearch]);

  const combinedOptions = useMemo(() => {
    const combined = [
      ...searchResults,
      ...selectedItems.filter(
        (item) => !searchResults.some((sr) => sr.id === item.id)
      ),
    ];
    return combined;
  }, [searchResults, selectedItems]);

  const options = useMemo(() => {
    const mappedOptions = combinedOptions.map((item) => ({
      value: item.id,
      label: item.label,
      disabled: item.disabled,
    }));
    return mappedOptions;
  }, [combinedOptions]);

  const value = useMemo(
    () => selectedItems.map((item) => item.id),
    [selectedItems]
  );

  const required = useMemo(
    () =>
      typeof fieldConfig.validation?.required === 'object'
        ? fieldConfig.validation?.required?.value
        : fieldConfig.validation?.required,
    [fieldConfig.validation?.required]
  );

  // Add a ref to track initialization
  const hasInitialized = React.useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;

    const defaultValue = fieldConfig.defaultValue;
    if (!defaultValue) return;

    hasInitialized.current = true;

    // Kiểm tra nếu defaultValue đã có đủ thông tin (id và label)
    if (
      Array.isArray(defaultValue) &&
      defaultValue.every((item) => item.id && item.label)
    ) {
      setSelectedItems(defaultValue);
      setAllItems(defaultValue);
      if (overrideOnMismatchLabel) {
        field.onChange(defaultValue);
      }
      return;
    }

    // Nếu defaultValue không đủ thông tin, thực hiện search
    if (searchApi) {
      initializeData(
        searchApi,
        transformResponse,
        fieldConfig,
        loadInitialItems,
        overrideOnMismatchLabel,
        setIsLoading,
        setSearchResults,
        setAllItems,
        setSelectedItems,
        setError,
        setLabelMismatchWarning,
        field
      );
    }
  }, [
    searchApi,
    transformResponse,
    fieldConfig.defaultValue,
    loadInitialItems,
    overrideOnMismatchLabel,
  ]);

  return (
    <Container>
      <InputLabel label={label} htmlFor={id} required={required}></InputLabel>
      <SortableTagPicker
        {...props}
        value={value}
        debounceTime={debounceTime}
        onChange={handleOnChange}
        onOrderChange={handleOnChange}
        onSearch={handleSearch}
        options={options}
        placeholder={placeholder}
        disabled={disabled}
        loading={isLoading}
        error={errorState ? errorState : undefined}
        maxItems={maxItems}
        onFocus={handleDropdownOpen}
        showDraggableList={showDraggableList}
        disabledItemsPosition={disabledItemsPosition}
        draggableListDirection={draggableListDirection}
        hideSelectedOptions={hideSelectedOptions}
      />
    </Container>
  );
};

export default ComboBox;
