// src/features/inputs/components/react-select-combobox/ReactSelectComboBox.tsx
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { InputLabel } from '@matthew.ngo/react-form-kit';
import styled from 'styled-components';

import { ReactSelectComboBoxProps, Item, SearchParams } from './types';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SortableList = styled.div<{ $direction: 'horizontal' | 'vertical' }>`
  display: flex;
  flex-direction: ${(props) =>
    props.$direction === 'horizontal' ? 'row' : 'column'};
  gap: 8px;
  flex-wrap: ${(props) =>
    props.$direction === 'horizontal' ? 'wrap' : 'nowrap'};
  margin-top: 8px;
`;

const SortableItem = styled.div<{ $isDragging: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: ${(props) => (props.$disabled ? '#f5f5f5' : '#e3f2fd')};
  border: 1px solid ${(props) => (props.$disabled ? '#ddd' : '#2196f3')};
  border-radius: 4px;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'grab')};
  opacity: ${(props) => (props.$isDragging ? 0.5 : 1)};
  transform: ${(props) => (props.$isDragging ? 'rotate(5deg)' : 'none')};
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.$disabled ? '#f5f5f5' : '#bbdefb')};
  }
`;

const RemoveButton = styled.button`
  background: #f44336;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background: #d32f2f;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  font-size: 12px;
  margin-top: 4px;
`;

// Sortable Item Component
const SortableItemComponent: React.FC<{
  item: Item;
  onRemove: (id: string) => void;
  disabled?: boolean;
}> = ({ item, onRemove, disabled }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, disabled: disabled || item.disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <SortableItem
      ref={setNodeRef}
      style={style}
      $isDragging={isDragging}
      $disabled={item.disabled}
      {...attributes}
      {...listeners}
    >
      <span>{item.label}</span>
      {!item.disabled && (
        <RemoveButton
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item.id);
          }}
          disabled={disabled}
          type="button"
        >
          ×
        </RemoveButton>
      )}
    </SortableItem>
  );
};

// Default transform function
const defaultTransformResponse = (item: any): Item => ({
  id: item.id || item.value,
  label: item.label,
  disabled: item.disabled,
});

// Main Component
const ReactSelectComboBox: React.FC<ReactSelectComboBoxProps> = ({
  id,
  fieldConfig,
  formClassNameConfig = {},
  error,
  ...props
}) => {
  const { label } = fieldConfig;
  const {
    searchApi,
    transformResponse = defaultTransformResponse,
    onItemsChange,
    debounceTime = 500,
    maxItems,
    placeholder = 'Search and select items...',
    disabled = false,
    showDraggableList = true,
    overrideOnMismatchLabel = true,
    disabledItemsPosition = 'top',
    draggableListDirection = 'vertical',
    loadInitialItems = false,
    hideSelectedOptions = false,
  } = fieldConfig.inputProps || {};

  const { control } = useFormContext();
  const { field } = useController({
    name: id,
    control,
    rules: fieldConfig.validation,
    defaultValue: fieldConfig.defaultValue || [],
  });

  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);

  // Initialize selected items from field value
  useEffect(() => {
    if (field.value && Array.isArray(field.value)) {
      setSelectedItems(field.value);
    }
  }, [field.value]);

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load options function for React-Select
  const loadOptions = useCallback(
    async (inputValue: string) => {
      if (!searchApi) return [];

      setIsLoading(true);
      setErrorState(null);

      try {
        const response = await searchApi({
          query: inputValue,
          pageIndex: 1,
          pageSize: 20,
        });

        if (!response || !Array.isArray(response.data)) {
          console.error('Invalid API response structure:', response);
          setErrorState('Invalid response format from server');
          return [];
        }

        const transformedItems = response.data
          .map(transformResponse)
          .filter((item) => item && item.id && item.label);

        return transformedItems.map((item) => ({
          value: item.id,
          label: item.label,
          isDisabled: item.disabled,
          __item: item, // Store original item for later use
        }));
      } catch (err) {
        console.error('Failed to fetch search results:', err);
        setErrorState('Failed to fetch search results');
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [searchApi, transformResponse]
  );

  // Handle selection change
  const handleSelectionChange = useCallback(
    (selectedOptions: any) => {
      if (!selectedOptions) {
        setSelectedItems([]);
        field.onChange([]);
        onItemsChange?.([]);
        return;
      }

      const newItems = selectedOptions.map(
        (option: any) =>
          option.__item || {
            id: option.value,
            label: option.label,
            disabled: option.isDisabled,
          }
      );

      setSelectedItems(newItems);
      field.onChange(newItems);
      onItemsChange?.(newItems);
    },
    [field, onItemsChange]
  );

  // Handle item removal
  const handleRemoveItem = useCallback(
    (itemId: string) => {
      const newItems = selectedItems.filter((item) => item.id !== itemId);
      setSelectedItems(newItems);
      field.onChange(newItems);
      onItemsChange?.(newItems);
    },
    [selectedItems, field, onItemsChange]
  );

  // Handle drag end
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const oldIndex = selectedItems.findIndex(
          (item) => item.id === active.id
        );
        const newIndex = selectedItems.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(selectedItems, oldIndex, newIndex);
        setSelectedItems(newItems);
        field.onChange(newItems);
        onItemsChange?.(newItems);
      }
    },
    [selectedItems, field, onItemsChange]
  );

  // Sort selected items based on disabled position
  const sortedSelectedItems = useMemo(() => {
    if (disabledItemsPosition === 'none') return selectedItems;

    const disabledItems = selectedItems.filter((item) => item.disabled);
    const enabledItems = selectedItems.filter((item) => !item.disabled);

    return disabledItemsPosition === 'top'
      ? [...disabledItems, ...enabledItems]
      : [...enabledItems, ...disabledItems];
  }, [selectedItems, disabledItemsPosition]);

  // React-Select value
  const selectValue = useMemo(
    () =>
      selectedItems.map((item) => ({
        value: item.id,
        label: item.label,
        isDisabled: item.disabled,
        __item: item,
      })),
    [selectedItems]
  );

  // Required validation
  const required = useMemo(
    () =>
      typeof fieldConfig.validation?.required === 'object'
        ? fieldConfig.validation?.required?.value
        : fieldConfig.validation?.required,
    [fieldConfig.validation?.required]
  );

  return (
    <Container>
      <InputLabel label={label} htmlFor={id} required={required} />

      <AsyncSelect
        instanceId={id}
        inputId={id}
        isMulti
        value={selectValue}
        loadOptions={loadOptions}
        defaultOptions={loadInitialItems}
        onChange={handleSelectionChange}
        placeholder={placeholder}
        isDisabled={disabled}
        isLoading={isLoading}
        hideSelectedOptions={hideSelectedOptions}
        closeMenuOnSelect={false}
        blurInputOnSelect={false}
        maxMenuHeight={200}
        styles={{
          control: (base, state) => ({
            ...base,
            borderColor:
              error || errorState
                ? '#f44336'
                : state.isFocused
                  ? '#2196f3'
                  : '#ddd',
            '&:hover': {
              borderColor: error || errorState ? '#f44336' : '#2196f3',
            },
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: '#e3f2fd',
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: '#1976d2',
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: '#1976d2',
            '&:hover': {
              backgroundColor: '#f44336',
              color: 'white',
            },
          }),
        }}
      />

      {showDraggableList && selectedItems.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortedSelectedItems.map((item) => item.id)}
            strategy={
              draggableListDirection === 'horizontal'
                ? horizontalListSortingStrategy
                : verticalListSortingStrategy
            }
          >
            <SortableList $direction={draggableListDirection}>
              {sortedSelectedItems.map((item) => (
                <SortableItemComponent
                  key={item.id}
                  item={item}
                  onRemove={handleRemoveItem}
                  disabled={disabled}
                />
              ))}
            </SortableList>
          </SortableContext>
        </DndContext>
      )}

      {(error || errorState) && (
        <ErrorMessage>{error?.message || errorState}</ErrorMessage>
      )}
    </Container>
  );
};

export default ReactSelectComboBox;
