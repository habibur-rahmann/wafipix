import {
  addMediaToPortfolio,
  addPortfolio,
  addRelatedPortfoliosToPortfolio,
  addRelatedServicesToPortfolio,
  deletePortfolio,
  removeMediaFromPortfolio,
  removeRelatedPortfolioFromPortfolio,
  removeRelatedServiceFromPortfolio,
  updatePortfolioProfile,
  updatePortfolioTexts,
} from "@/lib/services/portfolio.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddPortfolioMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });
};

export const usePortfolioTextMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["portfolios"],
    mutationFn: updatePortfolioTexts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });
};

export const useAddRelatedPortfoliosToPortfolioMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["portfolios"],
    mutationFn: addRelatedPortfoliosToPortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });
};

export const useRemoveRelatedPortfolioFromPortfolioMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["portfolios"],
    mutationFn: removeRelatedPortfolioFromPortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });
};

export const useAddRelatedServicesToPortfolioMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["portfolios"],
    mutationFn: addRelatedServicesToPortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });
};

export const useRemoveRelatedServiceFromPortfolioMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["portfolios"],
    mutationFn: removeRelatedServiceFromPortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });
};

export const useAddMediaToPortfolioMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["portfolios"],
    mutationFn: addMediaToPortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });
};

export const useRemoveMediaFromPortfolioMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["portfolios"],
    mutationFn: removeMediaFromPortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });
};

export const useUpdatePortfolioProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["portfolios", "portfolio_profile"],
    mutationFn: updatePortfolioProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["portfolios", "portfoli_profile"],
      });
    },
  });
};

export const useDeletePortfolioMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });
};
