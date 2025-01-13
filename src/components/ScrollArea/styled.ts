import styled from 'styled-components';
import { ScrollAreaProps } from './types';

// Custom ScrollArea Component
export const ScrollAreaContainer = styled.div<ScrollAreaProps>`
  position: relative;
  overflow: hidden;
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  width: ${({ width }) => (width ? `${width}px` : '100%')};
`;

export const ScrollAreaViewport = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
`;
