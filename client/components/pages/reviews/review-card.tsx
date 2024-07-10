"use client";

import ProfileAvatar from "@/components/global/avatar";
import { cn, getShortParagraph } from "@/lib/utils";
import { ReviewForCard } from "@/types/types";
import { Pencil, Quote, Star } from "lucide-react";
import { FC, useRef } from "react";
import { motion } from "@/lib/framer-motion";
import { Variants, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";

interface CustomerReviewCardProps {
  review: ReviewForCard;
  border?: boolean;
  shadow?: boolean;
  active?: boolean;
  onEdit?: () => void;
}

const variants: Variants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      duration: "0.3",
      ease: "backInOut",
    },
  },
};

const CustomerReviewCard: FC<CustomerReviewCardProps> = ({
  review,
  border = true,
  shadow = false,
  active = true,
  onEdit,
}) => {
  const containerRef = useRef<any>(null);

  const isInView = useInView(containerRef);

  return (
    <motion.div
      ref={containerRef}
      variants={variants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      className="h-full w-full p-4 select-none"
    >
      <div
        className={cn("h-full w-full relative p-4 rounded", {
          border: border,
          "border-red-400": !active,
          "shadow-lg": shadow,
        })}
      >
        {/* details */}
        <div className="h-full min-h-[400px] lg:min-h-[350px] w-full text-center flex flex-col justify-between items-center">
          {/* review */}
          <p className="px-10 py-4 text-primary text-articlePara">
            {getShortParagraph({
              str: review?.text,
              maxLength: 220,
              suffix: "...",
            })}
          </p>

          <div className=" flex flex-col items-center justify-center">
            {/* image */}
            <div className="h-fit w-fit">
              <ProfileAvatar
                user_name={review?.user_name}
                avatar_url={review?.user_picture}
              />
            </div>

            <h1 className="text-cardTitle md:text-cardTitleMd text-primary/80 font-semibold">
              {review?.user_name}
            </h1>

            {/* review stars */}
            <div className="p-2 flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => {
                return (
                  <Star
                    fill={index < review?.star ? "#ffa534" : ""}
                    key={index}
                    className={cn("h-5 w-5 text-primary/30", {
                      "text-[#ffa534]": index < review?.star,
                    })}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* bg quote */}
        <Quote className="absolute top-4 left-4 h-10 w-10 text-primary/10 transform rotate-180" />
        {onEdit ? (
          <Button
            onClick={onEdit}
            variant={"ghost"}
            size={"icon"}
            className="absolute top-4 right-4 h-fit w-fit p-2 group cursor-pointer"
          >
            <Pencil className="h-4 w-4 text-primary group-hover:text-primary/80 duration-100" />
          </Button>
        ) : null}
      </div>
    </motion.div>
  );
};

export default CustomerReviewCard;
