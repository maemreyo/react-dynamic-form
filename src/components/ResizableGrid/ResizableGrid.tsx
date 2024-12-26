import React, { useState, useCallback } from 'react';
import { Responsive, Layouts, Layout } from 'react-grid-layout';
import {
  DEFAULT_BREAKPOINTS,
  DEFAULT_COLS,
  DEFAULT_MARGIN,
  DEFAULT_ROW_HEIGHT,
} from './ResizableGrid.constants';
import { ResizableGridProps } from './ResizableGrid.types';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResizableGrid: React.FC<ResizableGridProps> = ({
  initialLayouts,
  children,
  breakpoints = DEFAULT_BREAKPOINTS,
  cols = DEFAULT_COLS,
  margin = DEFAULT_MARGIN,
  isDraggable = true,
  isResizable = true,
  preventCollision = false,
  compactType = 'vertical',
  onLayoutChange,
  containerRef,
}) => {
  const [layouts, setLayouts] = useState<Layouts>(initialLayouts);

  const handleLayoutChange = useCallback(
    (currentLayout: Layout[], allLayouts: Layouts) => {
      setLayouts(allLayouts);
      onLayoutChange && onLayoutChange(allLayouts);
    },
    [onLayoutChange]
  );

  return (
    <div ref={containerRef}>
      <Responsive
        className="layout"
        layouts={layouts}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={DEFAULT_ROW_HEIGHT}
        margin={margin}
        isDraggable={isDraggable}
        isResizable={isResizable}
        preventCollision={preventCollision}
        compactType={compactType}
        onLayoutChange={handleLayoutChange}
      >
        {children}
      </Responsive>
    </div>
  );
};

export default ResizableGrid;
