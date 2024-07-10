"use client";
import InputMessage from "@/components/global/input-message";
import { useDeletePortfolioMutation } from "@/components/hooks/react-query/portfolios/mutations";
import { usePortfoliosForCardAll } from "@/components/hooks/react-query/portfolios/queries";
import { useCurrentuser } from "@/components/hooks/use-current-user";
import PortfolioCard from "@/components/pages/portfolio/portfolio-card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { FC, useEffect } from "react";

interface PortfolioCardsProps {}

const PortfolioCards: FC<PortfolioCardsProps> = ({}) => {
  const user = useCurrentuser();

  const { toast } = useToast();

  const { data, isLoading, isError, error } = usePortfoliosForCardAll();
  const {
    mutate,
    data: mutateData,
    isPending,
    isSuccess: isMutateSuccess,
    isError: isMutateError,
    error: mutateError,
  } = useDeletePortfolioMutation();

  const deleteHandle = (portfolio_id: string) => {
    if (!portfolio_id) return toast({ title: "Portfolio id required!" });

    mutate({
      id: portfolio_id,
      accessToken: user?.accessToken!,
    });
  };

  // delete mutate response effect
  useEffect(() => {
    if (isMutateSuccess) {
      toast({
        title: "Portfolio deleted successfull.",
        description: "Portfolio is deleted successfully.",
      });
    }
    if (
      (isMutateError && mutateError?.message) ||
      (!mutateData?.success && mutateData?.message)
    ) {
      toast({
        variant: "destructive",
        title: "Failed to delete portfolio.",
        description: mutateError?.message || mutateData?.message,
      });
    }
  }, [isMutateSuccess, isMutateError, mutateError, mutateData, toast]);

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return (
      <div>
        <InputMessage message={error.message} />
      </div>
    );

  const Cards = data?.portfolios?.map((portfolio) => {
    return (
      <div
        key={portfolio._id}
        className={cn("relative bg-secondary", {
          "animate-pulse duration-1000": isPending,
        })}
      >
        <Button
          onClick={() => deleteHandle(portfolio?._id)}
          variant={"secondary"}
          size={"icon"}
          className="absolute top-2 right-2 z-20 group"
        >
          <Trash2 className="h-6 w-6 text-red-400 group-hover:text-red-500 duration-1000" />
        </Button>
        <PortfolioCard preSlug="/dashboard/portfolios" portfolio={portfolio} />
      </div>
    );
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Cards}
    </div>
  );
};

export default PortfolioCards;
