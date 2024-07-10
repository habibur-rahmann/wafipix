import ServiceViewAdmin from "@/app/(private)/_components/page/service/service-view-admin";
import SectionSeparator from "@/components/global/section-separator";
import { FC, Suspense } from "react";

interface ServiceProps {
  params: { slug: string };
}

const Service: FC<ServiceProps> = ({ params }) => {
  const { slug } = params;
  return <div>
    <ServiceViewAdmin slug={slug} />
    <SectionSeparator />
    </div>;
};

export default Service;
