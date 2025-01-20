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
  console.log('fieldConfig.defaultValue', fieldConfig.defaultValue);
  // fieldConfig.defaultValue [
  //   {
  //     id: 'a',
  //     label: 'Apple',
  //   },
  //   {
  //     id: 'b',
  //     label: 'Banana',
  //   },
  // ];

  const [allItems, setAllItems] = useState<Item[]>([]);
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<Item[]>(
    field.value
      ? (field.value as string[]).map(
          (id) => allItems.find((item) => item.id === id) || { id, label: '' }
        )
      : []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setError] = useState<string | null>(null);

  const handleSearch = useCallback(
    async (query: string) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await searchApi({ query });
        const transformedItems = response.data.map(transformResponse);

        if (query === '') {
          setAllItems(transformedItems);
        }
        setSearchResults(transformedItems);
      } catch (err) {
        setError('Failed to fetch search results');
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [searchApi, transformResponse]
  );

  useEffect(() => {
    handleSearch('');
  }, [handleSearch]);

  const handleOnChange = (values: string[]) => {
    const updatedItems = values.map(
      (value) =>
        allItems.find((item) => item.id === value) || { id: value, label: '' }
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
      <InputLabel label={label} htmlFor="a"></InputLabel>
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
