import { ServiceForCard } from "@/types/types";
import { FC } from "react";
import { servicePageOverviewAndService } from "@/data";
import ServiceCardForServicePage from "./service-card-for-sevices-page";
import ServiceListFromServer from "./service/service-list-from-server";

interface ServicesListProps {}

const ServicesList: FC<ServicesListProps> = ({}) => {
  return (
    <div className="h-full w-full flex flex-col gap-8">
      {getServiceList({
        data: servicePageOverviewAndService as unknown as ServiceForCard[],
        button: false,
      })}

      <ServiceListFromServer />
    </div>
  );
};

export default ServicesList;

export const getServiceList = ({
  data,
  button = true,
}: {
  data: ServiceForCard[];
  button?: boolean;
}) => {
  return data?.map((service, index) => {
    return (
      <ServiceCardForServicePage
        key={index}
        service={service}
        button={button}
      />
    );
  });
};

export const serviceListLoadingUi = (
  <div className={"flex flex-col gap-2 w-full h-fit lg:p-4"}>
    <div className="w-full h-12 bg-secondary animate-pulse duration-1000" />

    <div className="w-full h-44 space-y-2">
      <p className="h-6 w-full bg-secondary animate-pulse duration-1000" />
      <p className="h-6 w-3/4 bg-secondary animate-pulse duration-1000" />
      <p className="h-6 w-full bg-secondary animate-pulse duration-1000" />
      <p className="h-6 w-4/6 bg-secondary animate-pulse duration-1000" />
      <p className="h-6 w-1/2 bg-secondary animate-pulse duration-1000" />
    </div>
  </div>
);
