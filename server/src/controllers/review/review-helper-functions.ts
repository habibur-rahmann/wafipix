import { ApiError } from "../../lib/custom-api-error-class";
import { ReviewModel } from "../../models/review.model";
import { User } from "../../models/user.model";

interface ReviewQueryOptions {
  limit: number;
  skip: number;
  sort: { [field: string]: "asc" | "desc" };
  select: [string];
  populate: [string];
}

export const getAllReviews = async (options?: ReviewQueryOptions) => {
  return await ReviewModel.find()
    .populate(options?.populate!)
    .select(options?.select!)
    .sort(options?.sort!)
    .skip(options?.skip!)
    .limit(options?.limit!);
};

export const getReview = async (id: string, options?: ReviewQueryOptions) => {
  if (!id) throw new ApiError("Review Id not found", 404);

  const review = await ReviewModel.findById(id)
    .populate(options?.populate!)
    .select(options?.select!);
  if (!review) throw new ApiError("Review not found", 404);

  return review;
};
