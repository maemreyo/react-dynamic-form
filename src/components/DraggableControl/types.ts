import { XYCoord } from 'react-dnd';

export interface DraggableItemProps<T> {
  item: T & { disabled?: boolean };
  index: number;
  onDragStart: (index: number) => void;
  onDragOver: (index: number) => void;
  onDrop: () => void;
  renderItem: (item: T, index: number) => React.ReactNode;
}
export interface DraggableListProps<T extends { id?: string }> {
  items: (T & { disabled?: boolean })[];
  sortBy?: keyof T;
  onUpdate: (updatedItems: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export interface DragLayerProps {
  currentOffset: XYCoord | null;
  item: any;
  isDragging: boolean;
}
