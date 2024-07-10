"use client";

import ButtonLoader from "@/components/global/button-loader";
import { useRemoveHeroBannerMutation } from "@/components/hooks/react-query/hero-banners/mutations";
import { useCurrentuser } from "@/components/hooks/use-current-user";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { HeroSlidersViewCard } from "@/types/types";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { FC, useEffect } from "react";

interface HeroBannerCardAdminProps {
  data: HeroSlidersViewCard;
}

const HeroBannerCardAdmin: FC<HeroBannerCardAdminProps> = ({ data }) => {
  const { toast } = useToast();

  const user = useCurrentuser();

  const {
    mutate,
    data: mutateData,
    isPending,
    isError,
    isSuccess,
    error,
  } = useRemoveHeroBannerMutation();

  const deleteHandler = () => {
    if (!data?._id)
      return toast({
        variant: "destructive",
        title: "Banner id missing!",
        description: "Banner id is required to delete this banner.",
      });

    mutate({
      id: data?._id,
      accessToken: user?.accessToken!,
    });
  };

  // mutate response effect
  useEffect(() => {
    if (isSuccess && mutateData?.success) {
      toast({
        title: "Hero banner deleted.",
        description: "This hero banner is deleted successfully.",
      });
    }
    if (
      (isError && error?.message) ||
      (!mutateData?.success && mutateData?.message)
    ) {
      toast({
        variant: "destructive",
        title: "Failed to delete hero banner.",
        description: error?.message || mutateData?.message,
      });
    }
  }, [isSuccess, mutateData, toast, isError, error]);

  return (
    <div className="h-fit w-full flex items-center justify-between bg-secondary px-4 py-2">
      <div>
        <h1 className="text-lg lg:text-xl text-wrap">{data?.title}</h1>
      </div>
      <div className="flex items-center">
        <Button
          disabled={isPending}
          onClick={deleteHandler}
          variant={"secondary"}
        >
          {isPending ? (
            <ButtonLoader text="Deleting..." />
          ) : (
            <Trash2 className="h-6 w-6 text-primary hover:text-red-400 duration-100" />
          )}
        </Button>
        <Link href={`/dashboard/hero-banners/${data?._id}`}>
          <Button disabled={isPending} variant={"secondary"}>
            <Pencil className="h-6 w-6 text-primary hover:text-emerald-400 duration-100" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroBannerCardAdmin;
