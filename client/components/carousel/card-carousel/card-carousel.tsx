"use client";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { usePrevNextButtons } from "@/components/carousel/carousel-button";
import CursoArrow from "@/components/global/cursor-arrow";
import { CardSlide } from "@/types/types";
import CardCarouselContent from "./card-carousel-content";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
type AutoplayOptions = {
  delay?: number;
  jump?: boolean;
  playOnInit?: boolean;
  stopOnFocusIn?: boolean;
  stopOnInteraction?: boolean;
  stopOnMouseEnter?: boolean;
  stopOnLastSnap?: boolean;
  rootNode?: ((emblaRoot: HTMLElement) => HTMLElement | null) | null;
};

type PropType = {
  slides: CardSlide[];
  preSlug: string;
  options?: EmblaOptionsType;
  autoplay?: boolean;
  autoPlayOptions?: AutoplayOptions;
  button?: boolean;
};

const CardCarousel: React.FC<PropType> = (props) => {
  const autoplay = props.autoplay
    ? [Autoplay(props.autoPlayOptions || { delay: 5000 })]
    : [];

  const { slides, preSlug, options, button = true } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, autoplay);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides?.map((item, index) => (
            <div
              className="embla__slide max-w-full md:max-w-[45%] lg:max-w-[30.6%] h-[26rem] lg:h-[30rem] group"
              key={index}
            >
              <div className="h-full w-full flex items-center justify-center">
                <CardCarouselContent preSlug={preSlug} slide={item} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* prev button */}
      <div
        onClick={onPrevButtonClick}
        className={cn(
          "absolute top-[40%] left-8  transform -translate-y-1/2 rotate-180 cursor-pointer",
          {
            hidden: prevBtnDisabled,
            block: !prevBtnDisabled && button,
          }
        )}
      >
        <CursoArrow className="h-10 w-10 md:h-16 md:w-16 fill-current text-accent2" />
      </div>

      {/* next button */}

      <div
        onClick={onNextButtonClick}
        className={cn("absolute top-[40%] right-8 cursor-pointer", {
          hidden: nextBtnDisabled,
          block: !nextBtnDisabled && button,
        })}
      >
        <CursoArrow className="h-10 w-10 md:h-16 md:w-16 fill-current text-accent2" />
      </div>
    </div>
  );
};

export default CardCarousel;
