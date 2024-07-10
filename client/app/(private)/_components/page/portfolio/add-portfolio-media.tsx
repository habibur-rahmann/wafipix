import { Button } from "@/components/ui/button";
import { FC, useEffect, useState } from "react";
import PortfolioMediaDialog from "./portfolio-media-dialog";
import { useAddMediaToPortfolioMutation } from "@/components/hooks/react-query/portfolios/mutations";
import { useCurrentuser } from "@/components/hooks/use-current-user";
import { useToast } from "@/components/ui/use-toast";
import { socket } from "@/lib/socket.io";
import { useQueryClient } from "@tanstack/react-query";

interface AddPortfolioMediaProps {
  portfolio_id: string;
}

const AddPortfolioMedia: FC<AddPortfolioMediaProps> = ({ portfolio_id }) => {
  const [isOpenDialog, setOpenDialog] = useState<boolean>(false);
  const [mediaUploadJobId, setMediaUploadJobId] = useState<string | null>(null);
  const [mediaUploadStatus, setMediaUploadStatus] = useState<
    "pending" | "failed" | "success" | null
  >(null);
  const [mediaUploadProgress, setMediaUploadProgress] = useState<number>(0);

  const user = useCurrentuser();

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const {
    mutate: AddMediaMutate,
    data: addMediaData,
    isSuccess: isAddMediaSuccess,
    isPending: isAddMediaPending,
    isError: isAddMediaError,
    error: addMediaError,
  } = useAddMediaToPortfolioMutation();

  const handleOpenDialog = (value: boolean) => setOpenDialog(value);

  const handleSave = (data: any) => {
    // upload media
    AddMediaMutate({
      id: portfolio_id,
      media: data?.media,
      view_size: data?.view_size,
      accesToken: user?.accessToken!,
    });
  };

  // add media mutation response effect
  useEffect(() => {
    if (isAddMediaSuccess && addMediaData?.success) {
      toast({
        title: "Media started uploading!",
        description: "A media is started uploas to add this portfolio.",
      });
      setMediaUploadJobId(addMediaData.jobId);
      setMediaUploadStatus("pending");
    }
    if (
      (isAddMediaError && addMediaError) ||
      (!addMediaData?.success && addMediaData?.message)
    ) {
      toast({
        variant: "destructive",
        title: "Media added failed!",
        description: addMediaError?.message || addMediaData?.message,
      });
      setMediaUploadJobId(null);
      setMediaUploadStatus("failed");
      setMediaUploadProgress(0);
    }
  }, [
    isAddMediaError,
    isAddMediaSuccess,
    isAddMediaPending,
    addMediaError,
    toast,
    addMediaData,
  ]);

  // socket effect
  useEffect(() => {
    if (!mediaUploadJobId) return;

    const handleProgress = (progressData: { progress: number }) => {
      setMediaUploadProgress(progressData.progress);
    };
    const handleStatus = (statusData: { status: "failed" | "success" }) => {
      setMediaUploadStatus(statusData.status);
    };

    socket.on(`progress:${mediaUploadJobId}`, handleProgress);
    socket.on(`status:${mediaUploadJobId}`, handleStatus);

    // Cleanup function
    return () => {
      socket.off("media_upload_progress", handleProgress);
    };
  }, [mediaUploadJobId]);

  // socket status effect
  useEffect(() => {
    if (mediaUploadStatus === "failed") {
      toast({
        variant: "destructive",
        title: "Media added failed!",
        description: addMediaError?.message || addMediaData?.message,
      });
      setMediaUploadJobId(null);
      setMediaUploadStatus("failed");
      setMediaUploadProgress(0);
    }
    if (mediaUploadStatus === "success") {
      toast({
        title: "Media uploaded",
        description: "A media is started uploas to add this portfolio.",
      });
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      setOpenDialog(false);
      setMediaUploadProgress(0);
      setMediaUploadJobId(null);
      setMediaUploadStatus(null);
    }
  }, [mediaUploadStatus, addMediaData, addMediaError, toast, queryClient]);

  return (
    <PortfolioMediaDialog
      open={isOpenDialog}
      onOpenChange={handleOpenDialog}
      isPending={isAddMediaPending}
      onSave={handleSave}
      portfolio_id={portfolio_id}
      uploadStatus={mediaUploadStatus}
      progress={mediaUploadProgress}
    >
      <Button size={"lg"}>Add media</Button>
    </PortfolioMediaDialog>
  );
};

export default AddPortfolioMedia;
