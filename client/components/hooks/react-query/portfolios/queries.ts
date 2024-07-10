import {
  getPortfoliosForCard,
  getPortfolioRelatedPortfolios,
  getPortfolioRelatedServices,
  getPortfolios,
  getPortfolio,
  getFeaturedPortfolios,
  getPortfolioTexts,
  getPortfolioMedias,
  getPortfolioProfile,
  getPortfoliosForCardAll,
} from "@/lib/services/portfolio.service";
import {
  FeaturedPortfolios,
  Media,
  Portfolio,
  PortfolioForCard,
  ServiceForCard,
} from "@/types/types";
import { useQuery } from "@tanstack/react-query";

// get all portfolios
export const useAllPortfolios = () =>
  useQuery({
    queryKey: ["portfolios"],
    queryFn: getPortfolios,
  });

// get single portfolio
export const usePortfolio = (slug: string) =>
  useQuery<{ success: boolean; portfolio: Portfolio }>({
    queryKey: ["portfolios", slug],
    queryFn: () => getPortfolio(slug),
    enabled: !!slug,
  });

export const usePortfolioTexts = (slug: string) => {
  return useQuery({
    queryKey: ["portfolios", slug],
    queryFn: () => getPortfolioTexts(slug),
    enabled: !!slug,
  });
};

export const usePortfolioMedias = (slug: string) => {
  return useQuery<{
    success: boolean;
    medias: {
      _id: string;
      media: Media;
      view_size: "full" | "half" | "quarter" | "three-fourth";
    }[];
    message: string;
  }>({
    queryKey: ["portfolios", "medias", slug],
    queryFn: () => getPortfolioMedias(slug),
    enabled: !!slug,
  });
};

// get featured portfolios
export const useFeaturedPortfolios = () =>
  useQuery<{
    success: boolean;
    featuredPortfolios: FeaturedPortfolios;
  }>({
    queryKey: ["portfolios", "featured-portfolios"],
    queryFn: getFeaturedPortfolios,
  });

// get card portfolios for card
export const usePortfoliosForCard = () =>
  useQuery<{
    success: boolean;
    portfolios: PortfolioForCard[];
  }>({
    queryKey: ["portfolios", "card-portfolios"],
    queryFn: getPortfoliosForCard,
  });

// get card portfolios for card
export const usePortfoliosForCardAll = () =>
  useQuery<{
    success: boolean;
    portfolios: PortfolioForCard[];
  }>({
    queryKey: ["portfolios", "all_portfolios_card"],
    queryFn: getPortfoliosForCardAll,
  });

// get related portfolios of portfolios
export const usePortfolioRelatedPortfolios = (slug: string) => {
  return useQuery<{
    success: boolean;
    related_portfolios: PortfolioForCard[];
  }>({
    queryKey: ["portfolios", "portfolios_related_portfolios"],
    queryFn: () => getPortfolioRelatedPortfolios(slug),
    enabled: !!slug,
  });
};

// get related services of portfolios
export const usePortfolioRelatedServices = (slug: string) => {
  return useQuery<{
    success: boolean;
    related_services: ServiceForCard[];
  }>({
    queryKey: ["portfolios", "portfolios_related_services"],
    queryFn: () => getPortfolioRelatedServices(slug),
    enabled: !!slug,
  });
};

// get portfolio image
export const usePortfolioProfile = (slug: string) => {
  return useQuery<{
    success: boolean;
    profile_image: Media;
  }>({
    queryKey: ["portfolios", "portfolio_profile"],
    queryFn: () => getPortfolioProfile(slug),
    enabled: !!slug,
  });
};
