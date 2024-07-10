"use client";
import { FC } from "react";
import CardCarousel from "../card-carousel/card-carousel";
import { CardSlide } from "@/types/types";
import InputMessage from "@/components/global/input-message";
import { useFeaturedPortfolios } from "@/components/hooks/react-query/portfolios/queries";

interface FeaturedProjectsCardCarouselProps {}

const FeaturedProjectsCardCarousel: FC<
  FeaturedProjectsCardCarouselProps
> = ({}) => {
  const { data, isLoading, isError, error } = useFeaturedPortfolios();
  if (isLoading)
    return (
      <div className="min-h-[300px] w-screen flex gap-8 justify-between">
        <div className="min-h-full w-full bg-secondary animate-pulse duration-1000" />
        <div className="hidden md:block min-h-full w-full bg-secondary animate-pulse duration-1000" />
        <div className="hidden lg:block min-h-full w-full bg-secondary animate-pulse duration-1000" />
      </div>
    );

  if (isError)
    return (
      <div className="min-h-[300px] flex items-center justify-center bg-secondary">
        <InputMessage message={error.message} />
      </div>
    );

  return (
    <div>
      <CardCarousel
        preSlug="/portfolio"
        slides={data?.featuredPortfolios as unknown as CardSlide[]}
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

export default FeaturedProjectsCardCarousel;
