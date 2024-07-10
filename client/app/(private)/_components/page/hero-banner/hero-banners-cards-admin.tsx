import { FC } from "react";
import HeroBannerCardAdmin from "./hero-banner-card-admin";
import { useHeroBannersToViewCard } from "@/components/hooks/react-query/hero-banners/queries";
import InputMessage from "@/components/global/input-message";

interface HeroBannerCardsAdminProps {}

const HeroBannerCardsAdmin: FC<HeroBannerCardsAdminProps> = ({}) => {
  const { data, isLoading, isSuccess, isError, error } =
    useHeroBannersToViewCard();

  if (isLoading)
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LoadingBannerCard />
        <LoadingBannerCard />
        <LoadingBannerCard />
        <LoadingBannerCard />
        <LoadingBannerCard />
        <LoadingBannerCard />
        <LoadingBannerCard />
      </div>
    );

  if ((isError && error?.message) || (!data?.success && (data as any)?.message))
    return ErrorUi(error?.message || (data as any)?.message);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {data?.banners?.length ? (
        data?.banners?.map((banner) => {
          return <HeroBannerCardAdmin key={banner?._id} data={banner} />;
        })
      ) : (
        <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <p className="text-xl lg:text-2xl text-muted-foreground text-center">
            No banner added yet!. Please add a banner.
          </p>
        </div>
      )}
    </div>
  );
};

export default HeroBannerCardsAdmin;

const LoadingBannerCard = () => (
  <div className="h-14 animate-pulse duration-1000 w-full flex items-center justify-between bg-secondary px-4 py-2"></div>
);

const ErrorUi = (message: string) => (
  <div className="w-full h-fit p-8 flex items-center justify-center">
    <InputMessage message={message} />
  </div>
);
