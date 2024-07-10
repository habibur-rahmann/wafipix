"use client";

import Link from "next/link";
import Image from "next/image";
import { FC, useRef } from "react";
import { PortfolioForCard } from "@/types/types";

import { variants, useInView, motion } from "@/lib/framer-motion";

interface PortfolioCardProps {
  portfolio: PortfolioForCard;
  preSlug: string;
}

const PortfolioCard: FC<PortfolioCardProps> = ({ portfolio, preSlug }) => {
  const container = useRef<any>(null);
  const isInView = useInView(container);

  return (
    <motion.div
      ref={container}
      variants={variants.cardPopUpVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      className="overflow-hidden relative"
    >
      <Link
        ref={container}
        href={`${preSlug}/${portfolio?.slug}` || ""}
        className="h-full w-full group overflow-hidden"
      >
        {/* image */}
        <div className=" w-full h-auto min-h-72 relative">
          <Image
            src={portfolio?.image_url || ""}
            alt={portfolio?.title || "Portfolio image"}
            fill
            className="object-cover"
          />
        </div>
        {/* title box */}
        <div className="min-h-12 h-fit w-full flex items-center px-2 absolute left-0 bottom-0 md:-bottom-full group-hover:bottom-0 bg-accent2 transition-all duration-300">
          <h1 className="text-articleTitle md:text-articleTitleMd lg:text-articleTitleLg text-primary-foreground">
            {portfolio?.title}
          </h1>
        </div>
      </Link>
    </motion.div>
  );
};

export default PortfolioCard;
