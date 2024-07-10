"use client";
import { FC } from "react";
import CustomerReviewCard from "@/components/pages/reviews/review-card";
import CollapseBox from "@/components/global/collapse-box";
import { reviewsLoadingUi } from "./reviews-loading-ui";
import InputMessage from "@/components/global/input-message";
import { useStore } from "@/components/hooks/zustant/store";
import { ReviewForCard } from "@/types/types";
import { useCurrentuser } from "@/components/hooks/use-current-user";
import { useUserReviews } from "@/components/hooks/react-query/reviews/queries";
interface MyReviewsProps {}

const MyReviews: FC<MyReviewsProps> = ({}) => {
  const { setOpenAddReviewForm, setReview } = useStore();
  const user = useCurrentuser();

  const { data, isLoading, isError, error } = useUserReviews(
    user?.accessToken!
  );

  const handleOnEdit = (review: ReviewForCard) => {
    setReview(review);
    setOpenAddReviewForm(true);
  };

  if (!data?.reviews || isLoading)
    return (
      <CollapseBox className="bg-none" heading="My reviews">
        <div className="py-4">{reviewsLoadingUi}</div>
      </CollapseBox>
    );

  if (isError)
    return (
      <CollapseBox className="bg-none" heading="My reviews">
        <div className="min-h-[400px] w-full flex items-center justify-center">
          <InputMessage message={error?.message} />
        </div>{" "}
      </CollapseBox>
    );

  if (!data?.reviews) {
    return (
      <CollapseBox className="bg-none" heading="My reviews">
        {" "}
        <div className="min-h-[400px] w-full flex items-center justify-center">
          <p className="italic">
            Currently you do not added any reviews. kindly add a review!
          </p>
        </div>{" "}
      </CollapseBox>
    );
  }

  return (
    <div>
      <CollapseBox className="bg-none" heading="My reviews">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
          {data?.reviews.map((review) => {
            return (
              <CustomerReviewCard
                key={review?._id}
                border={false}
                shadow={true}
                onEdit={() => handleOnEdit(review)}
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
      </CollapseBox>
    </div>
  );
};

export default MyReviews;
