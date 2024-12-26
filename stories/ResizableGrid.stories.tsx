import React, { useRef } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ResizableGrid } from '../src';
import { Layout } from 'react-grid-layout';
import { fn, userEvent, within } from '@storybook/test';
import { expect } from '@storybook/jest';

export default {
  title: 'ResizableGrid',
  component: ResizableGrid,
  // Add argTypes to control the behavior of the component
  argTypes: {
    isDraggable: { control: 'boolean' },
    isResizable: { control: 'boolean' },
    preventCollision: { control: 'boolean' },
    compactType: {
      control: { type: 'select', options: ['horizontal', 'vertical', null] },
    },
  },
} as Meta<typeof ResizableGrid>;

const initialLayouts = {
  lg: [
    { i: 'a', x: 0, y: 0, w: 2, h: 2 },
    { i: 'b', x: 2, y: 0, w: 1, h: 1 },
    { i: 'c', x: 3, y: 0, w: 1, h: 1 },
  ],
  md: [
    { i: 'a', x: 0, y: 0, w: 2, h: 2 },
    { i: 'b', x: 2, y: 0, w: 1, h: 1 },
    { i: 'c', x: 3, y: 0, w: 1, h: 1 },
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

const Template: StoryFn<typeof ResizableGrid> = args => (
  <ResizableGrid {...args}>
    <div key="a">Card A</div>
    <div key="b">Card B</div>
    <div key="c">Card C</div>
  </ResizableGrid>
);

export const Default = Template.bind({});
Default.args = {
  initialLayouts,
  onLayoutChange: fn(),
  isDraggable: true,
  isResizable: true,
  compactType: 'vertical',
};
