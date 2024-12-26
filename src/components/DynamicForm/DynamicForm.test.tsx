// TODO: Implement test cases
import React from 'react';
import { render, screen } from '@testing-library/react';
import DynamicForm from './index';

describe('DynamicForm', () => {
  it('renders without crashing', () => {
    const data = {
      name: '',
      email: '',
    };
    render(<DynamicForm data={data} />);
  });

  // Add more test cases here
});
