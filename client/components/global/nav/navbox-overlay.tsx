"use client";
import { FC } from "react";
import { Variants, motion } from "framer-motion";

interface NavboxOverlayProps {
  isMenuOpen: boolean;
  onClick: () => void;
}

const NavboxOverlay: FC<NavboxOverlayProps> = ({ isMenuOpen, onClick }) => {
  const variants: Variants = {
    initial: {
      height: 0,
      width: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
    animate: {
      height: "120vh",
      width: "120vw",
      x: '32px',
      y: '-32px',
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
  };
  return (
    <motion.div
    onClick={onClick}
      variants={variants}
      animate={isMenuOpen ? "animate" : "initial"}
      initial="initial"
      className=" bg-primary/10 backdrop-blur-lg fixed top-4 right-4 z-10 flex flex-col justify-between"
    ></motion.div>
  );
};

export default NavboxOverlay;
