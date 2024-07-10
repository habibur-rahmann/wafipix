"use client";

import { FC, useState } from "react";
import FloatingNavMenuButton from "./floating-nav-menu-button";
import NavLinkBox from "./nav-link-box";
import NavboxOverlay from "./navbox-overlay";

interface NavBoxProps {}

const NavBox: FC<NavBoxProps> = ({}) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const handleMunuTrigger = () => setMenuOpen(!isMenuOpen);

  return (
    <div>
      <FloatingNavMenuButton
        onClick={handleMunuTrigger}
        isMenuOpen={isMenuOpen}
      />
      <NavLinkBox isMenuOpen={isMenuOpen} onClick={handleMunuTrigger} />
      <NavboxOverlay onClick={handleMunuTrigger} isMenuOpen={isMenuOpen} />
    </div>
  );
};

export default NavBox;
