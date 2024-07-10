"use client";
import { FC } from "react";
import { Variants, motion } from "framer-motion";
import NavboxPageNaviagtions from "./navbox-page-naviagtions";

interface NavLinkBoxProps {
  isMenuOpen: boolean;
  onClick: () => void;
}

const NavLinkBox: FC<NavLinkBoxProps> = ({ isMenuOpen, onClick }) => {
  const variants: Variants = {
    initial: {
      height: 0,
      width: 0,
      borderRadius: "20px",
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
    animate: {
      height: "var(--navlink-box-h)",
      width: "var(--navlink-box-w)",
      x: "var(--navlink-box-right)",
      y: "var(--navlink-box-top)",
      padding: "2rem",
      opacity: 1,
      borderRadius: "var(--navlink-box-radius)",
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
  };
  return (
    <motion.div
      variants={variants}
      animate={isMenuOpen ? "animate" : "initial"}
      initial="initial"
      className="[--navlink-box-w:100vw] md:[--navlink-box-w:24rem] [--navlink-box-h:100vh] md:[--navlink-box-h:80vh] [--navlink-box-top:-16px] [--navlink-box-right:32px]  md:[--navlink-box-top:0] md:[--navlink-box-right:0] [--navlink-box-radius:0] md:[--navlink-box-radius:20px] bg-accent2 backdrop-blur-xl fixed top-4 right-4 z-20 flex flex-col justify-between"
    >
      {/* page navigation liks */}
      <div className="pt-8">
        {isMenuOpen ? <NavboxPageNaviagtions onClick={onClick} /> : null}
      </div>
      {/* social navigation liks */}
    </motion.div>
  );
};

export default NavLinkBox;
