import { Request } from "express";

export const getServiceAggregationTexts = (slug: string) => {
  const aggregation = [
    {
      $match: { slug },
    },

    {
      $project: {
        _id: 1,
        title: 1,
        slug: 1,
        description: 1,
        short_description: 1,
        active: 1,
        featured: 1,
      },
    },
  ];

  return aggregation;
};
