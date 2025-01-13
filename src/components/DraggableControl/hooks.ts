import { useState, useEffect, useRef } from 'react';

export const useDraggableList = <T extends { disabled?: boolean }>(
  initialItems: T[],
  sortBy?: keyof T
) => {
  const [items, setItems] = useState<T[]>(initialItems);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const isSortedInitially = useRef(false);

  useEffect(() => {
    if (!isSortedInitially.current && sortBy) {
      let sortedItems = [...initialItems];

      sortedItems = sortedItems.sort((a, b) => {
        const fieldA = a[sortBy];
        const fieldB = b[sortBy];

        if (fieldA < fieldB) return -1;
        if (fieldA > fieldB) return 1;
        return 0;
      });

      setItems(sortedItems);
      isSortedInitially.current = true;
    } else {
      setItems(initialItems);
    }
  }, [initialItems, sortBy]);

  const onDragStart = (index: number) => {
    if (items[index].disabled) return;
    setDraggingIndex(index);
  };

  const onDragOver = (index: number) => {
    if (
      draggingIndex === null ||
      draggingIndex === index ||
      items[index].disabled
    )
      return;

    const updatedItems = [...items];
    const [draggedItem] = updatedItems.splice(draggingIndex, 1);
    updatedItems.splice(index, 0, draggedItem);
    setDraggingIndex(index);
    setItems(updatedItems);
  };

  const onDrop = () => {
    setDraggingIndex(null);
  };

  return {
    items,
    setItems,
    onDragStart,
    onDragOver,
    onDrop,
  };
};
