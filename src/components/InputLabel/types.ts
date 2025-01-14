import { ReactNode, CSSProperties, Ref } from 'react';

export type InputLabelPosition = 'top' | 'left';
export type TooltipPlacement =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'right-start'
  | 'right-end'
  | 'left-start'
  | 'left-end';

export interface InputLabelProps {
  htmlFor: string; // Required
  label: ReactNode; // Required
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  position?: InputLabelPosition;
  tooltip?: ReactNode;
  tooltipPlacement?: TooltipPlacement;
  className?: string;
  style?: CSSProperties;
  ref?: Ref<HTMLLabelElement>;
  /**
   * @deprecated Use `style` instead.
   */
  customStyles?: CSSProperties; // Allow custom styling via customStyles prop
}
