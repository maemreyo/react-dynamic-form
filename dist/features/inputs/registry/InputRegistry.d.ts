import React from 'react';
import { InputType } from '../../dynamic-form/types';
/**
 * Registers a new input component for a given type.
 *
 * @param type - The input type to register.
 * @param component - The component to register.
 */
export declare const registerInput: (type: InputType, component: React.ComponentType<any>) => void;
/**
 * Retrieves the component registered for a given input type.
 *
 * @param type - The input type to retrieve the component for.
 * @returns The registered component, or undefined if no component is registered for the type.
 */
export declare const getInputComponent: (type: InputType) => React.ComponentType<any> | undefined;
