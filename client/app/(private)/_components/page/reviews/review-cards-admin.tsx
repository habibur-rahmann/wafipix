"use client";

import InputMessage from "@/components/global/input-message";
import { useAllReviews } from "@/components/hooks/react-query/reviews/queries";
import { FC } from "react";
import { useCurrentuser } from "@/components/hooks/use-current-user";
import CustomerReviewCardAdmin from "./customer-review-card-admin";

interface ReviewCardsAdminProps {}

const ReviewCardsAdmin: FC<ReviewCardsAdminProps> = ({}) => {
  const user = useCurrentuser();

  const { data, isError, isLoading, error } = useAllReviews(user?.accessToken!);

  if (isLoading) return <div className="p-4">Loading...</div>;
  if ((isError && error?.message) || (!data?.success && (data as any)?.message))
    return (
      <div className="p-4">
        <InputMessage message={error?.message || (data as any)?.message} />
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.reviews?.length ? (
        data?.reviews?.map((review) => {
          return <CustomerReviewCardAdmin key={review?._id} review={review} />;
        })
      ) : (
        <div className="h-full w-full flex items-center justify-center col-span-1 md:col-span-2 lg:col-span-3">
          <p className="text-xl lg:text-2x text-muted-foreground">
            Currently no reviews added.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewCardsAdmin;
