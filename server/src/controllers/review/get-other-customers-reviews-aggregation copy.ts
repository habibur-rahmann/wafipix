import { PipelineStage } from "mongoose";
import { RequestWithUser } from "../../../types/types";

export const getOtherCustomersReveiwsAggregation = (req: RequestWithUser) => {
  const user = req.user;
  const aggregation: PipelineStage[] = [
    {
      $match: {
        user: user?._id,
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
