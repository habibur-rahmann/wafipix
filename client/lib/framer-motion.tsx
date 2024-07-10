"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { FC, useRef } from "react";

const textViewVariants = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  exit: {
    y: 100,
    opacity: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const imageVariants = {
  initial: {
    x: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const cardPopUpVariants = {
  initial: {
    scale: 0.8,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const variants = {
  textViewVariants,
  imageVariants,
  cardPopUpVariants,
};

export { motion, AnimatePresence, useInView, variants };

interface motionH1Props extends React.HTMLAttributes<HTMLHeadElement> {
  children: React.ReactNode | string;
}

export const MotionH1: FC<motionH1Props> = ({
  children,
  className,
}) => {
  const H1Ref = useRef<any>(null);
  const isInView = useInView(H1Ref);

  return (
    <motion.h1
      ref={H1Ref}
      variants={textViewVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      className={className}
    >
      {children}
    </motion.h1>
  );
};
