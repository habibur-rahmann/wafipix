"use client";
import { CardSlide } from "@/types/types";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC, useRef } from "react";

interface CardCarouselContentProps {
  slide: CardSlide;
  preSlug: string;
}

const CardCarouselContent: FC<CardCarouselContentProps> = ({
  slide,
  preSlug,
}) => {
  const ref = useRef<any>(null);
  
  const slug = preSlug + "/" + slide?.slug;
  
  return (
    <div
      onClick={() => {
        if (ref?.current) ref.current.click();
      }}
      className="h-full w-full flex flex-col gap-2 px-4 py-8"
    >
      {/* image */}
      <div className="relative w-full h-[80%] group-hover:scale-105 duration-300 group-hover:-translate-y-4 cursor-pointer">
        <Image
          src={slide?.image_url}
          alt={slide?.title || "Fetured Project image"}
          fill
          className="w-full h-full object-cover"
        />
      </div>

      {/* texts */}
      <div className="flex flex-col gap-2">
        <h1 className="text-cardTitle md:text-cardTitleMd lg:text-cardTitleLg text-primary/80 font-semibold">
          {slide?.title}
        </h1>
        <Link
          href={slug}
          className="text-blue-500 text-cardLink md:text-cardLinkMd lg:text-cardLinkLg flex gap-2 hover:underline items-center w-fit hover:gap-4 duration-100"
        >
          <span>Learn more</span> <MoveRight className="h-4 w-4" />
        </Link>
      </div>
      <Link ref={ref} href={slug} />
    </div>
  );
};

export default CardCarouselContent;
