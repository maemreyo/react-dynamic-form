import React, { forwardRef } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import {
  StyledLabel,
  StyledIndicator,
  StyledLabelContainer,
  StyledRequired,
  StyledOptional,
} from './styled';
import { InputLabelProps } from './types';
import Tooltip from '../Tooltip';

const InputLabel = forwardRef<HTMLLabelElement, InputLabelProps>(
  (
    {
      htmlFor,
      label,
      required = false,
      optional = false,
      disabled = false,
      position = 'top',
      tooltip = null,
      tooltipPlacement = 'top',
      className,
      style,
    },
    ref
  ) => {
    if (!htmlFor) {
      console.error('InputLabel requires htmlFor prop');
    }

    const RequiredIndicator = <StyledRequired>*</StyledRequired>;

    const OptionalIndicator = <StyledOptional>(optional)</StyledOptional>;

    return (
      <ThemeProvider theme={theme}>
        <StyledLabelContainer
          className={className}
          style={style}
          $position={position}
        >
          <StyledLabel
            htmlFor={htmlFor}
            $disabled={disabled}
            $position={position}
            ref={ref}
            role={disabled ? undefined : 'label'}
            {...(disabled ? { 'aria-disabled': true } : {})}
          >
            {tooltip ? (
              <Tooltip title={tooltip} placement={tooltipPlacement}>
                <span>{label}</span>
              </Tooltip>
            ) : (
              label
            )}
            {required && RequiredIndicator}
            {optional && !required && OptionalIndicator}
          </StyledLabel>
        </StyledLabelContainer>
      </ThemeProvider>
    );
  }
);

InputLabel.displayName = 'InputLabel';

export default InputLabel;
