import { navLinks } from "@/data";
import Link from "next/link";
import { FC } from "react";

interface NavboxPageNaviagtionsProps {
  onClick?: () => void;
}

const NavboxPageNaviagtions: FC<NavboxPageNaviagtionsProps> = ({ onClick }) => {
  return (
    <ul className=" space-y-4 text-2xl uppercase text-primary-foreground/90 ">
      {navLinks?.map((link, index) => (
        <li
          onClick={onClick}
          key={index}
          className="w-fit hover:underline hover:text-primary-foreground duration-100"
        >
          <Link href={link.href}>{link.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavboxPageNaviagtions;
