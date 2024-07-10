import { ServiceForView } from "@/types/types";
import { FC } from "react";
import LinkList from "./link-list";

interface ServiceViewSidebarProps {
  service: ServiceForView;
  isLoading: boolean;
}

const ServiceViewSidebar: FC<ServiceViewSidebarProps> = ({
  service,
  isLoading = true,
}) => {
  return (
    <div className="h-fit w-fit py-4">
      <div>
        {/* Service name */}
        <div className="h-full w-full flex flex-col gap-8">
          <div>
            {/* title */}
            {isLoading ? (
              <div className="w-full min-h-12 lg:min-h-16 bg-secondary animate-pulse duration-1000" />
            ) : (
              <h1 className="text-bannerHead md:text-bannerHeadMd lg:bannerheadLg text-primary/80 leading-snug capitalize">
                {service?.title}
              </h1>
            )}

            {/* underline */}
            <div className="py-4 flex items-center">
              <div className="h-2 w-16 bg-accent2" />
            </div>

            {/* short description */}
            {isLoading ? (
              <div className="w-full min-h-4 bg-secondary animate-pulse duration-1000" />
            ) : (
              <h1 className="text-base text-primary/80 text-justify">
                {service?.short_description}
              </h1>
            )}
          </div>

          {/* related projects and service */}
          <div className="flex flex-col gap-4">
            {/* related Projects */}
            <div className="space-y-2">
              <p className="text-base font-semibold">Related projects</p>
              {isLoading ? (
                <>
                  <div className="w-full min-h-4 bg-secondary animate-pulse duration-1000" />
                  <div className="w-full min-h-4 bg-secondary animate-pulse duration-1000" />
                  <div className="w-full min-h-4 bg-secondary animate-pulse duration-1000" />
                </>
              ) : service?.related_portfolios?.length ? (
                <LinkList
                  preSlug="/portfolios/"
                  items={service?.related_portfolios as any[]}
                />
              ) : (
                <p className="text-sm italic font-light">
                  No related projects available.
                </p>
              )}
            </div>

            {/* related Services */}
            <div className="space-y-2">
              <p className="text-base font-semibold">Related services</p>
              {isLoading ? (
                <>
                  <div className="w-full min-h-4 bg-secondary animate-pulse duration-1000" />
                  <div className="w-full min-h-4 bg-secondary animate-pulse duration-1000" />
                  <div className="w-full min-h-4 bg-secondary animate-pulse duration-1000" />
                </>
              ) : service?.related_services?.length ? (
                <LinkList
                  preSlug="/services/"
                  items={service?.related_services as any[]}
                />
              ) : (
                <p className="text-sm italic font-light">
                  No related services available.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceViewSidebar;
