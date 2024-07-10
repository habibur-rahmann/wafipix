import {
  createHeroBanner,
  removeHeroBanner,
  updateHeroBanner,
} from "@/lib/services/heroBanner.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddHeroBannerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["hero_banners"],
    mutationFn: createHeroBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero_banners"] });
    },
  });
};

export const useRemoveHeroBannerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["hero_banners"],
    mutationFn: removeHeroBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero_banners"] });
    },
  });
};

export const useUpdateHeroBannerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["hero_banners"],
    mutationFn: updateHeroBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero_banners"] });
    },
  });
};
