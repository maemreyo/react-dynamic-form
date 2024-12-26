import styled from 'styled-components';

export const StyledResizableGrid = styled.div`
  /* Global styles cho ResizableGrid (nếu cần) */

  .react-grid-layout {
    position: relative;
    transition: height 200ms ease;
  }

  .react-grid-item {
    transition: all 200ms ease;
    transition-property: left, top;
  }

  .react-grid-item.cssTransforms {
    transition-property: transform;
  }

  .react-grid-item.resizing {
    z-index: 1;
    will-change: width, height;
  }

  .react-grid-item.react-draggable-dragging {
    transition: none;
    z-index: 3;
    will-change: transform;
  }

  .react-grid-item.react-grid-placeholder {
    background: red;
    opacity: 0.2;
    transition-duration: 100ms;
    z-index: 2;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
`;

export const StyledCard = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
`;

export const DragHandle = styled.div`
  width: 20px;
  height: 20px;
  background-color: gray;
  cursor: grab;
  position: absolute;
  top: 0;
  right: 0;
`;
