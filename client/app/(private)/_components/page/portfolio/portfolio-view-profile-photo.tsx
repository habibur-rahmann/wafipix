import ButtonLoader from "@/components/global/button-loader";
import { useUpdatePortfolioProfileMutation } from "@/components/hooks/react-query/portfolios/mutations";
import { usePortfolioProfile } from "@/components/hooks/react-query/portfolios/queries";
import { useCurrentuser } from "@/components/hooks/use-current-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { socket } from "@/lib/socket.io";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";

interface PortfolioViewProfilePhotoProps {
  slug: string;
  portfolio_id: string;
}

const PortfolioViewProfilePhoto: FC<PortfolioViewProfilePhotoProps> = ({
  portfolio_id,
  slug,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [newImage, setNewImage] = useState<File | null>(null);

  const [updateJobId, setUpdateJobId] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<
    "failed" | "success" | "pending" | null
  >(null);

  const queryClient = useQueryClient();

  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { toast } = useToast();

  const user = useCurrentuser();

  const { data: profileData, isLoading } = usePortfolioProfile(slug);

  const {
    mutate,
    data: mutateData,
    isPending,
    isError: isUpdateProfileError,
    isSuccess: isUpdateProfileSuccess,
    error: updateProfileError,
  } = useUpdatePortfolioProfileMutation();

  const inputElementClickHanlde = () => {
    if (inputRef?.current) {
      inputRef.current.click();
    }
  };

  const inputChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target.files) {
      setNewImage(e?.target?.files[0]);
    }
  };

  const cancelHandle = () => {
    if (newImage) {
      inputRef?.current ? (inputRef.current.value = "") : null;
      setNewImage(null);
    }
  };

  const saveHandle = () => {
    if (!newImage) return;
    mutate({
      id: portfolio_id,
      accessToken: user?.accessToken!,
      profile_image: newImage!,
    });
  };

  const imageSrc = newImage
    ? URL.createObjectURL(newImage)
    : profileData?.profile_image?.secure_url || "";
  const imageWidth = newImage ? 300 : profileData?.profile_image?.width || 300;
  const imageHeight = newImage
    ? 300
    : profileData?.profile_image?.height || 300;

  // mutate response effect
  useEffect(() => {
    if (isUpdateProfileSuccess && mutateData?.success) {
      toast({
        title: "Uploading...",
        description: "Uploading new profile image",
      });
      setUpdateStatus("pending");
      setUpdateJobId(mutateData?.jobId);
    }
    if (
      (isUpdateProfileError && updateProfileError?.message) ||
      (!mutateData?.success && mutateData?.message)
    ) {
      toast({
        title: "Profile udpate failed!",
        description: updateProfileError?.message || mutateData?.message,
      });
    }
  }, [
    isUpdateProfileError,
    isUpdateProfileSuccess,
    updateProfileError,
    mutateData,
    toast,
  ]);

  // mutate socket response effect
  useEffect(() => {
    const handleStatusData = (statusData: {
      status: "pending" | "failed" | "success";
    }) => setUpdateStatus(statusData?.status);

    const handleProgressData = (progressData: { progress: number }) =>
      setUploadProgress(progressData?.progress);

    socket.on(`status:${updateJobId}`, handleStatusData);
    socket.on(`progress:${updateJobId}`, handleProgressData);
  }, [updateJobId]);

  // socket status effect
  useEffect(() => {
    if (updateStatus === "failed") {
      toast({
        variant: "destructive",
        title: "Profile image upload failed!",
        description: updateProfileError?.message || mutateData?.message,
      });
      setUpdateJobId(null);
      setUpdateStatus("failed");
      setUploadProgress(0);
    }
    if (updateStatus === "success") {
      toast({
        title: "Profile image uploaded",
        description: "Profile image upload successfull.",
      });
      queryClient.invalidateQueries({
        queryKey: ["portfolios", "portfolio_profile"],
      });

      if (inputRef?.current) {
        inputRef.current.value = "";
        setNewImage(null);
      }

      setUploadProgress(0);
      setUpdateJobId(null);
      setUpdateStatus(null);
    }
  }, [updateStatus, mutateData, updateProfileError, toast, queryClient]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl">Profile Photo</h1>
      <div className="h-full w-full space-y-2">
        <div className="h-72 w-72 relative">
          {updateStatus === "pending" ? (
            <div className="absolute h-full w-full top-0 left-0 z-20 flex items-center justify-center bg-secondary">
              <span className="text-lg text-emerald-400 font-semibold">
                {uploadProgress + " " + "%"}
              </span>
            </div>
          ) : null}
          <div
            onClick={inputElementClickHanlde}
            className="h-full w-full absolute top-0 left-0 bg-primary/50 z-10 cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 duration-100"
          >
            <span className="font-semibold text-lg text-primary-foreground">
              Change profile
            </span>
          </div>
          {isLoading ? (
            <div className="h-full w-full bg-secondary animate-pulse duration-1000" />
          ) : imageSrc ? (
            <Image
              src={imageSrc}
              height={imageHeight}
              width={imageWidth}
              alt="Portfolio Profile Photo"
              className="object-cover"
            />
          ) : (
            <span className="h-full w-full flex items-center justify-center">
              Please add a prfile Image
            </span>
          )}
        </div>
        <Input
          onChange={inputChangeHandle}
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
        />
        {newImage ? (
          <div className="flex w-72 gap-4 items-center">
            <Button
              onClick={saveHandle}
              disabled={isPending || updateStatus === "pending"}
              className="w-full"
            >
              {updateStatus === "pending" ? (
                <ButtonLoader text="Saving..." />
              ) : (
                "Save"
              )}
            </Button>
            <Button
              disabled={isPending || updateStatus === "pending"}
              onClick={cancelHandle}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PortfolioViewProfilePhoto;
