import {
  fetchServiceForCard,
  fetchServiceForView,
  fetchServicesRelatedPortfolio,
} from "@/lib/services/serivces.services";
import {
  PortfolioForCard,
  ServiceForCard,
  ServiceForView,
} from "@/types/types";
import { useQuery } from "@tanstack/react-query";

interface ServiceHookProps {
  slug?: string;
}

export const useService = (props?: ServiceHookProps) => {
  const getServiceForView = useQuery<{
    success: boolean;
    service: ServiceForView;
  }>({
    queryKey: ["services", "view"],
    queryFn: () => fetchServiceForView(props?.slug!),
    enabled: !!props?.slug,
  });

  // get relatedPortfolios portfolios
  const getServicesRelatedPortfolios = useQuery<{
    success: boolean;
    related_portfolios: PortfolioForCard[];
  }>({
    queryKey: ["services", "related-portfolios"],
    queryFn: () => fetchServicesRelatedPortfolio(props?.slug!),
    enabled: !!props?.slug,
  });

  const getServiceForCard = useQuery<{
    success: boolean;
    services: ServiceForCard[];
  }>({
    queryKey: ["services", "card"],
    queryFn: fetchServiceForCard,
  });

  return {
    getServiceForView,
    getServicesRelatedPortfolios,
    getServiceForCard,
  };
};
