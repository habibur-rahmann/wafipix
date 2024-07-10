import Link from "next/link";
import { FC } from "react";

interface LogoProps extends React.HTMLAttributes<HTMLHeadingElement> {
  type?: "icon" | "name";
}

const Logo: FC<LogoProps> = ({ type = "icon", ...props }) => {
  return (
    <h1
      {...props}
      className={`text-4xl text-accent2 font-bold tracking-tighter h-fit w-fit ${props.className}`}
    >
      <Link href={"/"} className="h-full w-full">
        {type === "icon" ? <span>W.</span> : <span>wafipix.</span>}
      </Link>
    </h1>
  );
};

export default Logo;
