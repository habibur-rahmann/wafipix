"use client";

import { FC } from "react";
import PortfolioCard from "./portfolio-card";
import { usePortfoliosForCard } from "@/components/hooks/react-query/portfolios/queries";

interface PortfolioContainerProps {}

const PortfolioContainer: FC<PortfolioContainerProps> = ({}) => {
  const { data, isLoading, isError, error } = usePortfoliosForCard();

  if (isLoading)
    return (
      <div className="min-h-screen w-full p-4 lg:px-24 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
        <div className="min-h-72 w-full bg-secondary animate-pulse duration-1000 " />
        <div className="min-h-72 w-full bg-secondary animate-pulse duration-1000 " />
        <div className="min-h-72 w-full bg-secondary animate-pulse duration-1000 " />
        <div className="min-h-72 w-full bg-secondary animate-pulse duration-1000 " />
        <div className="min-h-72 w-full bg-secondary animate-pulse duration-1000 " />
        <div className="min-h-72 w-full bg-secondary animate-pulse duration-1000 " />
        <div className="min-h-72 w-full bg-secondary animate-pulse duration-1000 " />
        <div className="min-h-72 w-full bg-secondary animate-pulse duration-1000 " />
        <div className="min-h-72 w-full bg-secondary animate-pulse duration-1000 " />
      </div>
    );
  return (
    <div className="h-full w-full p-4 lg:px-24">
      <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.portfolios?.map((portfolio, index) => {
          return (
            <PortfolioCard
              key={index}
              preSlug="/portfolios"
              portfolio={portfolio}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioContainer;
