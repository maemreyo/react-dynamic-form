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
  margin-bottom: ${({ theme }) => theme.space.sm};
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'move')};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
  transition: all 0.3s ease;

  ${({ isDragging, theme }) =>
    isDragging &&
    `
    opacity: 0.5;
    background: ${theme.colors['light-300']};
  `}

  ${({ isOver, theme }) =>
    isOver &&
    `
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: -${theme.space.xs};
      left: 0;
      right: 0;
      height: ${theme.space.xs};
      background: ${theme.colors.info};
    }
  `}
`;

export const DragHandle = styled.div`
  margin-right: ${({ theme }) => theme.space.xl};
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
