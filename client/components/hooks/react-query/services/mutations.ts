import {
  addRelatedPortfoliosToService,
  addRelatedServicesToService,
  addService,
  deleteService,
  removeRelatedPortfolioFromService,
  removeRelatedServiceFromService,
  updateServiceTexts,
} from "@/lib/services/serivces.services";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useAddServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};

export const useServiceTextsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["services"],
    mutationFn: updateServiceTexts,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services", "service_texts"],
      });
    },
  });
};

export const useAddRelatedPortfoliosToServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["related_portfolios_of_service"],
    mutationFn: addRelatedPortfoliosToService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`related_portfolios_of_service`],
      });
    },
  });
};

export const useAddRelatedServicesToServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["related_services_of_service"],
    mutationFn: addRelatedServicesToService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["related_services_of_service"] });
    },
  });
};

export const useRemoveRelatedPortfolioFromServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["related_portfolios_of_service"],
    mutationFn: removeRelatedPortfolioFromService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["related_portfolios_of_service"] });
    },
  });
};

export const useRemoveRelatedServiceFromServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["related_services_of_service"],
    mutationFn: removeRelatedServiceFromService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["related_services_of_service"] });
    },
  });
};

export const useDeleteServiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};

