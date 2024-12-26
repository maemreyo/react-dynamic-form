import React from 'react';
import { render } from '@testing-library/react';
import ResizableGrid from '../src/ResizableGrid';
import { Layout } from 'react-grid-layout';

const initialLayouts: { [key: string]: Layout[] } = {
  lg: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 1, y: 0, w: 1, h: 1 },
    { i: 'c', x: 2, y: 0, w: 1, h: 1 },
  ],
  md: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 1, y: 0, w: 1, h: 1 },
    { i: 'c', x: 2, y: 0, w: 1, h: 1 },
  ],
  sm: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 1, y: 0, w: 1, h: 1 },
    { i: 'c', x: 2, y: 0, w: 1, h: 1 },
  ],
  xs: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 1, y: 0, w: 1, h: 1 },
    { i: 'c', x: 0, y: 2, w: 2, h: 1 },
  ],
  xxs: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 1, y: 0, w: 1, h: 1 },
    { i: 'c', x: 0, y: 2, w: 2, h: 1 },
  ],
};

describe('ResizableGrid', () => {
  it('renders without crashing', () => {
    render(
      <ResizableGrid initialLayouts={initialLayouts}>
        <div>Card A</div>
        <div>Card B</div>
        <div>Card C</div>
      </ResizableGrid>
    );
  });
});
