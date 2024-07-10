import SectionSeparator from "@/components/global/section-separator";
import PortfolioContainer from "@/components/pages/portfolio/portfolio-container";
import { FC } from "react";

interface PortfolioProps {}

const Portfolio: FC<PortfolioProps> = ({}) => {
  return (
    <div className="h-full w-full">
      <PortfolioContainer />
      <SectionSeparator />
    </div>
  );
};

export default Portfolio;
