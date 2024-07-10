"use client";
import CollapseBox from "@/components/global/collapse-box";
import { FC } from "react";
import CustomerReviewCard from "./review-card";
import { reviewsLoadingUi } from "./reviews-loading-ui";
import InputMessage from "@/components/global/input-message";
import { useReviews } from "@/components/hooks/react-query/reviews/queries";

interface AllReviewsProps {}

const AllReviews: FC<AllReviewsProps> = ({}) => {
  const { data, isLoading, isError, error } = useReviews();

  return (
    <div>
      <CollapseBox className="bg-none" heading="All reviews">
        {isLoading ? (
          <div className="py-4">{reviewsLoadingUi}</div>
        ) : isError ? (
          <div className="min-h-[400px] w-full flex items-center justify-center">
            <InputMessage message={error.message} />
          </div>
        ) : !data?.reviews?.length ? (
          <div className="min-h-[400px] w-full flex items-center justify-center">
            <p className="italic">Currently no reviews added.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
            {data?.reviews.map((review) => {
              return (
                <CustomerReviewCard
                  key={review?._id}
                  border={false}
                  shadow={true}
                  review={{
                    _id: review?._id,
                    star: review?.star,
                    text: review?.text,
                    user_name: review?.user_name,
                    user_picture: review?.user_picture,
                  }}
                />
              );
            })}
          </div>
        )}
      </CollapseBox>
    </div>
  );
};

export default AllReviews;
