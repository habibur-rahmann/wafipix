"use client";
import RedirectButton from "@/components/global/buttons/redirect-button";
import { getShortParagraph } from "@/lib/utils";
import { FC, useEffect, useRef, useState } from "react";
import { motion, useInView, variants } from "@/lib/framer-motion";

interface ServiceCardProps {
  title: string;
  slug: string;
  description: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ title, slug, description }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const RefButton = useRef<HTMLAnchorElement>(null);

  const isInView = useInView(cardRef);

  const [optimizedDescription, setOptimizedDescription] = useState<
    string | undefined
  >("");

  const clickHandle = () => {
    if (RefButton.current) {
      RefButton.current.click();
    }
  };

  useEffect(() => {
    const shortDesc = getShortParagraph({
      str: description,
      maxLength: 200,
      suffix: "...",
    });

    setOptimizedDescription(shortDesc);
  }, [description]);

  return (
    <motion.div
      variants={variants.cardPopUpVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      ref={cardRef}
      onClick={clickHandle}
      className="flex flex-col gap-2 w-full h-full lg:p-4 rounded cursor-pointer lg:hover:bg-secondary duration-100"
    >
      <div className="flex justify-between w-full h-fit">
        <h1 className="text-articleTitle md:text-articleTitleMd lg:text-articleTitleLg text-primary">
          {title}
        </h1>
        <RedirectButton
          ref={RefButton}
          href={slug}
          title="View"
          className="bg-transparent hover:bg-transparent p-0 px-0 hover:underline text-primary/50 hover:text-primary"
        />
      </div>
      <div className="w-full h-fit">
        <p className="text-articlePara md:text-articleParaMd lg:text-articleParaLg text-primary/70">
          {optimizedDescription}
        </p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
