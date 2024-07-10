"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FC, HTMLAttributes, useState } from "react";
import { motion } from "@/lib/framer-motion";
import { Variants } from "framer-motion";

interface CollapseBoxProps extends HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  heading: string;
  children: React.ReactNode;
  headingBorder?: boolean;
}

const variants: Variants = {
  initial: { height: 0 },
  animate: { height: "auto", transition: {
    ease: "backOut",duration: ".3"
  } },
};

const CollapseBox: FC<CollapseBoxProps> = ({
  isOpen = true,
  heading,
  children,
  headingBorder = true,
  className,
  ...props
}) => {
  const [isOpenBox, setOpen] = useState<boolean>(isOpen);

  const handleCollapse = () => setOpen(!isOpenBox);

  return (
    <div {...props} className={cn("h-fit w-full", className)}>
      <div className="border border-primary/10">
        <CollapseButton
          heading={heading}
          isOpen={isOpenBox}
          onCollapse={handleCollapse}
        />
      </div>
      <motion.div
        variants={variants}
        initial="animate"
        animate={isOpenBox ? "animate" : "initial"}
        className={cn("h-fit w-full overflow-hidden")}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default CollapseBox;

interface ButtonProps {
  heading: string;
  isOpen: boolean;
  onCollapse: () => void;
}

const CollapseButton: FC<ButtonProps> = ({ heading, isOpen, onCollapse }) => {
  return (
    <div
      className={cn(
        "h-fit w-full flex items-center justify-between p-4 cursor-pointer group hover:bg-secondary"
      )}
      onClick={onCollapse}
    >
      <h1 className="text-xl gl:text-2xl font-semibold">{heading}</h1>

      <ChevronDown
        className={cn(
          "text-primary h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 group-hover:scale-110 duration-300 transition-all ease-in",
          { "rotate-180": !isOpen, "rotate-0": isOpen }
        )}
      />
    </div>
  );
};
