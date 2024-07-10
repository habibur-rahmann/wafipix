"use client";
import React, { useEffect, useState } from "react";
import { usePrevNextButtons } from "./carousel-button";
import CursoArrow from "@/components/global/cursor-arrow";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import HeroCarouselContentContainer from "./hero-carousel-content-container";
import { useHeroBannersToView } from "../hooks/react-query/hero-banners/queries";

type MousePosition = {
  clickableTo: "left" | "right" | null;
  x: number;
  y: number;
};

type PropType = {};
const HeroCarousel: React.FC<PropType> = () => {
  const { data, isLoading, isError } = useHeroBannersToView();

  const [mousePosition, setMousePosition] = useState<MousePosition>({
    clickableTo: null,
    x: 600,
    y: 600,
  });

  const cursorSize = 44;
  const [isHover, setHover] = useState<boolean>(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    if (isHover) {
      window.addEventListener("mousemove", (e) => {
        const windowHalf = window.innerWidth / 2;
        if (e.clientX > windowHalf) {
          setMousePosition({
            clickableTo: "right",
            x: e.clientX,
            y: e.clientY,
          });
        } else {
          setMousePosition({
            clickableTo: "left",
            x: e.clientX,
            y: e.clientY,
          });
        }
      });
    }
    return () => {
      window.removeEventListener("mousemove", () => {});
    };
  }, [isHover]);

  const handleChange = () => {
    if (mousePosition.clickableTo === "left") {
      onPrevButtonClick();
    } else if (mousePosition.clickableTo === "right") {
      onNextButtonClick();
    }
  };

  const cursorTransform =
    mousePosition.clickableTo === "right"
      ? {
          transform: `translate(${mousePosition.x - cursorSize * 2.2}px, ${
            mousePosition.y - cursorSize / 1.2
          }px)`,
        }
      : {
          transform: `translate(${mousePosition.x}px, ${
            mousePosition.y - cursorSize / 1.2
          }px)`,
        };
  if (isLoading)
    return (
      <div className="min-h-[70vh] bg-secondary animate-pulse duration-1000" />
    );
  return (
    <div className="embla h-screen md:h-fit w-full">
      <div className=" embla__viewport w-full h-[100%]" ref={emblaRef}>
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={handleChange}
          className="embla__container cursor-none md:aspect-video md:max-h-[66vh] md:min-h-[50vh] w-full h-[90%] md:h-auto"
        >
          {data?.banners?.map((slide, index) => (
            <div
              className="embla__slide w-full h-full p-4 md:p-8 lg:px-24 lg:py-0"
              key={index}
            >
              <HeroCarouselContentContainer slide={slide} />
            </div>
          ))}
        </div>
      </div>
      {isHover ? (
        <div
          className={`fixed top-0 left-0 w-fit h-fit pointer-events-none overflow-hidden`}
          style={cursorTransform}
        >
          <CursoArrow
            className={`fill-current text-accent2 w-24 h-24 ${
              mousePosition.clickableTo === "left" ? "rotate-180" : "rotate-0"
            } duration-100`}
          />
        </div>
      ) : null}
    </div>
  );
};

export default HeroCarousel;
