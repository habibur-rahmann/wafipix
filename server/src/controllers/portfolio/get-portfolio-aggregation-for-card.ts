export const getPortfoliosAggregationForCard = () => {
  const aggregation: any = [
    {
      $match: { active: true },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $lookup: {
        from: "media",
        localField: "profile_image",
        foreignField: "_id",
        as: "profile_image",
      },
    },
    {
      $unwind: "$profile_image",
    },
    {
      $addFields: {
        image_url: "$profile_image.secure_url",
      },
    },
    {
      $project: { _id: 1, title: 1, slug: 1, image_url: 1 },
    },
  ];

  return aggregation;
};
