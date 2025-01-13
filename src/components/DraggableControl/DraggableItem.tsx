import React from 'react';
import { DraggableItemProps } from './types';
import { useDrag, useDrop } from 'react-dnd';
import { DraggableItemWrapper } from './styled';

const ItemType = {
  ITEM: 'ITEM',
} as const;

interface DragItem<T> {
  index: number;
  item: T;
}

const DraggableItem = <T,>({
  item,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  renderItem,
}: DraggableItemProps<T>) => {
  const isDisabled = (item as any).disabled;

  const [{ isDragging }, dragRef] = useDrag<
    DragItem<T>,
    unknown,
    { isDragging: boolean }
  >({
    type: ItemType.ITEM,
    item: { index, item },
    canDrag: !isDisabled,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, dropRef] = useDrop<
    DragItem<T>,
    unknown,
    { isOver: boolean }
  >({
    accept: ItemType.ITEM,
    canDrop: () => !isDisabled,
    hover: (draggedItem) => {
      if (draggedItem.index !== index && !isDisabled) {
        onDragOver(index);
      }
    },
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const combinedRef = (node: HTMLDivElement | null) => {
    dragRef(dropRef(node));
  };

  return (
    <DraggableItemWrapper
      ref={combinedRef}
      isDisabled={isDisabled}
      isDragging={isDragging}
      isOver={isOver}
      onDragStart={() => !isDisabled && onDragStart(index)}
    >
      {renderItem(item, index)}
    </DraggableItemWrapper>
  );
};

export default DraggableItem;
