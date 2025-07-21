import { CSSProperties, ReactNode } from 'react';
import { Placement } from '@popperjs/core';

export interface InputLabelProps {
  htmlFor: string;
  label: ReactNode;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  position?: 'top' | 'left';
  tooltip?: ReactNode;
  tooltipPlacement?: Placement;
  className?: string;
  style?: CSSProperties;
  ref?: React.Ref<HTMLLabelElement>;
}
