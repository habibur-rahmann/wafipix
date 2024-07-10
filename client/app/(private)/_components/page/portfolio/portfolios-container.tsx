import PortfolioCard from "@/components/pages/portfolio/portfolio-card";
import { FC } from "react";
import PortfolioCards from "./portfolio-cards";
import AddPortfolioDialog from "./add-portfolio-dialog";

interface PortfoliosContainerProps {}

const PortfoliosContainer: FC<PortfoliosContainerProps> = ({}) => {
  return (
    <div className="h-full w-full space-y-4 p-4">
      <div className="h-fit w-full py-4 flex items-center justify-between">
        <h1 className="text-xl lg:text-2xl">Manage portfolios</h1>
        <AddPortfolioDialog>
          <span className="h-fit w-fit px-6 py-3 bg-primary hover:bg-primary/80 duration-100 cursor-pointer text-primary-foreground">
            Add
          </span>
        </AddPortfolioDialog>
      </div>
      <PortfolioCards />
    </div>
  );
};

export default PortfoliosContainer;
