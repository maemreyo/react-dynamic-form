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
    noResultsMessage = 'No results found',
    loadingMessage = 'Loading...',
    disabled = false,
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
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10; // Adjust based on your needs

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

          // Check if we found any default items in this page
          const foundInThisPage = transformedItems.filter((item) =>
            defaultIds.includes(item.id)
          );

          foundInThisPage.forEach((item) => foundIds.add(item.id));
          allFoundItems = [...allFoundItems, ...transformedItems];

          // If no more results or we've found all default items, break
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

  // Initialize with default values
  useEffect(() => {
    const initializeDefaultValues = async () => {
      if (fieldConfig.defaultValue && Array.isArray(fieldConfig.defaultValue)) {
        const defaultIds = fieldConfig.defaultValue.map((item) => item.id);

        if (defaultIds.length > 0) {
          setIsLoading(true);
          try {
            const items = await loadAllPagesUntilDefaultsFound(defaultIds);
            setAllItems(items);

            // Set selected items based on found items, maintaining order of defaultValue
            const defaultItems = fieldConfig.defaultValue.map((defaultItem) => {
              const foundItem = items.find(
                (item) => item.id === defaultItem.id
              );
              return foundItem || defaultItem; // Fall back to default item if not found
            });

            setSelectedItems(defaultItems);
          } catch (error) {
            console.error('Error initializing default values:', error);
            setError('Failed to load default values');
          } finally {
            setIsLoading(false);
          }
        }
      }
    };

    initializeDefaultValues();
  }, [fieldConfig.defaultValue, loadAllPagesUntilDefaultsFound]);

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

        // Update allItems while preserving selected items that might not be in search results
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
      />
    </Container>
  );
};

export default ComboBox;
