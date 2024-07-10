import { PipelineStage } from "mongoose";
import { RequestWithUser } from "../../../types/types";

export const getUserReviewsAggregation = (req: RequestWithUser) => {
  const user = req.user;
  const aggregation: PipelineStage[] = [
    {
      $match: {
        _id: user?._id,
      },
    },
    {
      $lookup: {
        from: "reviews",
        localField: "reviews",
        foreignField: "_id",
        as: "reviews",
      },
    },
    {
      $addFields: {
        reviews: {
          $map: {
            input: "$reviews",
            as: "review",
            in: {
              _id: "$$review._id",
              text: "$$review.text",
              star: "$$review.star",
              user_name: "$name",
              user_picture: "$picture",
            },
          },
        },
      },
    },

    {
      $project: {
        _id: 0,
        reviews: 1,
      },
    },
    {
      $unwind: "$reviews",
    },

    {
      $project: {
        _id: "$reviews._id",
        text: "$reviews.text",
        star: "$reviews.star",
        user_name: "$reviews.user_name",
        user_picture: "$reviews.user_picture",
        createdAt: "$reviews.createdAt",
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        createdAt: 0,
      },
    },
  ];

  return aggregation as any[];
};
