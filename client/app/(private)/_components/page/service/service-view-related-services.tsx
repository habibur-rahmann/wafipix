'use client'
import { FC, useEffect } from "react";
import RelatedItemCard from "../portfolio/related-item-card";
import ButtonLoader from "@/components/global/button-loader";
import { useCurrentuser } from "@/components/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useServiceRelatedServices, useServicesForCard } from "@/components/hooks/react-query/services/queries";
import { useRemoveRelatedServiceFromServiceMutation } from "@/components/hooks/react-query/services/mutations";
import AddServiceRelatedServicesDialog from "./add-service-related-service-dialog";

interface ServiceViewRelatedServicesProps {
  slug: string;
}

const ServiceViewRelatedServices: FC<ServiceViewRelatedServicesProps> = ({
  slug,
}) => {
  const user = useCurrentuser();

  const { toast } = useToast();

  const { data, isLoading, isError, error } = useServicesForCard();

  const {
    data: relatedServicesData,
    isLoading: isRelatedServicesLoading,
    error: relatedServicesError,
  } = useServiceRelatedServices(slug);

  const {
    mutate,
    data: removeData,
    isPending: isRemovePending,
    isSuccess: isRemoveSuccess,
    isError: isRemoveError,
    error: removeError,
  } = useRemoveRelatedServiceFromServiceMutation();

  const removeRelatedServiceHandle = (id: string) => {
    mutate({
      slug: slug,
      related_service_id: id,
      accessToken: user?.accessToken!,
    });
  };

  const filterdServices =
    data?.services?.filter((item) => {
      let notAdded: boolean = true;
      if (relatedServicesData?.related_services) {
        for (let relatedItem of relatedServicesData?.related_services!) {
          if (relatedItem._id === item._id) notAdded = false;
        }
      }
      return notAdded;
    }) || [];

  useEffect(() => {
    if (isRemoveSuccess && removeData?.success) {
      toast({
        title: "Service Removed!",
        description:
          "Related Service removed from this portfolio successfully!",
      });
    }
    if (isRemoveError || (removeData && !removeData?.success)) {
      toast({
        variant: "destructive",
        title: "Service Removed Failed!",
        description: removeError?.message || removeData?.message,
      });
    }
  }, [
    isRemovePending,
    isRemoveSuccess,
    isRemoveError,
    removeError,
    toast,
    removeData,
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl">Related services</h1>
      <div
        className={cn("space-y-4", {
          "animate-pulse duration-1000": isRemovePending,
        })}
      >
        {relatedServicesData?.related_services?.map((service) => {
          return (
            <RelatedItemCard
              key={`related_service_of_portfolio${service?._id}`}
              item={service}
              onActionClick={removeRelatedServiceHandle}
            />
          );
        })}

        {isLoading ? (
          <ButtonLoader text="Portfolios fetching..." />
        ) : (
          <AddServiceRelatedServicesDialog
            items={filterdServices}
            slug={slug}
          >
            <span className="text-xl p-3 px-6 rounded bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer duration-100">
              Add related service
            </span>
          </AddServiceRelatedServicesDialog>
        )}
      </div>
    </div>
  );
};

export default ServiceViewRelatedServices;
