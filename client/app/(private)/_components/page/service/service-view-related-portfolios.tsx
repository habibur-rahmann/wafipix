'use client'

import { FC, useEffect } from "react";
import RelatedItemCard from "../portfolio/related-item-card";
import AddRelatedPortfoliosDialog from "../portfolio/add-related-portfolios-dialog";
import {
  usePortfoliosForCard,
} from "@/components/hooks/react-query/portfolios/queries";
import ButtonLoader from "@/components/global/button-loader";
import { useRemoveRelatedPortfolioFromPortfolioMutation } from "@/components/hooks/react-query/portfolios/mutations";
import { useCurrentuser } from "@/components/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useServiceRelatedPortfolios } from "@/components/hooks/react-query/services/queries";
import { useRemoveRelatedPortfolioFromServiceMutation } from "@/components/hooks/react-query/services/mutations";
import AddServiceRelatedPortfoliosDialog from "./add-service-related-portfolios-dialog";

interface ServiceViewRelatedPortfoliosProps {
  slug: string;
}

const ServiceViewRelatedPortfolios: FC<
  ServiceViewRelatedPortfoliosProps
> = ({ slug }) => {
  const user = useCurrentuser();

  const { toast } = useToast();

  const { data, isLoading, isError, error } = usePortfoliosForCard();

  const { data: relatedPorfoliosData, isLoading: isRelatedPortfoliosLoading } =
    useServiceRelatedPortfolios(slug);

  const {
    mutate,
    data: removeData,
    isPending: isRemovePending,
    isSuccess: isRemoveSuccess,
    isError: isRemoveError,
    error: removeError,
  } = useRemoveRelatedPortfolioFromServiceMutation();

  const removeRelatedPortfolioHandle = (id: string) => {
    mutate({
      slug,
      related_portfolio_id: id,
      accessToken: user?.accessToken!,
    });
  };

  const filterdPortfolios =
    data?.portfolios?.filter((item) => {
      let notAdded: boolean = true;
      if (relatedPorfoliosData?.related_portfolios) {
        for (let relatedItem of relatedPorfoliosData?.related_portfolios!) {
          if (relatedItem._id === item._id) notAdded = false;
        }
      }
      return notAdded;
    }) || [];

  useEffect(() => {
    if (isRemoveSuccess && removeData?.success) {
      toast({
        title: "Portfolio Removed!",
        description:
          "Related portfolio removed from this service successfully!",
      });
    }
    if (isRemoveError || (removeData && !removeData?.success)) {
      toast({
        variant: "destructive",
        title: "Portfolio Removed Failed!",
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
      <h1 className="text-xl">Related portfolios</h1>
      <div
        className={cn("space-y-4", {
          "animate-pulse duration-1000": isRemovePending,
        })}
      >
        {relatedPorfoliosData?.related_portfolios?.map((portfolio) => {
          return (
            <RelatedItemCard
              key={`related_portfolios_of_portfolio${portfolio?._id}`}
              item={portfolio}
              onActionClick={removeRelatedPortfolioHandle}
            />
          );
        })}

        {isLoading ? (
          <ButtonLoader text="Portfolios fetching..." />
        ) : (
          <AddServiceRelatedPortfoliosDialog
            items={filterdPortfolios}
            slug={slug}
          >
            <span className="text-lg p-3 px-6 rounded bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer duration-100">
              Add related portfolio
            </span>
          </AddServiceRelatedPortfoliosDialog>
        )}
      </div>
    </div>
  );
};

export default ServiceViewRelatedPortfolios;