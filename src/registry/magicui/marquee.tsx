"use client";

import { cn } from "../../lib/utils";
import React, { useEffect, useRef, useState } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  vertical?: boolean;
  className?: string;
}

export function Marquee({
  children,
  pauseOnHover,
  reverse,
  vertical,
  className,
}: MarqueeProps) {
  const [duration, setDuration] = useState(30);
  const [rowWidth, setRowWidth] = useState(0);
  const [rowHeight, setRowHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (marqueeRef.current && containerRef.current) {
      if (vertical) {
        setRowHeight(marqueeRef.current.scrollHeight);
        setContainerHeight(containerRef.current.scrollHeight);
      } else {
        setRowWidth(marqueeRef.current.scrollWidth);
        setContainerWidth(containerRef.current.scrollWidth);
      }
    }
  }, [children, vertical]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex w-full overflow-hidden [--duration:30s]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
      style={
        {
          "--duration": duration + "s",
        } as React.CSSProperties
      }
    >
      <div
        ref={marqueeRef}
        className={cn(
          "flex gap-4 p-4",
          vertical ? "flex-col" : "flex-row",
          pauseOnHover && "hover:[animation-play-state:paused]",
          reverse
            ? vertical
              ? "animate-marquee-vertical-reverse"
              : "animate-marquee-reverse"
            : vertical
            ? "animate-marquee-vertical"
            : "animate-marquee",
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex gap-4 p-4",
          vertical ? "flex-col" : "flex-row",
          pauseOnHover && "hover:[animation-play-state:paused]",
          reverse
            ? vertical
              ? "animate-marquee-vertical-reverse"
              : "animate-marquee-reverse"
            : vertical
            ? "animate-marquee-vertical"
            : "animate-marquee",
        )}
      >
        {children}
      </div>
    </div>
  );
} 