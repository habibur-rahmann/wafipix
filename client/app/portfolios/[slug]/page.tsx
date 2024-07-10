import PortfolioView from "@/components/pages/portfolio/portfolio-view";
import { FC } from "react";

interface PortfolioSlugProps {
  params: {
    slug: string;
  };
}

const PortfolioSlug: FC<PortfolioSlugProps> = ({ params }) => {
  const { slug } = params;
  return <PortfolioView slug={slug} />;
};

export default PortfolioSlug;
