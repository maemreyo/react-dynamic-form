import {
  DEFAULT_BREAKPOINTS,
  DEFAULT_COLS,
  DEFAULT_ROW_HEIGHT,
} from '../components/ResizableGrid/ResizableGrid.constants';

export const getBreakpointFromWidth = (
  width: number,
  breakpoints = DEFAULT_BREAKPOINTS
) => {
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  if (width >= breakpoints.xs) return 'xs';
  return 'xxs';
};

export const getItemWidth = (
  gridWidth: number,
  col: number,
  margin: [number, number],
  cols: number
) => {
  return (
    ((gridWidth - margin[0] * (cols - 1)) / cols) * col + (col - 1) * margin[0]
  );
};

export const getItemHeight = (
  gridHeight: number,
  rows: number,
  margin: [number, number]
) => {
  return ((gridHeight - margin[1] * (rows - 1)) / rows) * rows;
};
