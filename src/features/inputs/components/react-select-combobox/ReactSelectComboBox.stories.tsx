// src/features/inputs/components/react-select-combobox/ReactSelectComboBox.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { ReactSelectComboBox } from './index';
import { Item, SearchParams, SearchResponse } from './types';

// Mock data
const mockItems: Item[] = [
  { id: '1', label: 'Apple', disabled: false },
  { id: '2', label: 'Banana', disabled: false },
  { id: '3', label: 'Cherry', disabled: false },
  { id: '4', label: 'Date', disabled: true },
  { id: '5', label: 'Elderberry', disabled: false },
  { id: '6', label: 'Fig', disabled: false },
  { id: '7', label: 'Grape', disabled: false },
  { id: '8', label: 'Honeydew', disabled: false },
  { id: '9', label: 'Kiwi', disabled: false },
  { id: '10', label: 'Lemon', disabled: false },
];

// Mock search API
const mockSearchApi = async (
  params: SearchParams
): Promise<SearchResponse<any>> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const { query, pageIndex, pageSize } = params;

  // Filter items based on query
  const filteredItems = mockItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  // Paginate results
  const startIndex = (pageIndex - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  return {
    data: paginatedItems,
    total: filteredItems.length,
    hasMore: endIndex < filteredItems.length,
  };
};

// Wrapper component for Storybook
const StoryWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const methods = useForm({
    defaultValues: {
      fruits: [
        { id: '1', label: 'Apple', disabled: false },
        { id: '4', label: 'Date', disabled: true },
      ],
    },
  });

  return (
    <FormProvider {...methods}>
      <div style={{ padding: '20px', maxWidth: '600px' }}>
        {children}
        <div
          style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5' }}
        >
          <h4>Form Values:</h4>
          <pre>{JSON.stringify(methods.watch(), null, 2)}</pre>
        </div>
      </div>
    </FormProvider>
  );
};

const meta: Meta<typeof ReactSelectComboBox> = {
  title: 'Components/ReactSelectComboBox',
  component: ReactSelectComboBox,
  decorators: [
    (Story) => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ReactSelectComboBox>;

export const Default: Story = {
  args: {
    id: 'fruits',
    fieldConfig: {
      label: 'Select Fruits',
      inputProps: {
        searchApi: mockSearchApi,
        placeholder: 'Search and select fruits...',
        showDraggableList: true,
        draggableListDirection: 'vertical',
        loadInitialItems: true,
        hideSelectedOptions: false,
      },
      validation: {
        required: {
          value: true,
          message: 'Please select at least one fruit',
        },
      },
    },
  },
};

export const HorizontalSorting: Story = {
  args: {
    id: 'fruits',
    fieldConfig: {
      label: 'Select Fruits (Horizontal Sorting)',
      inputProps: {
        searchApi: mockSearchApi,
        placeholder: 'Search and select fruits...',
        showDraggableList: true,
        draggableListDirection: 'horizontal',
        loadInitialItems: true,
        hideSelectedOptions: true,
      },
    },
  },
};

export const NoSorting: Story = {
  args: {
    id: 'fruits',
    fieldConfig: {
      label: 'Select Fruits (No Sorting)',
      inputProps: {
        searchApi: mockSearchApi,
        placeholder: 'Search and select fruits...',
        showDraggableList: false,
        loadInitialItems: true,
        hideSelectedOptions: false,
      },
    },
  },
};

export const WithMaxItems: Story = {
  args: {
    id: 'fruits',
    fieldConfig: {
      label: 'Select Fruits (Max 3 items)',
      inputProps: {
        searchApi: mockSearchApi,
        placeholder: 'Search and select fruits...',
        showDraggableList: true,
        draggableListDirection: 'vertical',
        maxItems: 3,
        loadInitialItems: true,
        hideSelectedOptions: false,
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    id: 'fruits',
    fieldConfig: {
      label: 'Select Fruits (Disabled)',
      inputProps: {
        searchApi: mockSearchApi,
        placeholder: 'Search and select fruits...',
        showDraggableList: true,
        disabled: true,
        loadInitialItems: true,
      },
    },
  },
};
