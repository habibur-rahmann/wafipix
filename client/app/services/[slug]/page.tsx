import ServiceViewContainer from "@/components/pages/services/service/service-view-container";
import { FC } from "react";

interface ServiceViewProps {
  params: {
    slug: string;
  };
}

const ServiceView: FC<ServiceViewProps> = ({ params }) => {
  const { slug } = params;
  
  return (
    <div>
      <ServiceViewContainer slug={slug} />
    </div>
  );
};

export default ServiceView;
