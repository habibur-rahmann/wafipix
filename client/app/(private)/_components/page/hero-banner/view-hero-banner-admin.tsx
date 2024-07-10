"use client";

import { FC } from "react";
import HeroBannerConfigForm from "./hero-banner-config-form";
import { useHeroBannerConfig } from "@/components/hooks/react-query/hero-banners/queries";
import InputMessage from "@/components/global/input-message";

interface ViewHeroBannerAdminProps {
  id: string;
}

const ViewHeroBannerAdmin: FC<ViewHeroBannerAdminProps> = ({ id }) => {
  const { data, isLoading, isSuccess, isError, error } =
    useHeroBannerConfig(id);

  if (isLoading) return LoadingUi();
  if ((isError && error?.message) || (!data?.success && (data as any)?.message))
    return ErrorUi(error?.message || (data as any)?.message);
  return (
    <div className="p-4">
      <HeroBannerConfigForm data={data?.config!} />
    </div>
  );
};

export default ViewHeroBannerAdmin;

const LoadingUi = () => <div>Loading..</div>;
const ErrorUi = (message: string) => (
  <div>
    <InputMessage message={message} />
  </div>
);
