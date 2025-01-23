import React, { useState, useEffect } from 'react';
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
    overrideOnMismatchLabel = true,
    disabledItemsPosition = 'top',
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

  useEffect(() => {
    const initializeData = async () => {
      if (!searchApi) return;

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
          Array.isArray(fieldConfig.defaultValue) &&
          fieldConfig.defaultValue.length > 0
        ) {
          const defaultIds = fieldConfig.defaultValue.map((item) => item.id);

          // Check if default items are in initial items
          const foundInInitial = initialItems.filter((item) =>
            defaultIds.includes(item.id)
          );

          // If not all default items were found in initial items, load more pages
          let allFoundItems = foundInInitial;
          if (foundInInitial.length < defaultIds.length) {
            const items = await loadAllPagesUntilDefaultsFound(
              defaultIds,
              searchApi,
              transformResponse
            );
            allFoundItems = items;
            setAllItems((prevItems) => {
              const newItems = [...items];
              prevItems.forEach((item) => {
                if (!newItems.some((newItem) => newItem.id === item.id)) {
                  newItems.push(item);
                }
              });
              return newItems;
            });
          }

          // Check label mismatch
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

          // Set selected items based on found items, maintaining order and using correct labels
          const defaultItems = fieldConfig.defaultValue.map((defaultItem) => {
            const foundItem = allFoundItems.find(
              (item) => item.id === defaultItem.id
            );
            return foundItem || defaultItem;
          });

          setSelectedItems(defaultItems);

          if (overrideOnMismatchLabel) {
            // Update form value with correct labels
            field.onChange(defaultItems);
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
  }, [searchApi, transformResponse]);

  const handleSearch = async (query: string) => {
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
  };

  const handleOnChange = (values: string[]) => {
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
  };

  // When dropdown is opened without a search query
  const handleDropdownOpen = async () => {
    if (searchResults.length === 0 && !isLoading) {
      await handleSearch('');
    }
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
    disabled: item.disabled,
  }));

  const value = selectedItems.map((item) => item.id);

  const required =
    typeof fieldConfig.validation?.required === 'object'
      ? fieldConfig.validation?.required?.value
      : fieldConfig.validation?.required;

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
      />
    </Container>
  );
};

export default ComboBox;
