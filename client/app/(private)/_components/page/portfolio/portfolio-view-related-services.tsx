import { FC, useEffect } from "react";
import RelatedItemCard from "./related-item-card";
import AddRelatedPortfoliosDialog from "./add-related-portfolios-dialog";
import {
  usePortfoliosForCard,
  usePortfolioRelatedServices,
} from "@/components/hooks/react-query/portfolios/queries";
import ButtonLoader from "@/components/global/button-loader";
import {
  useRemoveRelatedPortfolioFromPortfolioMutation,
  useRemoveRelatedServiceFromPortfolioMutation,
} from "@/components/hooks/react-query/portfolios/mutations";
import { useCurrentuser } from "@/components/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useServicesForCard } from "@/components/hooks/react-query/services/queries";
import AddRelatedServicesDialog from "./add-related-services-dialog";

interface PortfolioViewRelatedServicesProps {
  slug: string;
  portfolio_id: string;
}

const PortfolioViewRelatedServices: FC<PortfolioViewRelatedServicesProps> = ({
  slug,
  portfolio_id,
}) => {
  const user = useCurrentuser();

  const { toast } = useToast();

  const { data, isLoading, isError, error } = useServicesForCard();

  const {
    data: relatedServicesData,
    isLoading: isRelatedServicesLoading,
    error: relatedServicesError,
  } = usePortfolioRelatedServices(slug);

  const {
    mutate,
    data: removeData,
    isPending: isRemovePending,
    isSuccess: isRemoveSuccess,
    isError: isRemoveError,
    error: removeError,
  } = useRemoveRelatedServiceFromPortfolioMutation();

  const removeRelatedServiceHandle = (id: string) => {
    mutate({
      id: portfolio_id,
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
          <AddRelatedServicesDialog
            items={filterdServices}
            portfolio_id={portfolio_id}
          >
            <span className="text-xl p-3 px-6 rounded bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer duration-100">
              Add related service
            </span>
          </AddRelatedServicesDialog>
        )}
      </div>
    </div>
  );
};

export default PortfolioViewRelatedServices;
