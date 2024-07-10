import { Request } from "express";
import { ObjectId } from "mongoose";

export const getServiceAggregationForRelatedServices = ({
  related_service_ids,
}: {
  related_service_ids: ObjectId[];
}) => {
  const aggregation: any[] = [
    {
      $match: {
        _id: { $in: related_service_ids },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        slug: 1,
      },
    },
  ];

  return aggregation;
};
