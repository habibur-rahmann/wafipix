import { FC } from "react";
import Logo from "./logo";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className="h-16 w-full p-4 md:p-4 flex items-center">
      <Logo />
    </header>
  );
};

export default Header;
