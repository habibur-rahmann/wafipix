import { ObjectId } from "mongoose";

export const getServiceAggregationToGetServicesByIdsForCard = ({
  service_ids,
}: {
  service_ids: ObjectId[];
}) => {
  const aggregation: any[] = [
    {
      $match: {
        _id: { $in: service_ids },
      },
    },

    {
      $project: {
        _id: 1,
        title: 1,
        slug: 1,
        short_description: 1,
        active: 1,
      },
    },
  ];

  return aggregation;
};
