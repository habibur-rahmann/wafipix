"use client";

import { FC } from "react";
import PortfolioGallery from "./portfolio-gallery";
import RelatedProjectsCardCarousel from "@/components/carousel/related-projects-card-carousel/related-project-card-carouse";
import { usePortfolioRelatedPortfolios } from "@/components/hooks/react-query/portfolios/queries";
import PortfolioViewTexts from "./portfolio-view-texts";

interface PortfolioViewProps {
  slug: string;
}

const PortfolioView: FC<PortfolioViewProps> = ({ slug }) => {
  const { data: relatedPortfoliosData } = usePortfolioRelatedPortfolios(slug);

  return (
    <>
      <section className="h-full w-full p-4 lg:p-x24 relative spacey-16">
        <PortfolioViewTexts slug={slug} />
        <PortfolioGallery slug={slug} />
      </section>
      {relatedPortfoliosData?.related_portfolios?.length ? (
        <RelatedProjectsCardCarousel
          preSlug="/portfolio"
          slides={relatedPortfoliosData.related_portfolios}
        />
      ) : null}
    </>
  );
};

export default PortfolioView;
