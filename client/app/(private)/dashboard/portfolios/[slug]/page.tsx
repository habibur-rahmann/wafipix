import PortfolioViewAdmin from "@/app/(private)/_components/page/portfolio/portfolio-view-admin";
import SectionSeparator from "@/components/global/section-separator";
import { FC } from "react";

interface pageProps {
  params: { slug: string };
}

const page: FC<pageProps> = ({ params }) => {
  const { slug } = params;

  return (
    <div>
      <PortfolioViewAdmin slug={slug} />
      <SectionSeparator />
    </div>
  );
};

export default page;
