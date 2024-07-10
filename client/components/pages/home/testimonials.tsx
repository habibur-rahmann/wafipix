"use client";
import TestimonialCarousel from "@/components/carousel/testimonial-carousel/testimonial-carousel";
import RedirectButton from "@/components/global/buttons/redirect-button";
import { useFeaturedReviews } from "@/components/hooks/react-query/reviews/queries";
import { MoveRight } from "lucide-react";
import { FC } from "react";

interface TestimonialsProps {}

const Testimonials: FC<TestimonialsProps> = ({}) => {

  const { data, isLoading, isError, error } = useFeaturedReviews();

  return (
    <div className="h-full w-full">
      <div>
        <div className="flex flex-col items-center justify-center gap-2 p-4 lg:px-24">
          <h2 className="text-lg md:text-xl uppercase text-primary">
            Testimonials
          </h2>
          <h1 className="text-bannderHead md:text-bannerHeadMd lg:text-bannerHeadLg font-semibold capitalize text-primary">
            What our customers say
          </h1>
          <p className="text-bannerPara md:text-bannerparaMd text-muted-foreground text-justify">
            {
              "The strongest endorsements come from those we've served. Listen to the important sayings of our satisfied customers."
            }
          </p>
        </div>
        <div className="w-full h-fit py-8">
          {isLoading ? (
            <div className="h-full w-full flex gap-8 p-4">
              <div className="min-h-[400px] lg:min-h-[350px] bg-secondary animate-pulse duration-1000 w-full" />
              <div className="hidden lg:block min-h-[400px] lg:min-h-[350px] bg-secondary animate-pulse duration-1000 w-full" />
              <div className="hidden lg:block min-h-[400px] lg:min-h-[350px] bg-secondary animate-pulse duration-1000 w-full" />
            </div>
          ) : null}
          {data?.reviews.length ? (
            <TestimonialCarousel
              options={{ loop: true }}
              autoscroll
              autoscrollOptions={{
                speed: 2,
                stopOnInteraction: false,
              }}
              slides={data?.reviews!}
            />
          ) : null}
        </div>
        <div className="w-full h-fit flex items-center justify-center group">

        <RedirectButton
          href="/reviews"
          title="View all reviews"
          className="md:max-w-72"
          icon={<MoveRight className="h-4 w-4 text-primary-foreground/80 group-hover:ml-4 duration-300" />}
          iconPosition="right"
          />
          </div>
      </div>
    </div>
  );
};

export default Testimonials;
