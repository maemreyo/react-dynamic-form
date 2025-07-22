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

// Advanced Async Search Test Cases
export const SlowAsyncSearch: Story = {
  args: {
    id: 'fruits',
    fieldConfig: {
      label: 'Slow Async Search (2s delay)',
      inputProps: {
        searchApi: async (params: SearchParams): Promise<SearchResponse<any>> => {
          // Simulate slow API
          await new Promise(resolve => setTimeout(resolve, 2000));
          return mockSearchApi(params);
        },
        placeholder: 'Type to search (slow API)...',
        showDraggableList: true,
        draggableListDirection: 'vertical',
        debounceTime: 800, // Longer debounce for slow API
        loadInitialItems: false, // Don't load initially for slow API
      },
    },
  },
};

export const ErrorHandling: Story = {
  args: {
    id: 'fruits',
    fieldConfig: {
      label: 'API Error Handling',
      inputProps: {
        searchApi: async (params: SearchParams): Promise<SearchResponse<any>> => {
          // Simulate API error after delay
          await new Promise(resolve => setTimeout(resolve, 500));
          throw new Error('API Server Error');
        },
        placeholder: 'Search will fail...',
        showDraggableList: true,
        loadInitialItems: false,
      },
    },
  },
};

export const EmptyResults: Story = {
  args: {
    id: 'fruits',
    fieldConfig: {
      label: 'Empty Search Results',
      inputProps: {
        searchApi: async (params: SearchParams): Promise<SearchResponse<any>> => {
          await new Promise(resolve => setTimeout(resolve, 300));
          return {
            data: [], // Always return empty
            total: 0,
            hasMore: false,
          };
        },
        placeholder: 'Search returns no results...',
        showDraggableList: true,
        loadInitialItems: false,
      },
    },
  },
};

export const LargeDataset: Story = {
  args: {
    id: 'fruits',
    fieldConfig: {
      label: 'Large Dataset (100+ items)',
      inputProps: {
        searchApi: async (params: SearchParams): Promise<SearchResponse<any>> => {
          await new Promise(resolve => setTimeout(resolve, 200));
          
          // Generate large dataset
          const largeDataset = Array.from({ length: 100 }, (_, i) => ({
            id: `item-${i + 1}`,
            label: `Item ${i + 1} - ${['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'][i % 5]}`,
            disabled: i % 10 === 0, // Every 10th item is disabled
          }));
          
          const { query, pageIndex, pageSize } = params;
          const filteredItems = largeDataset.filter(item =>
            item.label.toLowerCase().includes(query.toLowerCase())
          );
          
          const startIndex = (pageIndex - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          const paginatedItems = filteredItems.slice(startIndex, endIndex);
          
          return {
            data: paginatedItems,
            total: filteredItems.length,
            hasMore: endIndex < filteredItems.length,
          };
        },
        placeholder: 'Search in 100+ items...',
        showDraggableList: true,
        draggableListDirection: 'vertical',
        debounceTime: 300,
        loadInitialItems: true,
        hideSelectedOptions: true,
      },
    },
  },
};

export const CustomTransform: Story = {
  args: {
    id: 'fruits',
    fieldConfig: {
      label: 'Custom Transform Response',
      inputProps: {
        searchApi: async (params: SearchParams): Promise<SearchResponse<any>> => {
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // Return different data structure
          const customData = [
            { value: 'apple-1', name: 'Red Apple', category: 'fruit', active: true },
            { value: 'apple-2', name: 'Green Apple', category: 'fruit', active: false },
            { value: 'banana-1', name: 'Yellow Banana', category: 'fruit', active: true },
            { value: 'cherry-1', name: 'Sweet Cherry', category: 'fruit', active: true },
            { value: 'date-1', name: 'Dried Date', category: 'fruit', active: false },
          ];
          
          const { query } = params;
          const filteredItems = customData.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase())
          );
          
          return {
            data: filteredItems,
            total: filteredItems.length,
            hasMore: false,
          };
        },
        transformResponse: (item: any): Item => ({
          id: item.value,
          label: `${item.name} (${item.category})`,
          disabled: !item.active,
        }),
        placeholder: 'Search custom data structure...',
        showDraggableList: true,
        loadInitialItems: true,
      },
    },
  },
};

export const ValidationRequired: Story = {
  args: {
    id: 'fruits',
    fieldConfig: {
      label: 'Required Field Validation',
      inputProps: {
        searchApi: mockSearchApi,
        placeholder: 'This field is required...',
        showDraggableList: true,
        loadInitialItems: true,
      },
      validation: {
        required: {
          value: true,
          message: 'Please select at least one fruit',
        },
        validate: {
          minItems: (value: Item[]) => 
            value && value.length >= 2 || 'Please select at least 2 items',
          maxItems: (value: Item[]) => 
            value && value.length <= 5 || 'Please select no more than 5 items',
        },
      },
    },
  },
};

// Wrapper for validation story with form submission
const ValidationWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: {
      fruits: [],
    },
  });

  const onSubmit = (data: any) => {
    alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div style={{ padding: '20px', maxWidth: '600px' }}>
          {children}
          <div style={{ marginTop: '20px' }}>
            <button 
              type="submit" 
              style={{ 
                padding: '8px 16px', 
                background: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Submit Form
            </button>
          </div>
          <div style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5' }}>
            <h4>Form Values:</h4>
            <pre>{JSON.stringify(methods.watch(), null, 2)}</pre>
            <h4>Form Errors:</h4>
            <pre>{JSON.stringify(methods.formState.errors, null, 2)}</pre>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export const WithFormValidation: Story = {
  decorators: [
    (Story) => (
      <ValidationWrapper>
        <Story />
      </ValidationWrapper>
    ),
  ],
  args: {
    id: 'fruits',
    fieldConfig: {
      label: 'Form Validation Test',
      inputProps: {
        searchApi: mockSearchApi,
        placeholder: 'Select items and try to submit...',
        showDraggableList: true,
        loadInitialItems: true,
      },
      validation: {
        required: {
          value: true,
          message: 'Please select at least one fruit',
        },
        validate: {
          minItems: (value: Item[]) => 
            value && value.length >= 2 || 'Please select at least 2 items',
        },
      },
    },
  },
};

export const WithCustomWidth: Story = {
  args: {
    id: 'fruits',
    fieldConfig: {
      label: 'Custom Width (100%)',
      inputProps: {
        searchApi: mockSearchApi,
        placeholder: 'This combobox has 100% width...',
        showDraggableList: true,
        loadInitialItems: true,
        controlWidth: '100%',
      },
    },
  },
};

export const FixedWidth: Story = {
  args: {
    id: 'fruits',
    fieldConfig: {
      label: 'Fixed Width (400px)',
      inputProps: {
        searchApi: mockSearchApi,
        placeholder: 'This combobox has a fixed width of 400px...',
        showDraggableList: true,
        loadInitialItems: true,
        controlWidth: '400px',
      },
    },
  },
};

export const RealWorldExample: Story = {
  args: {
    id: 'fruits',
    fieldConfig: {
      label: 'Real World Example',
      inputProps: {
        searchApi: async (params: SearchParams): Promise<SearchResponse<any>> => {
          // Simulate real API behavior
          await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 200));
          
          // Sometimes fail (10% chance)
          if (Math.random() < 0.1) {
            throw new Error('Network timeout');
          }
          
          const { query, pageIndex, pageSize } = params;
          
          // More realistic data
          const realData = [
            { id: 'user-1', label: 'John Doe (john@example.com)', disabled: false },
            { id: 'user-2', label: 'Jane Smith (jane@example.com)', disabled: false },
            { id: 'user-3', label: 'Bob Johnson (bob@example.com)', disabled: true },
            { id: 'user-4', label: 'Alice Brown (alice@example.com)', disabled: false },
            { id: 'user-5', label: 'Charlie Wilson (charlie@example.com)', disabled: false },
            { id: 'user-6', label: 'Diana Davis (diana@example.com)', disabled: false },
            { id: 'user-7', label: 'Eve Miller (eve@example.com)', disabled: true },
            { id: 'user-8', label: 'Frank Garcia (frank@example.com)', disabled: false },
          ];
          
          const filteredItems = realData.filter(item =>
            item.label.toLowerCase().includes(query.toLowerCase())
          );
          
          const startIndex = (pageIndex - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          const paginatedItems = filteredItems.slice(startIndex, endIndex);
          
          return {
            data: paginatedItems,
            total: filteredItems.length,
            hasMore: endIndex < filteredItems.length,
          };
        },
        placeholder: 'Search users by name or email...',
        showDraggableList: true,
        draggableListDirection: 'vertical',
        debounceTime: 400,
        maxItems: 5,
        loadInitialItems: true,
        hideSelectedOptions: true,
        disabledItemsPosition: 'bottom',
      },
      validation: {
        required: {
          value: true,
          message: 'Please select at least one user',
        },
      },
      defaultValue: [
        { id: 'user-1', label: 'John Doe (john@example.com)', disabled: false },
      ],
    },
  },
};
