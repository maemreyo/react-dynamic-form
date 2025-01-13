import styled from 'styled-components';

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DraggableItemWrapper = styled.div<{
  isDisabled?: boolean;
  isDragging?: boolean;
  isOver?: boolean;
}>`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'move')};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
  transition: all 0.3s ease;

  ${({ isDragging }) =>
    isDragging &&
    `
    opacity: 0.5;
    background: rgba(0, 0, 0, 0.05);
  `}

  ${({ isOver }) =>
    isOver &&
    `
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: #0066cc;
    }
  `}
`;

export const DragHandle = styled.div`
  margin-right: 8px;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export const CustomDragLayerWrapper = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 1000;
  opacity: 0.9;
`;
