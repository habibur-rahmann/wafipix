
import { FC } from "react";
import ServiceViewRelatedPortfolios from "./service-view-related-portfolios";
import ServiceViewRelatedServices from "./service-view-related-services";
import ServiceViewTexts from "./service-view-texts";

interface ServiceViewAdminProps {
  slug: string;
}

const ServiceViewAdmin: FC<ServiceViewAdminProps> = ({ slug }) => {


  return (
    <div className="p-4 space-y-6">
      <ServiceViewTexts slug={slug} />
      <ServiceViewRelatedPortfolios slug={slug} />
      <ServiceViewRelatedServices slug={slug} />
    </div>
  );
};

export default ServiceViewAdmin;

