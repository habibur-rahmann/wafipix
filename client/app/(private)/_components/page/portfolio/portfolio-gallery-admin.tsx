"use client";
import VideoPlayer from "@/components/global/video-player";
import { useRemoveMediaFromPortfolioMutation } from "@/components/hooks/react-query/portfolios/mutations";
import { useCurrentuser } from "@/components/hooks/use-current-user";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Media } from "@/types/types";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { FC, useEffect } from "react";

interface PortfolioGalleryAdminProps {
  portfolio_id: string;
  medias: {
    _id: string;
    view_size: "full" | "half" | "three-fourth" | "quarter";
    media: Media;
  }[];
}

const PortfolioGalleryAdmin: FC<PortfolioGalleryAdminProps> = ({
  portfolio_id,
  medias,
}) => {
  const { toast } = useToast();

  const user = useCurrentuser();
  const { mutate, data, error, isSuccess, isPending, isError } =
    useRemoveMediaFromPortfolioMutation();

  const handleRemove = (medias_item_id: string) => {
    mutate({
      id: portfolio_id,
      medias_item_id,
      accesToken: user?.accessToken!,
    });
  };

  // mutate response effect
  useEffect(() => {
    if (isSuccess && data?.success) {
      toast({
        title: "Media deleted.",
        description: "A media deleted permanently!",
      });
    }
    if ((isError && error?.message) || (!data?.success && data?.message) ) {
      toast({
        title: "Failed to delete.",
        description: error?.message || data?.message,
      });
    }
  }, [data, isSuccess, error, isError, toast]);

  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-4 gap-4">
      {medias?.length
        ? medias?.map((item) => {
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
                className={cn(`${colSpan} h-full w-full relative group/grid`, {
                  "animate-pulse duration-1000": isPending,
                })}
              >
                {/* remove button */}
                <Button
                  onClick={() => handleRemove(item._id)}
                  disabled={isPending}
                  variant={"ghost"}
                  size={"icon"}
                  className="group/btn absolute top-2 right-2 z-20"
                >
                  <Trash2 className="h-6 w-6 text-primary/80 group-hover/btn:text-red-500 duration-100" />
                </Button>

                {/* image */}
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

export default PortfolioGalleryAdmin;
