"use client";

import { FC } from "react";
import { getServiceList, serviceListLoadingUi } from "../serivces-list";
import { useService } from "@/components/hooks/react-query/use-services";
import InputMessage from "@/components/global/input-message";

interface ServiceListFromServerProps {}

const ServiceListFromServer: FC<ServiceListFromServerProps> = ({}) => {
  const { getServiceForCard } = useService();
  const { data, isLoading, isError, error } = getServiceForCard;

  if (isLoading)
    return (
      <>
        {serviceListLoadingUi} {serviceListLoadingUi} {serviceListLoadingUi}
      </>
    );

  if (isError)
    return (
      <div className="px-4">
        <InputMessage message={error?.message} />
      </div>
    );

  return <div className="space-y-8 ">{getServiceList({ data: data?.services! })}</div>;
};

export default ServiceListFromServer;
