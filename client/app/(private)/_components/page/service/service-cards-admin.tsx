"use client";

import InputMessage from "@/components/global/input-message";
import { useDeleteServiceMutation } from "@/components/hooks/react-query/services/mutations";
import { useServicesForCard } from "@/components/hooks/react-query/services/queries";
import { useCurrentuser } from "@/components/hooks/use-current-user";
import ServiceCard from "@/components/pages/home/service-card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { FC } from "react";

interface ServiceCardsAdminProps {}

const ServiceCardsAdmin: FC<ServiceCardsAdminProps> = ({}) => {
  const user = useCurrentuser();

  const { toast } = useToast();

  const { data, isLoading, isError, error } = useServicesForCard();

  const {
    mutate,
    data: mutateData,
    isPending,
    isSuccess: isMutateSuccess,
    isError: isMutateError,
    error: mutateError,
  } = useDeleteServiceMutation();

  const deleteHandle = (service_id: string) => {
    if (!service_id) return toast({ title: "Service id required!" });

    mutate({
      id: service_id,
      accessToken: user?.accessToken!,
    });
  };

  const Cards = data?.services?.map((service) => {
    return (
      <div
        key={service._id}
        className={cn("relative bg-secondary", {
          "animate-pulse duration-1000": isPending,
        })}
      >
        <Button
          onClick={() => deleteHandle(service?._id)}
          variant={"secondary"}
          size={"icon"}
          className="absolute top-2 right-2 z-20 group"
        >
          <Trash2 className="h-6 w-6 text-red-400 group-hover:text-red-500 duration-1000" />
        </Button>
        <div className="h-fit w-full bg-secondary/80 p-4 hover:bg-secondary duration-100">
            <ServiceCard
              slug={`/dashboard/services/${service?.slug}`}
              title={service?.title}
              description={service?.short_description}
            />

          </div>
      </div>
    );
  });

  if (isLoading) return LoadingUi();
  if (isError || !data?.success)
    return ErrorUi(error?.message || (data as any)?.message);
  return (
    <div className="h-full w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Cards}
    </div>
  );
};

export default ServiceCardsAdmin;

const LoadingUi = () => (
  <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000" />
  </div>
);

const ErrorUi = (message: string) => (
  <div className="min-h-screen w-full p-4 flex items-center justify-center">
    <InputMessage message={message} />
  </div>
);
