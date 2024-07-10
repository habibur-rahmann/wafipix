import CustomerReviewCard from "@/components/pages/reviews/review-card";
import { AllReview } from "@/types/types";
import { FC, useEffect, useState } from "react";
import ReviewStatusEditFormDialogAdmin from "./review-status-edit-form-dialog-admin";
import {
  useDeleteReview,
  useUpdateReviewStatus,
} from "@/components/hooks/react-query/reviews/mutations";
import { useReviewStatus } from "@/components/hooks/react-query/reviews/queries";
import { useToast } from "@/components/ui/use-toast";
import { useCurrentuser } from "@/components/hooks/use-current-user";

interface CustomerReviewCardAdminProps {
  review: AllReview;
}

const CustomerReviewCardAdmin: FC<CustomerReviewCardAdminProps> = ({
  review,
}) => {
  const [isOpenOptions, setOpenOptions] = useState<boolean>(false);

  const onOpenChange = (value: boolean) => {
    setOpenOptions(value);
  };

  const user = useCurrentuser();

  const { toast } = useToast();

  const { data, isSuccess, isLoading, isError, error } = useReviewStatus({
    review_id: review?._id,
    accessToken: user?.accessToken!,
  });

  const {
    mutate,
    data: mutateData,
    isPending,
    isSuccess: isMutateSuccess,
    isError: isMutateError,
    error: mutateError,
  } = useUpdateReviewStatus();
  const {
    mutate: deleteMutate,
    data: deleteData,
    isSuccess: isDeleteSuccess,
    isPending: isDeleting,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteReview();

  const submitHandle = (status: { active: boolean; featured: boolean }) => {
    if (!status)
      return toast({
        variant: "destructive",
        title: "Status required!",
      });

    mutate({
      status,
      review_id: review?._id,
      accessToken: user?.accessToken!,
    });
  };

  const deleteHandle = (review_id: string) => {
    if (!review_id)
      return toast({
        variant: "destructive",
        title: "Review id required!",
      });

    deleteMutate({
      review_id,
      accessToken: user?.accessToken!,
    });
  };

  // mutate effect
  useEffect(() => {
    if (isMutateSuccess) {
      toast({
        title: "Saved review status",
        description: "Review status updated successfully.",
      });
    }
    if (
      (isMutateError && mutateError?.message) ||
      (!mutateData?.success && mutateData?.message)
    ) {
      toast({
        variant: "destructive",
        title: "Failed to save.",
        description: mutateError?.message || mutateData?.message,
      });
    }
  }, [isMutateError, isMutateSuccess, mutateError, toast, mutateData]);

  // delete effect
  useEffect(() => {
    if (isDeleteSuccess) {
      toast({
        title: "Review deleted.",
        description: "Review deleted successfully.",
      });
      onOpenChange(false);
    }
    if (
      (isDeleteError && deleteError?.message) ||
      (!deleteData?.success && deleteData?.message)
    ) {
      toast({
        variant: "destructive",
        title: "Failed to save.",
        description: deleteError?.message || deleteData?.message,
      });
    }
  }, [isDeleteError, isDeleteSuccess, deleteError, toast, deleteData]);

  return (
    <>
      <CustomerReviewCard
        active={review?.active}
        onEdit={() => {
          onOpenChange(true);
        }}
        review={review}
      />
      {data?.review_status ? (
        <ReviewStatusEditFormDialogAdmin
          open={isOpenOptions}
          onOpenChange={onOpenChange}
          submitHandle={submitHandle}
          deleteHandle={() => deleteHandle(review?._id)}
          isDeleting={isDeleting}
          isPending={isPending}
          statusData={{
            active: data?.review_status?.active!,
            featured: data?.review_status?.featured!,
          }}
        />
      ) : null}
    </>
  );
};

export default CustomerReviewCardAdmin;
