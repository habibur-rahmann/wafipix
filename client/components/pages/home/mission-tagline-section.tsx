"use client";

import { missionTaglineData } from "@/data";
import { FC, useRef } from "react";
import circleTextImage from "@/public/circular-text-wrapped-generator-removebg-preview.png";
import Image from "next/image";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { useScrollClient } from "@/components/hooks/use-window-client-property";
import airbnb from "@/public/abstract-demo-logo.png";
import Link from "next/link";
import RedirectButton from "@/components/global/buttons/redirect-button";
import { useInView } from "framer-motion";
import { variants, motion } from "@/lib/framer-motion";

const logos = [
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
  airbnb,
];

interface MissionTaglineSectionProps {}

const MissionTaglineSection: FC<MissionTaglineSectionProps> = ({}) => {
  const container = useRef<HTMLDivElement>(null);

  const { scrollY } = useScrollClient();

  const isInView = useInView(container);

  return (
    <div
      ref={container}
      className="h-fit w-full bg-gradient-to-t from-pink-300 relative py-8 pb-16"
    >
      {/* mission tagline */}
      <div className="h-auto w-full p-4 md:p-4 lg:p-24 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <motion.h1
          variants={variants.textViewVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="w-full text-tagline md:text-taglineMd lg:text-taglineLg md:text-xl lg:text-3xl font-semibold text-primary/80"
        >
          {missionTaglineData.tagline}
        </motion.h1>

        {/* animate circle icon */}
        <motion.div
          variants={variants.imageVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="w-full md:w-fit h-fit flex items-center justify-end"
        >
          <Link href="/about">
            <div className="relative h-32 w-32 md:h-44 md:w-44 group hover:scale-105 duration-300 mr-6">
              <Image
                src={circleTextImage}
                alt="circle-text-image"
                fill
                className="object-contain"
                style={{ rotate: `${scrollY / 3}deg` }}
              />

              <ArrowUpRight className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-24 w-24 text-muted group-hover:text-primary group-hover:scale-105 duration-100" />
            </div>
          </Link>
        </motion.div>
      </div>

      {/* image  */}
      <div className="h-fit w-full overflow-x-hidden">
        <div
          className="h-full w-fit flex gap-4 py-4"
          style={{
            transform: `translateX(-${scrollY / 2}px)`,
          }}
        >
          {logos.map((image, index) => {
            return (
              <div
                className="relative h-44 md:h-56 lg:h-72 aspect-square"
                key={index}
              >
                <Image src={image} alt="airbnb" fill className="object-cover" />
              </div>
            );
          })}
        </div>
      </div>

      <RedirectButton
        href="/contact"
        title="Get your logo"
        size={"lg"}
        iconPosition="right"
        icon={<ArrowUp className="group-hover:animate-bounce duration-500" />}
        className="h-12 w-fit p-4 bg-pink-400 text-primary-foreground hover:bg-pink-500 drop-shadow rounded-none absolute -bottom-8 left-1/2 transform -translate-x-1/2 lg:translate-x-0 lg:left-24"
      />
    </div>
  );
};

export default MissionTaglineSection;
