"use client";

import { contactData } from "@/data";
import { FC, useRef } from "react";

import { variants, motion, useInView } from "@/lib/framer-motion";

interface AddressBoxProps extends React.HTMLAttributes<HTMLDivElement> {}

const AddressBox: FC<AddressBoxProps> = ({ ...props }) => {
  const container = useRef<HTMLDivElement>(null);

  const isInView = useInView(container);

  const address = contactData?.address;

  return (
    <div
      ref={container}
      className={`w-full max-w-[650px] h-full ${props.className}`}
    >
      {Object.entries(address)?.map(([key, value], index) => {
        return (
          <motion.div
            variants={variants.textViewVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            key={`address_${index}`}
            className="grid grid-cols-2 space-y-1 md:space-y-2 items-center"
          >
            <p className="text-lg lg:text-xl">{key}</p>
            {key === "email" ? (
              <a
                className="text-lg lg:text-xl text-blue-400 hover:underline duration-100"
                href={`mailto:${value}`}
              >
                {value}
              </a>
            ) : key === "phone" ? (
              <a
                className="text-lg lg:text-xl text-blue-400 hover:underline duration-100"
                href={`tel:${value}`}
              >
                {value}
              </a>
            ) : (
              <p className="text-lg lg:text-xl">{value}</p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default AddressBox;
