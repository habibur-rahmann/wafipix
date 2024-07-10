import { PipelineStage } from "mongoose";

export const getAggregationReviewsForVeiw = () => {
  const aggregation: PipelineStage[] = [
    {
      $match: {
        active: true,
      },
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
      },
    },
  ];

  return aggregation as any[];
};
