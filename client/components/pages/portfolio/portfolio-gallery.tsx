import InputMessage from "@/components/global/input-message";
import VideoPlayer from "@/components/global/video-player";
import { usePortfolioMedias } from "@/components/hooks/react-query/portfolios/queries";
import Image from "next/image";
import { FC } from "react";

interface PortfolioGalleryProps {
  slug: string;
}

const PortfolioGallery: FC<PortfolioGalleryProps> = ({ slug }) => {
  const { data, isLoading, isError, error } = usePortfolioMedias(slug);

  if (isLoading) return LoadingUi();
  if (isError || !data?.success)
    return ErrorUi(error?.message || data?.message!);
  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-4 gap-4">
      {data?.medias?.length
        ? data?.medias?.map((item) => {
            const colSpan =
              item?.view_size === "full"
                ? "md:col-span-4"
                : item?.view_size === "half"
                ? "md:col-span-2"
                : item?.view_size === "three-fourth"
                ? "md:col-span-3"
                : "md:col-span-1";

            return (
              <div
                key={item?.media?.public_id}
                className={` ${colSpan} h-full w-full relative`}
              >
                {item?.media?.content_type?.includes("image") ? (
                  <Image
                    src={item?.media?.secure_url?.toString()}
                    alt={"portfolio media"}
                    height={item?.media?.height || 1000}
                    width={item?.media?.width || 1000}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <VideoPlayer
                    sources={[
                      {
                        src: item?.media?.secure_url,
                        type: item?.media?.content_type,
                      },
                    ]}
                    isVolumeControl={false}
                  />
                )}
              </div>
            );
          })
        : null}
    </div>
  );
};

export default PortfolioGallery;

const LoadingUi = () => (
  <div className="min-h-screen w-full p-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000 lg:col-span-2" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000 lg:col-span-2" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000 lg:col-span-1" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000 lg:col-span-1" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000 lg:col-span-1" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000 lg:col-span-1" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000 lg:col-span-3" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000 lg:col-span-1" />
    <div className="h-72 w-full bg-secondary animate-pulse duration-1000 lg:col-span-4" />
  </div>
);

const ErrorUi = (message: string) => (
  <div className="min-h-screen w-full flex items-center justify-center">
    <InputMessage message={message} />
  </div>
);
