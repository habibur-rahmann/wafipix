"use client";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { FC, useEffect, useState } from "react";

interface SelectStarProps {
  defaultStar: number;
  onChange: (star: number) => void;
}

const SelectStar: FC<SelectStarProps> = ({ defaultStar, onChange }) => {
  const [mouseOnStar, setMouseOnStar] = useState<number>(3);
  const [selectedStar, setStar] = useState<number>(defaultStar);
  const [isMouseOver, setMouseOver] = useState<boolean>(false);

  const handleMouseOverEvent = (star: number) => {
    setMouseOnStar(star);
    setMouseOver(true);
  };
  const handleMouseLeaveEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseOver(false);
    setMouseOnStar(0);
  };

  const handleSelectStar = (star: number) => setStar(star);

  useEffect(() => {
    onChange(selectedStar);
  }, [selectedStar, onChange]);

  return (
    <div
      onMouseLeave={handleMouseLeaveEvent}
      className="flex h-full w-fit items-center gap-2"
    >
      {[1, 2, 3, 4, 5].map((star) => {
        if (!isMouseOver && star <= selectedStar)
          return (
            <Star
              onMouseOver={() => handleMouseOverEvent(star)}
              onClick={() => handleSelectStar(star)}
              fill="#ffa534"
              key={star}
              className={cn("h-5 w-5 text-[#ffa534] cursor-pointer")}
            />
          );
        if (star <= mouseOnStar)
          return (
            <Star
              onMouseOver={() => handleMouseOverEvent(star)}
              onClick={() => handleSelectStar(star)}
              fill="#ffa534"
              key={star}
              className={cn("h-5 w-5 text-[#ffa534] cursor-pointer")}
            />
          );
        return (
          <Star
            onMouseOver={() => handleMouseOverEvent(star)}
            onClick={() => handleSelectStar(star)}
            key={star}
            className={cn("h-5 w-5 text-[#ffa534] cursor-pointer")}
          />
        );
      })}
    </div>
  );
};

export default SelectStar;
