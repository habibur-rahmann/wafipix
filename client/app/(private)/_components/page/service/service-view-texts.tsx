"use client";

import { FC, useEffect } from "react";
import ServiceViewFormTextsAdmin from "./service-view-form-texts-admin";
import { useServiceTextsAdmin } from "@/components/hooks/react-query/services/queries";
import InputMessage from "@/components/global/input-message";
import { useServiceTextsMutation } from "@/components/hooks/react-query/services/mutations";
import { useCurrentuser } from "@/components/hooks/use-current-user";
import { useToast } from "@/components/ui/use-toast";

interface ServiceViewTextsProps {
  slug: string;
}

const ServiceViewTexts: FC<ServiceViewTextsProps> = ({ slug }) => {
  const user = useCurrentuser();
  const { toast } = useToast();

  const { data, isLoading, isError, error } = useServiceTextsAdmin(slug);
  const {
    mutate,
    data: mutateData,
    isPending,
    isSuccess: isMutateSuccess,
    isError: isMutateError,
    error: mutateError,
  } = useServiceTextsMutation();

  const saveHandle = (submitData: any) => {
    if (!submitData) return;
    mutate({
      slug,
      accessToken: user?.accessToken!,
      serviceTexts: {
        title: submitData?.title!,
        description: submitData?.description!,
        short_description: submitData?.short_description!,
        featured: submitData?.featured!,
        active: submitData?.active!,
      },
    });
  };

  // mutate response effect
  useEffect(() => {
    if (isMutateSuccess) {
      toast({
        title: "Service updated.",
        description: "Service texts update successfull.",
      });
    }
    if (
      (isMutateError && mutateError?.message) ||
      (!mutateData?.success && mutateData?.message)
    ) {
      toast({
        variant: "destructive",
        title: "Service updated failed.",
        description: mutateError?.message || mutateData?.message,
      });
    }
  }, [isMutateSuccess, isMutateError, mutateData, mutateError, toast]);

  if (isLoading) return LoadingUi();
  if ((isError && error?.message) || (!data?.success && (data as any)?.message))
    return ErrorUi(error?.message || (data as any)?.message);
  return (
    <ServiceViewFormTextsAdmin
      isSaving={isPending}
      onSave={saveHandle}
      service={data?.service!}
    />
  );
};

export default ServiceViewTexts;

const LoadingUi = () => (
  <div>
    <h1>Loading...</h1>
  </div>
);

const ErrorUi = (message: string) => (
  <div>
    <InputMessage message={message} />
  </div>
);
