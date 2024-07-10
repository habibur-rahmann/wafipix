import { servicePageTexts } from "@/data";
import { FC } from "react";
import ServiceNavList from "./service-nav-list";

interface ServicesSidebarProps {}

const ServicesSidebar: FC<ServicesSidebarProps> = ({}) => {
  return (
    <div className="h-fit w-fit py-4">
      <div>
        {/* tagline and name list */}
        <div className="h-full w-full flex flex-col lg:flex-row gap-8">
          <div>
            {/* first tagline */}
            <h1 className="text-bannerHead md:text-bannerHeadMd lg:text-xl text-primary/80 font-semibold leading-none capitalize">
              {servicePageTexts.sidebar.firstTagLine}
            </h1>

            {/* underline */}
            <div className="py-4 flex items-center">
              <div className="h-2 w-16 bg-accent2" />
            </div>

            {/* second tagline */}
            <h1 className="text-bannerHead md:text-bannerHeadMd text-primary/80 font-semibold leading-tight capitalize">
              {servicePageTexts.sidebar.secondTagline}
            </h1>
          </div>

          {/* serviceNav list */}
          <div className="min-w-[12rem]">
            <ServiceNavList />
          </div>
        </div>
        {/* work list */}
        <div></div>
      </div>
    </div>
  );
};

export default ServicesSidebar;
