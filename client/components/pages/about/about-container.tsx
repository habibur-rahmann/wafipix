import { FC } from "react";
import SectionSeparator from "@/components/global/section-separator";
import AboutContainerSidebar from "./about-container-sidebar";
import AboutContainerDetails from "./about-container-details";

interface AboutContainerProps {}

const AboutContainer: FC<AboutContainerProps> = ({}) => {
  return (
    <>
      <div className="h-full w-full flex flex-col gap-8 lg:flex-row relative  p-4 lg:px-24">
        <div className="w-auto lg:min-w-[36rem] h-fit lg:sticky top-0 left-0 lg:overflow-y-auto hideScrollbar">

          <AboutContainerSidebar />
        </div>

        <AboutContainerDetails />
      </div>
      <SectionSeparator />
    </>
  );
};

export default AboutContainer;