"use client";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { ReviewForCard } from "@/types/types";
import Autoscroll from "embla-carousel-auto-scroll";
import CustomerReviewCard from "@/components/pages/reviews/review-card";

type AutoscrollOptions = {
  direction?: "forward" | "backward";
  speed?: number;
  startDelay?: number;
  playOnInit?: boolean;
  stopOnFocusIn?: boolean;
  stopOnInteraction?: boolean;
  stopOnMouseEnter?: boolean;
  rootNode?: ((emblaRoot: HTMLElement) => HTMLElement | null) | null;
};

type PropType = {
  slides: ReviewForCard[];
  options?: EmblaOptionsType;
  autoscroll?: boolean;
  autoscrollOptions?: AutoscrollOptions;
};

const TestimonialCarousel: React.FC<PropType> = (props) => {
  const autoscroll = props.autoscroll
    ? [Autoscroll(props.autoscrollOptions || { speed: 5000 })]
    : [];

  const { slides, options } = props;
  const [emblaRef] = useEmblaCarousel(options, autoscroll);
 
  return (
    <div className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides?.map((item, index) => (
            <div
              className="embla__slide max-w-full md:max-w-[45%] lg:max-w-[30.6%] h-full min-h-[400px] lg:min-h-[350px] group"
              key={index}
            >
              <div className="h-full w-full flex items-center justify-center">
                <CustomerReviewCard review={item} />
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default TestimonialCarousel;
