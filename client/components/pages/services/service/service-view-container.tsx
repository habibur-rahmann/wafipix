"use client";
import { FC } from "react";
import SectionSeparator from "@/components/global/section-separator";
import ServiceViewSidebar from "./service-view-sidebar";

import ServiceViewDescriptionContainer from "./service-view-description-container";
import RelatedProjectsCardCarousel from "@/components/carousel/related-projects-card-carousel/related-project-card-carouse";
import { useService } from "@/components/hooks/react-query/use-services";
import InputMessage from "@/components/global/input-message";

interface ServiceViewContainerProps {
  slug: string;
}

const ServiceViewContainer: FC<ServiceViewContainerProps> = ({ slug }) => {
  const { getServiceForView, getServicesRelatedPortfolios } = useService({
    slug,
  });
  const { data, isLoading, isError, error } = getServiceForView;
  const { data: relatedPortfoliosData } = getServicesRelatedPortfolios;

  if (isError)
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <InputMessage message={error.message} />
      </div>
    );
  return (
    <>
      <div className="h-full w-full flex flex-col gap-8 lg:flex-row relative  p-4">
        <div className="w-auto lg:min-w-[36rem] h-fit lg:sticky top-0 left-0 lg:overflow-y-auto hideScrollbar">
          <ServiceViewSidebar isLoading={isLoading} service={data?.service!} />
        </div>
        <ServiceViewDescriptionContainer
          isLoading={isLoading}
          description={data?.service?.description!}
        />
      </div>
      <SectionSeparator />

      {relatedPortfoliosData?.related_portfolios?.length ? (
        <RelatedProjectsCardCarousel
          preSlug="/portfolio"
          slides={relatedPortfoliosData?.related_portfolios}
        />
      ) : null}
    </>
  );
};

export default ServiceViewContainer;
