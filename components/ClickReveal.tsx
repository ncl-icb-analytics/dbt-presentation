"use client";

import { useSlideContext } from "./SlideNavigation";

interface ClickRevealProps {
  children: React.ReactNode;
  step: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ClickReveal({
  children,
  step,
  className = "",
  style,
}: ClickRevealProps) {
  const { currentStep } = useSlideContext();
  const isVisible = currentStep >= step;

  return (
    <div
      className={`reveal-item ${isVisible ? "visible" : ""} ${className}`}
      aria-hidden={!isVisible}
      style={style}
    >
      {children}
    </div>
  );
}
