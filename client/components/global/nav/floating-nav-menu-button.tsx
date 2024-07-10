"use client";

import { FC, useState } from "react";

interface FloatingNavMenuButtonProps {
  onClick: () => void;
  isMenuOpen: boolean;
}

const FloatingNavMenuButton: FC<FloatingNavMenuButtonProps> = ({
  onClick,
  isMenuOpen,
}) => {
  const [isMouseDown, setMouseDown] = useState<boolean>(false);

  return (
    
      <div
        onClick={onClick}
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
        className={`drop-shadow-xl fixed top-4 right-4 z-30 h-12 w-12 round-full bg-accent2 rounded-full flex flex-col items-center justify-center gap-1.5 duration-100 transition-all group cursor-pointer ${
          isMouseDown ? "scale-95" : "scale-100"
        }`}
      >
        <div
          className={`h-1 w-6 bg-transparent rounded  ${
            isMenuOpen
              ? "absolute -rotate-45 transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              : ""
          }`}
        >
          <div
            className={`h-full w-full bg-primary-foreground rounded duration-300 transition-all ${
              !isMenuOpen ? "group-hover:w-7" : ""
            }`}
          />
        </div>
        <div
          className={`h-1 w-6 bg-transparent rounded ${
            isMenuOpen
              ? "absolute rotate-45 transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              : ""
          }`}
        >
          <div
            className={`h-full w-full bg-primary-foreground rounded duration-300 transition-all ${
              !isMenuOpen ? "group-hover:w-1/2" : ""
            }`}
          />
        </div>
      </div>
  );
};

export default FloatingNavMenuButton;
