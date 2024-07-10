import ViewHeroBannerAdmin from "@/app/(private)/_components/page/hero-banner/view-hero-banner-admin";
import { FC } from "react";

interface PageProps {
  params: { id: string };
}

const Page: FC<PageProps> = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <ViewHeroBannerAdmin id={id} />
    </div>
  );
};

export default Page;
