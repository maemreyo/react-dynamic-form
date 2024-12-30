import React from 'react';
import { LayoutType } from '../../dynamic-form';
/**
 * Registers a new layout component for a given type.
 *
 * @param type - The layout type to register.
 * @param component - The component to register.
 */
export declare const registerLayout: (type: LayoutType, component: React.ComponentType<any>) => void;
/**
 * Retrieves the component registered for a given layout type.
 *
 * @param type - The layout type to retrieve the component for.
 * @returns The registered component, or undefined if no component is registered for the type.
 */
export declare const getLayoutComponent: (type: LayoutType) => React.ComponentType<any> | undefined;
