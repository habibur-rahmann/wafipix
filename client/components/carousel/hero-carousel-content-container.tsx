import Image from "next/image";
import Link from "next/link";
import { FC, useRef } from "react";
import testImage from "@/public/backgrounds/hero-bg-2.png";
import { getShortParagraph } from "@/lib/utils";
import { motion, variants, useInView } from "@/lib/framer-motion";
import { Variants } from "framer-motion";
import { HeroSlidersView } from "@/types/types";

interface HeroCarouselContentContainerProps {
  slide: HeroSlidersView;
}

const HeroCarouselContentContainer: FC<HeroCarouselContentContainerProps> = ({
  slide,
}) => {
  const container = useRef<HTMLDivElement>(null);

  const isInView = useInView(container);

  return (
    <div
      ref={container}
      className="h-full w-full flex flex-col md:flex-row-reverse md:items-center bg-gray-200 overflow-hidden"
      style={{ background: slide?.config?.backgroundColor }}
    >
      <motion.div
        variants={variants.imageVariants}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        className="h-[60%] md:h-full w-full md:w-[60%] relative p-4 md:p-0"
      >
        <Image
          src={slide?.image_url || testImage}
          alt={slide?.title || "Hero Slider Image."}
          fill
          quality={slide?.config?.imageQuality || 100}
          className="object-contain md:object-contain p-4 md:p-0"
        />
      </motion.div>

      <div className="h-[40%] md:h-[80%] w-full md:w-[40%] md:flex md:items-end md:pl-12">
        <div className="p-4 h-full flex flex-col gap-4 justify-between md:justify-normal md:h-fit">
          <div className="flex flex-col gap-4 h-full md:h-fit w-full">
            <motion.h1
              variants={variants.textViewVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              exit="exit"
              className="text-bannerHead md:text-bannerHeadMd lg:text-bannerHeadLg font-bold text-primary-foreground leading-none text-opacity-80"
              style={{ color: slide?.config?.headingTextColor }}
            >
              {slide?.title || "Title"}
            </motion.h1>
            <motion.p
              variants={variants.textViewVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              className="text-bannerPara md:text-bannerparaMd lg:text-bannerparaLg w-full h-[80%] md:h-fit text-muted/70 leading-snug"
              style={{ color: slide?.config?.descriptionTextColor }}
            >
              {getShortParagraph({
                str: slide?.short_description || "disregard",
                maxLength: 240,
                suffix: "...",
              })}
            </motion.p>
          </div>
          <motion.div
            variants={variants.textViewVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
          >
            <Link
              className="text-lg md:text-xl font-normal text-white hover:underline"
              style={{ color: slide?.config?.linkTextColor }}
              href={`/portfolio/${slide?.slug}` || "/portfolio"}
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarouselContentContainer;

const variantsTextComesFromBottom: Variants = {
  initial: {
    y: "40%",
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    y: "20%",
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};
