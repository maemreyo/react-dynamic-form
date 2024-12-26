import { Layout, Layouts } from 'react-grid-layout';
import { RefObject } from 'react';

export interface ResizableGridProps {
  initialLayouts: Layouts;
  children: React.ReactNode;
  breakpoints?: { [key: string]: number };
  cols?: { [key: string]: number };
  margin?: [number, number];
  isDraggable?: boolean;
  isResizable?: boolean;
  preventCollision?: boolean;
  compactType?: 'horizontal' | 'vertical' | null;
  onLayoutChange?: (layouts: Layouts) => void;
  containerRef?: RefObject<HTMLDivElement>;
}
