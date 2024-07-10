import { FC } from "react";
import HeroBannersAdmin from "../../_components/page/hero-banner/hero-banners-admin";
import SectionSeparator from "@/components/global/section-separator";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <HeroBannersAdmin />
      <SectionSeparator />
    </div>
  );
};

export default page;
