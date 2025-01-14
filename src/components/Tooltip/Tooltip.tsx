import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  CSSProperties,
} from 'react';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';
import { createPortal } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import {
  StyledTooltipContainer,
  StyledTooltipOverlay,
  StyledTooltipArrow,
} from './styled';

interface TooltipProps {
  title: ReactNode;
  placement?: Placement;
  children: ReactNode;
  open?: boolean;
  trigger?: 'hover' | 'focus' | 'click' | 'contextMenu' | string[];
  delay?: number | { show: number; hide: number };
  disabled?: boolean;
  arrow?: boolean;
  offset?: number;
  className?: string;
  style?: CSSProperties;
  overlayClassName?: string;
  overlayStyle?: CSSProperties;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  placement = 'top',
  children,
  open: controlledOpen,
  trigger = 'hover',
  delay = { show: 100, hide: 100 },
  disabled = false,
  arrow = true,
  offset = 4,
  className,
  style,
  overlayClassName,
  overlayStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const referenceElementRef = useRef<HTMLDivElement>(null);
  const popperElementRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : isOpen;

  const { styles, attributes, update } = usePopper(
    referenceElementRef.current,
    popperElementRef.current,
    {
      placement,
      modifiers: [
        { name: 'offset', options: { offset: [0, offset] } },
        {
          name: 'arrow',
          options: { element: arrowRef.current },
        },
        {
          name: 'flip',
          enabled: true,
        },
        {
          name: 'preventOverflow',
          options: {
            boundary: 'viewport' as any,
          },
        },
      ],
    }
  );

  useEffect(() => {
    if (referenceElementRef.current && popperElementRef.current && update) {
      update();
    }
  }, [update]);

  const showTooltip = () => {
    if (!isControlled) {
      setIsOpen(true);
    }
  };

  const hideTooltip = () => {
    if (!isControlled) {
      setIsOpen(false);
    }
  };

  const getDelay = (type: 'show' | 'hide') => {
    return typeof delay === 'number' ? delay : delay[type];
  };

  const getTriggerEvents = (triggerType: string) => {
    switch (triggerType) {
      case 'hover':
        return {
          onMouseEnter: () => setTimeout(showTooltip, getDelay('show')),
          onMouseLeave: () => setTimeout(hideTooltip, getDelay('hide')),
        };
      case 'focus':
        return {
          onFocus: () => setTimeout(showTooltip, getDelay('show')),
          onBlur: () => setTimeout(hideTooltip, getDelay('hide')),
        };
      case 'click':
        return {
          onClick: () => (open ? hideTooltip() : showTooltip()),
        };
      case 'contextMenu':
        return {
          onContextMenu: (e: React.MouseEvent) => {
            e.preventDefault();
            const trigger = open ? hideTooltip : showTooltip;
            trigger();
          },
        };
      default:
        return {};
    }
  };

  const getAllTriggerEvents = () => {
    const triggerArray = Array.isArray(trigger) ? trigger : [trigger];
    return triggerArray.reduce(
      (acc, triggerType) => ({
        ...acc,
        ...getTriggerEvents(triggerType),
      }),
      {}
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <div
          ref={referenceElementRef}
          {...(disabled ? {} : getAllTriggerEvents())}
          className={className}
          style={style}
        >
          {children}
        </div>
        {createPortal(
          <StyledTooltipContainer
            ref={popperElementRef}
            style={{
              ...styles.popper,
              zIndex: 1000,
              visibility: open ? 'visible' : 'hidden',
            }}
            {...attributes.popper}
            data-testid="tooltip-container"
          >
            <StyledTooltipOverlay
              style={overlayStyle}
              className={overlayClassName}
              id="tooltip"
              role="tooltip"
            >
              {title}
              {arrow && (
                <StyledTooltipArrow ref={arrowRef} $placement={placement} />
              )}
            </StyledTooltipOverlay>
          </StyledTooltipContainer>,
          document.body
        )}
      </>
    </ThemeProvider>
  );
};

export default Tooltip;
