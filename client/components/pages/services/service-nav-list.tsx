"use client";
import { ServiceForCard } from "@/types/types";
import { FC } from "react";
import { servicePageOverviewAndService } from "@/data";
import Link from "next/link";
import { useService } from "@/components/hooks/react-query/use-services";
import InputMessage from "@/components/global/input-message";

interface ServicesNavListProps {}

const ServicesNavList: FC<ServicesNavListProps> = ({}) => {
  const { getServiceForCard } = useService();
  const { data, isLoading, isError, error } = getServiceForCard;

  const getNavigationList = (data: ServiceForCard[]) => {
    return data?.map((service, index) => {
      return (
        <li
          key={index}
          className="w-fit hover:text-accent2 hover:underline duration-300"
        >
          <Link href={`/services/#${service.slug}`} className="flex gap-2">
            <span>#</span>
            <span>{service.title}</span>
          </Link>
        </li>
      );
    });
  };
  const serviceNavigationListLoading = (
    <ul className="flex flex-col gap-2 lg:gap-4">
      <li className="w-full h-6 bg-secondary animate-pulse duration-1000"></li>
      <li className="w-full h-6 bg-secondary animate-pulse duration-1000"></li>
      <li className="w-full h-6 bg-secondary animate-pulse duration-1000"></li>
      <li className="w-full h-6 bg-secondary animate-pulse duration-1000"></li>
    </ul>
  );
  const serviceNavigationListError = <InputMessage message={error?.message} />;
  return (
    <ul className="space-y-2 lg:space-y-4 text-articlePara md:text-articleParaMd lg:text-articleParaLg text-accent2/80">
      {/* for first initial two overview and service */}
      {getNavigationList(
        servicePageOverviewAndService as unknown as ServiceForCard[]
      )}

      {/* service list navigation from server */}
      {isLoading
        ? serviceNavigationListLoading
        : isError
        ? serviceNavigationListError
        : getNavigationList(data?.services!)}
    </ul>
  );
};

export default ServicesNavList;
