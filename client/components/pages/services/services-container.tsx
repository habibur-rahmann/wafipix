import { FC } from "react";
import ServicesList from "./serivces-list";
import ServicesSidebar from "./services-sidebar";
import SectionSeparator from "@/components/global/section-separator";

interface ServiceContsainerProps {}

const ServicesContainer: FC<ServiceContsainerProps> = ({}) => {
  return (
    <>
      <div className="h-full w-full flex flex-col gap-8 lg:flex-row relative  p-4 lg:px-24">
        <div className="w-auto lg:min-w-[36rem] h-fit lg:sticky top-0 left-0 lg:overflow-y-auto hideScrollbar">
          <ServicesSidebar />
        </div>

        <ServicesList />
      </div>
      <SectionSeparator />
    </>
  );
};

export default ServicesContainer;
