import {
  getHeroBannerConfig,
  getHeroBannerToView,
  getHeroBannerToViewCard,
} from "@/lib/services/heroBanner.service";
import {
  HeroSliderConfig,
  HeroSlidersView,
  HeroSlidersViewCard,
} from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export const useHeroBannersToView = () => {
  return useQuery<{ success: boolean; banners: HeroSlidersView[] }>({
    queryKey: ["hero_banners", "hero_banners_to_view"],
    queryFn: getHeroBannerToView,
  });
};

export const useHeroBannersToViewCard = () => {
  return useQuery<{ success: boolean; banners: HeroSlidersViewCard[] }>({
    queryKey: ["hero_banners", "hero_banners_to_view_card"],
    queryFn: getHeroBannerToViewCard,
  });
};

export const useHeroBannerConfig = (id: string) => {
  return useQuery<{ success: boolean; config: HeroSliderConfig }>({
    queryKey: ["hero_banner_config", `hero_banner_config_${id}`],
    queryFn: () => getHeroBannerConfig(id),
    enabled: !!id,
  });
};
