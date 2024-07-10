"use client";
import { cn } from "@/lib/utils";
import { useInView, motion, variants } from "@/lib/framer-motion";
import Link from "next/link";
import { HTMLAttributes, forwardRef, useRef, useState } from "react";

interface RedirectButtonProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  title: string;
  icon?: JSX.Element;
  variant?:
    | "secondary"
    | "default"
    | "destructive"
    | "accent"
    | "outline"
    | "ghost"
    | "link"
    | null
    | undefined;
  size?: "default" | "icon" | "sm" | "lg" | null | undefined;
  iconPosition?: "left" | "right";
}

const RedirectButton = forwardRef<HTMLAnchorElement, RedirectButtonProps>(
  (
    { href, title, icon, variant, size, iconPosition = "left", ...props },
    ref
  ) => {
    const container = useRef<any>(null);
    const isInView = useInView(container);

    const [IsMouseDown, setOnMouseDown] = useState<boolean>(false);

    return (
      <motion.div
        ref={container}
        variants={variants.imageVariants}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
      >
        <Link
          ref={ref}
          onMouseDown={() => setOnMouseDown(true)}
          onMouseUp={() => setOnMouseDown(false)}
          href={href}
          {...props}
          className={cn(
            "flex gap-2 items-center justify-center bg-accent2 text-primary-foreground p-2 px-4 hover:bg-accent2/80 duration-75 transition-all",
            props.className,
            {
              "scale-75 ": IsMouseDown,
              "scale-100 ": !IsMouseDown,
            }
          )}
        >
          {iconPosition === "left" ? icon : null}
          <span>{title}</span>
          {iconPosition === "right" ? icon : null}
        </Link>
      </motion.div>
    );
  }
);

RedirectButton.displayName = "RedirectButton";

export default RedirectButton;
