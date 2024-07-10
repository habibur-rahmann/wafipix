import { aboutPageTexts } from "@/data";
import { FC } from "react";

interface AboutContainerSidebarProps {}

const AboutContainerSidebar: FC<AboutContainerSidebarProps> = ({}) => {
  return (
    <div className="h-fit w-fit py-4">
      <div>
        {/* tagline and name list */}
        <div className="h-full w-full flex flex-col lg:flex-row gap-8">
          <div>
            {/* first tagline */}
            <h1 className="text-bannerHead md:text-bannerHeadLg  text-primary/80 font-semibold leading-none capitalize">
              {aboutPageTexts.sidebar.firstTagLine}
            </h1>

            {/* underline */}
            <div className="py-8 flex items-center">
              <div className="h-2 w-16 bg-accent2" />
            </div>

            {/* second tagline */}
            <h1 className="text-bannerHead md:text-bannerHeadMd text-primary/80 font-semibold leading-tight capitalize">
              {aboutPageTexts.sidebar.secondTagline}
            </h1>
          </div>
        </div>
        {/* work list */}
        <div></div>
      </div>
    </div>
  );
};

export default AboutContainerSidebar;
