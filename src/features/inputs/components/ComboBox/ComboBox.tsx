import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useFormContext, useController, FieldError } from 'react-hook-form';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import {
  SelectedItem,
  ItemLabel,
  RemoveButton,
  Container,
  SearchContainer,
  StyledInput,
  Dropdown,
  MessageText,
  ErrorText,
  DropdownItem,
  MaxItemsReached,
  ListContainer,
  InputLabel,
} from './styled';
import { CustomComboBoxProps, Item } from './types';
import { useSearch } from './hooks';
import DraggableList from '../../../../components/DraggableControl';
import { FieldConfig, FormClassNameConfig } from '../../../dynamic-form';

interface ComboBoxProps extends Omit<CustomComboBoxProps, 'onItemsChange'> {
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
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasInitialSearch, setHasInitialSearch] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { control } = useFormContext();
  const { field } = useController({
    name: id,
    control,
    rules: fieldConfig.validation,
  });

  const {
    searchTerm,
    setSearchTerm,
    isLoading,
    error,
    searchResults,
    debouncedSearch,
    handleSearch,
  } = useSearch(searchApi, transformResponse, debounceTime);

  // Handle initial search when focusing input
  const handleInputFocus = useCallback(() => {
    if (!disabled && !hasInitialSearch) {
      setShowDropdown(true);
      handleSearch('');
      setHasInitialSearch(true);
    } else if (!disabled) {
      setShowDropdown(true);
    }
  }, [disabled, hasInitialSearch, handleSearch]);

  // Reset initial search flag when searchApi changes
  useEffect(() => {
    setHasInitialSearch(false);
  }, [searchApi]);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(true);
    debouncedSearch(value);
  };

  // Handle item selection
  const handleSelectItem = (item: Item) => {
    if (maxItems && selectedItems.length >= maxItems) {
      return;
    }

    if (selectedItems.some((selected) => selected.id === item.id)) {
      return;
    }

    const newItems = [...selectedItems, item];
    setSelectedItems(newItems);
    setSearchTerm('');
    setShowDropdown(false);
    field.onChange(newItems); // Update form state
  };

  // Handle draggable list updates
  const handleListUpdate = (updatedItems: Item[]) => {
    setSelectedItems(updatedItems);
    field.onChange(updatedItems); // Update form state
  };

  // Handle item removal
  const handleRemoveItem = useCallback(
    (itemId: string) => {
      setSelectedItems((prev) => {
        const newItems = prev.filter((item) => item.id !== itemId);
        field.onChange(newItems); // Update form state
        return newItems;
      });
    },
    [field]
  );

  // Render item in draggable list
  const renderItem = useCallback(
    (item: Item) => (
      <SelectedItem key={item.id}>
        <ItemLabel>{item.label}</ItemLabel>
        <RemoveButton
          type="button"
          onClick={() => handleRemoveItem(item.id)}
          aria-label="Remove item"
        >
          ×
        </RemoveButton>
      </SelectedItem>
    ),
    [handleRemoveItem]
  );

  return (
    <Container>
      <SearchContainer>
        {label && (
          <InputLabel
            htmlFor={id}
            $validation={fieldConfig.validation}
            className={formClassNameConfig.label}
          >
            {label}
          </InputLabel>
        )}

        <StyledInput
          {...field}
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          disabled={disabled}
          aria-label="Search"
          aria-expanded={showDropdown}
          className={formClassNameConfig.input}
        />

        {showDropdown && (
          <Dropdown ref={dropdownRef} role="listbox">
            {isLoading && <MessageText>{loadingMessage}</MessageText>}
            {error && <ErrorText>{error}</ErrorText>}
            {!isLoading && !error && searchResults.length === 0 && (
              <MessageText>{noResultsMessage}</MessageText>
            )}
            {!isLoading &&
              !error &&
              searchResults.map((item) => (
                <DropdownItem
                  key={item.id}
                  $selected={selectedItems.some(
                    (selected) => selected.id === item.id
                  )}
                  onClick={() => handleSelectItem(item)}
                  role="option"
                  aria-selected={selectedItems.some(
                    (selected) => selected.id === item.id
                  )}
                >
                  {item.label}
                  {maxItems && selectedItems.length >= maxItems && (
                    <MaxItemsReached>Max items reached</MaxItemsReached>
                  )}
                </DropdownItem>
              ))}
          </Dropdown>
        )}
      </SearchContainer>

      <DndProvider backend={HTML5Backend}>
        <ListContainer>
          <DraggableList
            items={selectedItems}
            onUpdate={handleListUpdate}
            renderItem={renderItem}
          />
        </ListContainer>
      </DndProvider>
    </Container>
  );
};
export default ComboBox;
