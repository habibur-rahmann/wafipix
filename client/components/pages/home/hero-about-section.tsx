"use client";
import { useInView, variants, motion } from "@/lib/framer-motion";
import { FC, useRef } from "react";

interface HeroAboutSectionProps {}

const HeroAboutSection: FC<HeroAboutSectionProps> = ({}) => {
  const container = useRef<HTMLDivElement>(null);
  const isInview = useInView(container);

  return (
    <div
      ref={container}
      className="min-h-[50vh] h-fit w-full mt-16 p-4 md:p-4 lg:p-24 flex flex-col gap-12 md:flex-row"
    >
      {/* achievement section */}
      <div className="h-full w-full max-w-[32rem] flex flex-col gap-8">
        <motion.h1
          variants={variants.textViewVariants}
          initial="initial"
          animate={isInview ? "animate" : "initial"}
          className="text-5xl md:text-6xl lg:text-8xl"
        >
          About Us
        </motion.h1>

        <div className="flex gap-4 h-full w-full">
          {/* our working years */}
          <div className="h-full w-full flex flex-col gap-4">
            <motion.h1
              variants={variants.textViewVariants}
              initial="initial"
              animate={isInview ? "animate" : "initial"}
              className="text-lg lg:text-xl"
            >
              Years in Business
            </motion.h1>
            <div className="bg-primary h-1 w-full" />
            <motion.h1
              variants={variants.textViewVariants}
              initial="initial"
              animate={isInview ? "animate" : "initial"}
              className="text-6xl lg:text-8xl font-semibold"
            >
              16
            </motion.h1>
          </div>

          {/* our clients */}
          <div className="h-full w-full flex flex-col gap-4">
            <motion.h1
              variants={variants.textViewVariants}
              initial="initial"
              animate={isInview ? "animate" : "initial"}
              className="text-lg lg:text-xl"
            >
              Our Unique Clients
            </motion.h1>
            <div className="bg-primary h-1 w-full" />
            <motion.h1
              variants={variants.textViewVariants}
              initial="initial"
              animate={isInview ? "animate" : "initial"}
              className="text-6xl lg:text-8xl font-semibold"
            >
              300+
            </motion.h1>
          </div>
        </div>
      </div>

      {/* about details */}
      <div className="w-full h-full flex flex-col gap-8">
        <motion.h1
          variants={variants.textViewVariants}
          initial="initial"
          animate={isInview ? "animate" : "initial"}
          className="text-articleTitle md:text-articleTitleMd lg:text-articleTitleLg leading-tight font-semibold text-primary/80"
        >
          We mix our genuine love for design with our tenacious dedication to
          detail and craft.
        </motion.h1>
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-8">
          <motion.p
            variants={variants.textViewVariants}
            initial="initial"
            animate={isInview ? "animate" : "initial"}
            className="text-articlePara md:text-articleParaMd lg:text-articleParaLg leading-tight text-primary/70"
          >
            Propaganda Creative is an award-winning full-service design firm.
            Since 2010, we have been creating compelling brand experiences that
            inspire and engage users at every connection point.
          </motion.p>
          <motion.p
            variants={variants.textViewVariants}
            initial="initial"
            animate={isInview ? "animate" : "initial"}
            className="text-articlePara md:text-articleParaMd lg:text-articleParaLg leading-tight text-primary/70"
          >
            Our talented team consists of a diverse blend of designers,
            developers, producers illustrators, thinkers, and dreamers. Each one
            adding a fresh perspective to every project.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default HeroAboutSection;
