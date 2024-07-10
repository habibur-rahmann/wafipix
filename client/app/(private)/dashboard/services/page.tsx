import { FC, Suspense } from "react";
import ServiceContainerAdmin from "../../_components/page/service/service-container-admin";

interface ServicesProps {}

const Services: FC<ServicesProps> = ({}) => {


  return (
    <div>
      <ServiceContainerAdmin />
    </div>
  );
};

export default Services;
