"use client";

import RedirectButton from "@/components/global/buttons/redirect-button";
import { ArrowDown } from "lucide-react";
import { FC } from "react";
import ServiceCard from "./service-card";
import { MotionH1 } from "@/lib/framer-motion";
import { useService } from "@/components/hooks/react-query/use-services";
import InputMessage from "@/components/global/input-message";

export type ServiceForCard = {
  id: number | string;
  title: string;
  slug: string;
  short_description: string;
};

interface HomeServiceSectionProps {}

const HomeServiceSection: FC<HomeServiceSectionProps> = ({}) => {
  const { getServiceForCard } = useService();
  const { data, isLoading, isError, error } = getServiceForCard;

  if (isLoading)
    return (
      <div className="min-h-[30vh] w-full p-4 lg:p-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="h-full min-h-[180px] w-full bg-secondary animate-pulse duration-1000" />
        <div className="h-full min-h-[180px] w-full bg-secondary animate-pulse duration-1000" />
        <div className="h-full min-h-[180px] w-full bg-secondary animate-pulse duration-1000" />
        <div className="h-full min-h-[180px] w-full bg-secondary animate-pulse duration-1000" />
        <div className="h-full min-h-[180px] w-full bg-secondary animate-pulse duration-1000" />
        <div className="h-full min-h-[180px] w-full bg-secondary animate-pulse duration-1000" />
        <div className="h-full min-h-[180px] w-full bg-secondary animate-pulse duration-1000" />
        <div className="h-full min-h-[180px] w-full bg-secondary animate-pulse duration-1000" />
      </div>
    );
  if (isError)
    return (
      <div className="min-h-[30vh] w-full p-4 lg:p-24 flex items-center justify-center">
        <InputMessage message={error?.message} />
      </div>
    );

  return (
    <div className="h-fit w-full p-4 md:p-4 lg:p-24 grid grid-cols-1 lg:grid-cols-none lg:grid-flow-col lg:auto-cols-auto gap-8">
      {/* header title and button */}
      <div className="w-full md:min-w-[350px] lg:max-w-[500px] h-fit flex flex-row gap-2 justify-between items-center lg:justify-normal lg:items-start lg:flex-col mb-8">
        <MotionH1 className="text-sectionTitle md:text-sectionTitleMd lg:text-sectionTitleMdLg leading-">
          Services
        </MotionH1>
        <RedirectButton
          href="/services"
          title="View All of Our Services"
          variant={"accent"}
          className="h-fit w-fit group"
          iconPosition="right"
          icon={
            <ArrowDown className="group-hover:animate-bounce duration-300" />
          }
        />
      </div>
      <div className=" grid grid-cols-1 gap-8 lg:grid-cols-2">
        {data?.services.slice(0, 8)?.map((service) => {
          return (
            <ServiceCard
              key={service._id}
              title={service.title}
              slug={`services/${service.slug}`}
              description={service.short_description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomeServiceSection;
