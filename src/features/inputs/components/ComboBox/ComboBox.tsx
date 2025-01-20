import React, { useState, useCallback, useEffect } from 'react';
import { useFormContext, useController, FieldError } from 'react-hook-form';
import {
  InputLabel,
  SortableTagPicker,
  SortableTagPickerProps,
} from '@matthew.ngo/react-form-kit';
import { Container } from './styled';
import { CustomComboBoxProps, Item } from './types';
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

const defaultTransformResponse = (item: any): Item => ({
  id: item.id || item.value,
  label: item.label,
});

const ComboBox: React.FC<ComboBoxProps> = ({
  id,
  fieldConfig,
  formClassNameConfig = {},
  ...props
}) => {
  const { label } = fieldConfig;
  const {
    searchApi,
    transformResponse = defaultTransformResponse,
    debounceTime = 500,
    maxItems,
    placeholder = 'Search items...',
    // noResultsMessage = 'No results found',
    // loadingMessage = 'Loading...',
    disabled = false,
    showDraggableList,
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
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 20;

  // Function to load all pages until we find all default values
  const loadAllPagesUntilDefaultsFound = useCallback(
    async (defaultIds: string[]) => {
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

          const foundInThisPage = transformedItems.filter((item) =>
            defaultIds.includes(item.id)
          );

          foundInThisPage.forEach((item) => foundIds.add(item.id));
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
    },
    [searchApi, transformResponse]
  );

  // Load initial data when component mounts
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      try {
        // First, load initial items for dropdown
        const response = await searchApi({
          query: '',
          pageIndex: 1,
          pageSize: PAGE_SIZE,
        });
        const initialItems = response.data.map(transformResponse);
        setSearchResults(initialItems);
        setAllItems(initialItems);

        // Then, if we have default values, load them
        if (
          fieldConfig.defaultValue &&
          Array.isArray(fieldConfig.defaultValue)
        ) {
          const defaultIds = fieldConfig.defaultValue.map((item) => item.id);

          if (defaultIds.length > 0) {
            // Check if default items are in initial items
            const foundInInitial = fieldConfig.defaultValue.filter(
              (defaultItem) =>
                initialItems.some((item) => item.id === defaultItem.id)
            );

            // If not all default items were found in initial items, load more pages
            if (foundInInitial.length < defaultIds.length) {
              const items = await loadAllPagesUntilDefaultsFound(defaultIds);
              setAllItems((prevItems) => {
                const newItems = [...items];
                // Ensure we don't have duplicates
                prevItems.forEach((item) => {
                  if (!newItems.some((newItem) => newItem.id === item.id)) {
                    newItems.push(item);
                  }
                });
                return newItems;
              });
            }

            // Set selected items based on found items, maintaining order
            const defaultItems = fieldConfig.defaultValue.map((defaultItem) => {
              const foundItem =
                allItems.find((item) => item.id === defaultItem.id) ||
                initialItems.find((item) => item.id === defaultItem.id);
              return foundItem || defaultItem;
            });

            setSelectedItems(defaultItems);
          }
        }
      } catch (error) {
        console.error('Error initializing data:', error);
        setError('Failed to load initial data');
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [
    searchApi,
    transformResponse,
    fieldConfig.defaultValue,
    loadAllPagesUntilDefaultsFound,
  ]);

  const handleSearch = useCallback(
    async (query: string) => {
      try {
        setIsLoading(true);
        setError(null);
        setCurrentPage(1);

        const response = await searchApi({
          query,
          pageIndex: 1,
          pageSize: PAGE_SIZE,
        });

        const transformedItems = response.data.map(transformResponse);
        setSearchResults(transformedItems);

        // @ts-ignore
        setAllItems((prevItems) => {
          const newItems = [...transformedItems];
          selectedItems.forEach((selectedItem) => {
            if (!newItems.some((item) => item.id === selectedItem.id)) {
              newItems.push(selectedItem);
            }
          });
          return newItems;
        });
      } catch (err) {
        setError('Failed to fetch search results');
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [searchApi, transformResponse, selectedItems]
  );

  const handleOnChange = (values: string[]) => {
    const updatedItems = values.map(
      (value) =>
        allItems.find((item) => item.id === value) ||
        selectedItems.find((item) => item.id === value) || {
          id: value,
          label: '',
        }
    );
    setSelectedItems(updatedItems);
    field.onChange(updatedItems);
  };

  // When dropdown is opened without a search query
  const handleDropdownOpen = useCallback(async () => {
    if (searchResults.length === 0 && !isLoading) {
      await handleSearch('');
    }
  }, [searchResults.length, isLoading, handleSearch]);

  const combinedOptions = [
    ...searchResults,
    ...selectedItems.filter(
      (item) => !searchResults.some((sr) => sr.id === item.id)
    ),
  ];

  const options = combinedOptions.map((item) => ({
    value: item.id,
    label: item.label,
  }));

  const value = selectedItems.map((item) => item.id);

  return (
    <Container>
      <InputLabel label={label} htmlFor={id}></InputLabel>
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
      />
    </Container>
  );
};

export default ComboBox;
