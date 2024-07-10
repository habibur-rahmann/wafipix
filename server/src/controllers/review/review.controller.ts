import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/async-handler";
import { cache, cacheKeys } from "../../lib/node-cache";
import {
  getAllReviews,
  getReview,
} from "./review-helper-functions";
import { ApiError } from "../../lib/custom-api-error-class";
import { RequestWithUser } from "../../../types/types";
import { UserModel } from "../../models/user.model";
import { ReviewModel } from "../../models/review.model";
import mongoose, { ObjectId } from "mongoose";
import { getAggregationFeaturedReviews } from "./get-aggregation-featured-reviews";
import { getAggregationReviewsForVeiw } from "./get-aggregation-reveiws-for-view";
import { getUserReviewsAggregation } from "./get-user-reviews-aggregation";

export const reviewController = {
  getReviews: asyncHandler(async (req: Request, res: Response) => {
    const reviews = await getAllReviews();

    res.status(200).json({ success: true, reviews: reviews });
  }),

  getReviewsForView: asyncHandler(async (req: Request, res: Response) => {
    const reviews = await ReviewModel.aggregate(getAggregationReviewsForVeiw());

    res.status(200).json({ success: true, reviews });
  }),

  getAllReviews: asyncHandler(async (req: Request, res: Response) => {
    const reviews = await ReviewModel.aggregate([
      {
        $match: {},
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $addFields: {
          user_picture: "$user.picture",
          user_name: "$user.name",
        },
      },
      {
        $project: {
          _id: 1,
          star: 1,
          text: 1,
          user_name: 1,
          user_picture: 1,
          active: 1,
          featured: 1,
        },
      },
    ]);

    res.status(200).json({ success: true, reviews });
  }),

  getUserReviewsForView: asyncHandler(
    async (req: RequestWithUser, res: Response) => {
      const reviews = await UserModel.aggregate(getUserReviewsAggregation(req));

      res.status(200).json({ success: true, reviews });
    }
  ),

  getFeaturedReviews: asyncHandler(async (req: Request, res: Response) => {
    const reviews = await ReviewModel.aggregate(
      getAggregationFeaturedReviews()
    );

    res.status(200).json({ success: true, reviews });
  }),

  getStatus: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    if (!id) throw new ApiError("Review Id is required!", 404);
    const review_status = (
      await ReviewModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $project: {
            _id: 1,
            active: 1,
            featured: 1,
          },
        },
      ])
    )[0];

    res.status(200).json({ success: true, review_status });
  }),

  getReview: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    // WORK: if any query filter then ignore to serve from cache ***
    const cachedReview = cache.get(cacheKeys.getSingleReviewKey(id));

    if (cachedReview)
      return res.status(200).json({ success: true, review: cachedReview });

    const review = await getReview(id);

    if (!review) throw new ApiError("Review not found!", 404);

    res.status(200).json({ success: true, review });

    // cache the review
    await cache.reviews.refreshReview(id);
  }),

  createReview: asyncHandler(async (req: RequestWithUser, res: Response) => {
    const { star, text } = req.body;
    const user = req.user;

    const review = await ReviewModel.create({
      user: user?._id,
      text,
      star: parseInt(star),
    });

    await UserModel.findByIdAndUpdate(user?._id, {
      $push: {
        reviews: review._id,
      },
    });

    res.status(201).json({ success: true, review });
  }),

  updateReview: asyncHandler(async (req: RequestWithUser, res: Response) => {
    const { id } = req.params as { id: string };
    const { star, text } = req.body;
    const user = req.user;

    if (!id) throw new ApiError("Id is required!", 404);
    if (!star || !text) throw new ApiError("star and text required!", 404);

    const isExist = await ReviewModel.findById(id);

    if (!isExist) throw new ApiError("Review not found!", 404);

    if (
      (isExist.user._id as ObjectId).toString() !==
      (user?._id as ObjectId).toString()
    ) {
      if (user?.role !== "ADMIN")
        throw new ApiError("You are not allowed to update!", 404);
    }

    const updatedReview = await ReviewModel.findByIdAndUpdate(
      id,
      {
        star,
        text,
      },
      { new: true }
    );

    if (!updatedReview) throw new ApiError("Review not found!", 404);

    res.status(200).json({ success: true, review: updatedReview });
  }),

  updateReviewStatus: asyncHandler(
    async (req: RequestWithUser, res: Response) => {
      const { id } = req.params as { id: string };
      const { status } = req.body;

      if (!id) throw new ApiError("Id is required!", 404);

      const isExist = await ReviewModel.findById(id);

      if (!isExist) throw new ApiError("Review not found!", 404);

      const updatedReview = await ReviewModel.findByIdAndUpdate(
        id,
        {
          active: status?.active,
          featured: status?.featured,
        },
        { new: true }
      );

      if (!updatedReview) throw new ApiError("Review not found!", 404);

      res.status(200).json({ success: true, review: updatedReview });
    }
  ),

  removeReview: asyncHandler(async (req: RequestWithUser, res: Response) => {
    const { id } = req.params as { id: string };
    const user = req.user;

    if (!id) throw new ApiError("Id is required!", 404);

    const isExist = await ReviewModel.findById(id);

    if (!isExist) throw new ApiError("Review not found!", 404);

    if (
      (isExist.user._id as ObjectId).toString() !==
      (user?._id as ObjectId).toString()
    ) {
      if (user?.role !== "ADMIN")
        throw new ApiError("You are not allowed to update!", 404);
    }

    const deletedReview = await ReviewModel.findByIdAndDelete(id);
    if (!deletedReview) throw new ApiError("Failed to delete review!", 404);

    res.status(200).json({ sucess: true });
  }),
};
