import {
  fetchServiceTextsAdmin,
  fetchServicesForCard,
  getServiceRelatedPortfolios,
  getServiceRelatedServices,
} from "@/lib/services/serivces.services";
import {
  PortfolioForCard,
  ServiceForCard,
  ServiceTextsAdmin,
} from "@/types/types";
import { useQuery } from "@tanstack/react-query";

// get card services
export const useServicesForCard = () =>
  useQuery<{
    success: boolean;
    services: ServiceForCard[];
  }>({
    queryKey: ["services", "card_services"],
    queryFn: fetchServicesForCard,
  });

// get service texts for admin
export const useServiceTextsAdmin = (slug: string) =>
  useQuery<{
    success: boolean;
    service: ServiceTextsAdmin;
  }>({
    queryKey: ["services", "service_texts"],
    queryFn: () => fetchServiceTextsAdmin(slug),
    enabled: !!slug,
  });

// get related portfolios of services
export const useServiceRelatedPortfolios = (slug: string) => {
  return useQuery<{
    success: boolean;
    related_portfolios: PortfolioForCard[];
  }>({
    queryKey: [
      "related_portfolios_of_service",
      `related_portfolios_of_service-${slug}`,
    ],
    queryFn: () => getServiceRelatedPortfolios(slug),
    enabled: !!slug,
  });
};

// get related servcies of services
export const useServiceRelatedServices = (slug: string) => {
  return useQuery<{
    success: boolean;
    related_services: ServiceForCard[];
  }>({
    queryKey: [
      "related_services_of_service",
      `related_services_of_service-${slug}`,
    ],
    queryFn: () => getServiceRelatedServices(slug),
    enabled: !!slug,
  });
};
