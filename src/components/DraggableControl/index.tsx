import React from 'react';
import { DraggableListProps } from './types';
import { useDraggableList } from './hooks';
import DraggableItem from './DraggableItem';
import { ListContainer } from './styled';
import ScrollArea from '../ScrollArea';

const DraggableList = <T extends { id?: string }>({
  items,
  onUpdate,
  renderItem,
  sortBy,
}: DraggableListProps<T>) => {
  const {
    items: sortedItems,
    onDragStart,
    onDragOver,
    onDrop,
  } = useDraggableList(items, sortBy);

  const handleDrop = () => {
    onUpdate(sortedItems);
  };

  return (
    <ScrollArea>
      <ListContainer>
        {sortedItems.map((item, index) => (
          <DraggableItem
            key={item.id}
            item={item}
            index={index}
            renderItem={renderItem}
            onDragStart={() => onDragStart(index)}
            onDragOver={() => onDragOver(index)}
            onDrop={handleDrop}
          />
        ))}
      </ListContainer>
    </ScrollArea>
  );
};

export default DraggableList;
