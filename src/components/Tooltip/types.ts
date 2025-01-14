import { Placement } from '@popperjs/core';
import { CSSProperties, ReactNode } from 'react';

export interface TooltipProps {
  title: ReactNode;
  placement?: Placement;
  children: ReactNode;
  open?: boolean;
  trigger?: 'hover' | 'focus' | 'click' | 'contextMenu' | string[];
  delay?: number | { show: number; hide: number };
  disabled?: boolean;
  arrow?: boolean;
  offset?: number;
  className?: string;
  style?: CSSProperties;
  overlayClassName?: string;
  overlayStyle?: CSSProperties;
}
