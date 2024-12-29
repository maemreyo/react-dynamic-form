// Filepath: /src/features/core/LayoutRegistry.ts

import React from 'react';
import { FlexLayout } from './components/FlexLayout';
import { GridLayout } from './components/GridLayout';
import { LayoutType } from '../../dynamic-form';

// Create a map of layout types to components
const layoutRegistry: Record<
  LayoutType,
  React.ComponentType<any> | undefined
> = {
  flex: FlexLayout,
  grid: GridLayout,
};

/**
 * Registers a new layout component for a given type.
 *
 * @param type - The layout type to register.
 * @param component - The component to register.
 */
export const registerLayout = (
  type: LayoutType,
  component: React.ComponentType<any>
) => {
  layoutRegistry[type] = component;
};

/**
 * Retrieves the component registered for a given layout type.
 *
 * @param type - The layout type to retrieve the component for.
 * @returns The registered component, or undefined if no component is registered for the type.
 */
export const getLayoutComponent = (
  type: LayoutType
): React.ComponentType<any> | undefined => {
  return layoutRegistry[type];
};
