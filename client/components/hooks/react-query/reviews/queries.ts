import {
  fetchFeaturedReviews,
  fetchReviewsToView,
  fetchUserReviews,
  getAllReviews,
  getReviewStatus,
} from "@/lib/services/reviews.service";
import { AllReview, ReviewForCard, ReviewStatus } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export const useReviews = () => {
  return useQuery<{
    success: boolean;
    reviews: ReviewForCard[];
  }>({
    queryKey: ["reviews", "reviews"],
    queryFn: fetchReviewsToView,
  });
};

export const useAllReviews = (accessToken: string) => {
  return useQuery<{
    success: boolean;
    reviews: AllReview[];
  }>({
    queryKey: ["reviews", "all_reviews"],
    queryFn: () => getAllReviews(accessToken),
  });
};

export const useFeaturedReviews = () => {
  return useQuery<{
    success: boolean;
    reviews: ReviewForCard[];
  }>({
    queryKey: ["reviews", "featuredReviews"],
    queryFn: fetchFeaturedReviews,
  });
};

export const useReviewStatus = ({
  accessToken,
  review_id,
}: {
  accessToken: string;
  review_id: string;
}) => {
  return useQuery<{
    success: true;
    message?: string;
    review_status: ReviewStatus;
  }>({
    queryKey: ["reviews", "review_status", `review_status-${review_id}`],
    queryFn: () => getReviewStatus({ review_id, accessToken }),
    enabled: !!review_id,
  });
};

export const useUserReviews = (accessToken: string) => {
  return useQuery<{
    success: boolean;
    reviews: ReviewForCard[];
  }>({
    queryKey: ["reviews", "user", "user_reviews"],
    queryFn: () => fetchUserReviews(accessToken!),
    enabled: !!accessToken,
  });
};
