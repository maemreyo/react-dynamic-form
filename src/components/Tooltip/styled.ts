import styled from 'styled-components';
import { Placement } from '@popperjs/core';
import theme from '../../theme';

interface ArrowProps {
  $placement?: Placement;
}

const getArrowStyles = (placement: Placement) => {
  switch (placement) {
    case 'top':
      return {
        bottom: '-3px',
        left: '50%',
        transform: 'translateX(-50%)',
        borderLeft: '4px solid transparent',
        borderRight: '4px solid transparent',
        borderTop: `4px solid ${theme.colors.black}`,
      };
    case 'bottom':
      return {
        top: '-3px',
        left: '50%',
        transform: 'translateX(-50%)',
        borderLeft: '4px solid transparent',
        borderRight: '4px solid transparent',
        borderBottom: `4px solid ${theme.colors.black}`,
      };
    case 'left':
      return {
        right: '-3px',
        top: '50%',
        transform: 'translateY(-50%)',
        borderTop: '4px solid transparent',
        borderBottom: '4px solid transparent',
        borderLeft: `4px solid ${theme.colors.black}`,
      };
    case 'right':
      return {
        left: '-3px',
        top: '50%',
        transform: 'translateY(-50%)',
        borderTop: '4px solid transparent',
        borderBottom: '4px solid transparent',
        borderRight: `4px solid ${theme.colors.black}`,
      };
    default:
      return {};
  }
};

export const StyledTooltipContainer = styled.div`
  position: relative;
`;

export const StyledTooltipOverlay = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
  padding: ${(props) => props.theme.space.sm} ${(props) => props.theme.space.md};
  border-radius: ${(props) => props.theme.radius.sm};
  font-size: ${(props) => props.theme.fontSizes.small};
  z-index: 2000;
`;

export const StyledTooltipArrow = styled.div<ArrowProps>`
  position: absolute;
  width: 0;
  height: 0;
  ${(props) => props.$placement && getArrowStyles(props.$placement)}
`;
