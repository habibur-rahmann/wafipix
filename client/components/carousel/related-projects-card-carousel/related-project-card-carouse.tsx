import { FC } from "react";
import CardCarousel from "../card-carousel/card-carousel";
import { CardSlide } from "@/types/types";

interface RelatedProjectsCardCarouselProps {
  preSlug: string;
  slides: CardSlide[]
}

const RelatedProjectsCardCarousel: FC<
  RelatedProjectsCardCarouselProps
> = ({slides, preSlug}) => {
  return (
    <div className=" py-24">
      <div className="px-4">
        <h1 className="text-lg lg:text-xl text-primary/80 text-center">You may like those...</h1>
      </div>
      <CardCarousel
        preSlug={preSlug}
        slides={slides}
        options={{ loop: true }}
        autoplay
        autoPlayOptions={{
          delay: 3000,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }}
      />
    </div>
  );
};

export default RelatedProjectsCardCarousel;
