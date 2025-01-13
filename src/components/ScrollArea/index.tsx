import React, { useRef, useEffect, useState } from 'react';
import { ScrollAreaContainer, ScrollAreaViewport } from './styled';

interface ScrollAreaProps {
  children: React.ReactNode;
  height?: number;
  width?: number;
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  className?: string;
}

const ScrollArea: React.FC<ScrollAreaProps> = ({
  children,
  height,
  width,
  onScroll,
  className,
}) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      if (viewportRef.current) {
        const { scrollHeight, clientHeight } = viewportRef.current;
        setIsScrollable(scrollHeight > clientHeight);
      }
    };

    checkScrollable();
    window.addEventListener('resize', checkScrollable);

    return () => {
      window.removeEventListener('resize', checkScrollable);
    };
  }, [children]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (onScroll) {
      onScroll(event);
    }
  };

  return (
    <ScrollAreaContainer height={height} width={width} className={className}>
      <ScrollAreaViewport
        ref={viewportRef}
        onScroll={handleScroll}
        data-scrollable={isScrollable}
      >
        {children}
      </ScrollAreaViewport>
    </ScrollAreaContainer>
  );
};

export default ScrollArea;
