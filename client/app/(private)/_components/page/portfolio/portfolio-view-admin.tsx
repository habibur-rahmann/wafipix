"use client";
import InputMessage from "@/components/global/input-message";
import { FC } from "react";
import PortfolioViewFormTextsAdmin from "./portfolio-view-form-texts-admin";
import PortfolioViewRelatedPortfolios from "./portfolio-view-related-portfolios";
import PortfolioViewRelatedServices from "./portfolio-view-related-services";
import PortfolioViewMedias from "./portfolio-view-medias";
import { usePortfolioTexts } from "@/components/hooks/react-query/portfolios/queries";
import PortfolioViewProfilePhoto from "./portfolio-view-profile-photo";

interface PortfolioViewAdminProps {
  slug: string;
}

const PortfolioViewAdmin: FC<PortfolioViewAdminProps> = ({ slug }) => {
  const { data, isLoading, isError, error } = usePortfolioTexts(slug);

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <div>
        <InputMessage message={error.message} />
      </div>
    );
  if (!data?.success)
    return (
      <div>
        <InputMessage message={(data as any)?.message} />
      </div>
    );
  return (
    <div className="p-4 space-y-8">
      <PortfolioViewFormTextsAdmin portfolioTexts={data?.portfolio} />
      <PortfolioViewRelatedPortfolios
        slug={slug}
        portfolio_id={data?.portfolio?._id}
      />
      <PortfolioViewRelatedServices
        slug={slug}
        portfolio_id={data?.portfolio?._id}
      />
      <PortfolioViewProfilePhoto
        slug={slug}
        portfolio_id={data?.portfolio?._id}
      />
      <PortfolioViewMedias slug={slug} portfolio_id={data?.portfolio?._id} />
    </div>
  );
};

export default PortfolioViewAdmin;
