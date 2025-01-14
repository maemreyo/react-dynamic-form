import React, { forwardRef } from 'react';
import { InputLabelProps } from './types';
import {
  LabelWrapper,
  LabelText,
  RequiredIndicator,
  OptionalIndicator,
} from './styled';
import { Tooltip } from '../Tooltip';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';

const InputLabel = forwardRef<HTMLLabelElement, InputLabelProps>(
  (
    {
      htmlFor,
      label,
      required = false,
      optional = false,
      disabled = false,
      position = 'top',
      tooltip,
      tooltipPlacement = 'top',
      className,
      style,
      customStyles,
      ...rest
    },
    ref
  ) => {
    if (!htmlFor) {
      console.error('InputLabel: htmlFor prop is required.');
      return null; // Or render a placeholder, based on your error handling strategy
    }

    if (position !== 'top' && position !== 'left') {
      console.error(
        "InputLabel: position prop must be either 'top' or 'left'."
      );
      position = 'top'; // Fallback to default value
    }
    const hasTooltip = !!tooltip;
    return (
      <ThemeProvider theme={theme}>
        <LabelWrapper
          htmlFor={htmlFor}
          $position={position}
          disabled={disabled}
          className={className}
          style={style}
          $hasTooltip={hasTooltip}
          ref={ref}
          {...rest}
        >
          {tooltip ? (
            <Tooltip content={tooltip} placement={tooltipPlacement}>
              <LabelText $position={position} disabled={disabled}>
                {label}
                {required && !optional && (
                  <RequiredIndicator>*</RequiredIndicator>
                )}
                {optional && !required && (
                  <OptionalIndicator>(optional)</OptionalIndicator>
                )}
              </LabelText>
            </Tooltip>
          ) : (
            <LabelText $position={position} disabled={disabled}>
              {label}
              {required && !optional && (
                <RequiredIndicator>*</RequiredIndicator>
              )}
              {optional && !required && (
                <OptionalIndicator>(optional)</OptionalIndicator>
              )}
            </LabelText>
          )}

          {disabled && <input type="hidden" aria-disabled="true" />}
        </LabelWrapper>
      </ThemeProvider>
    );
  }
);

InputLabel.displayName = 'InputLabel';

export default InputLabel;
