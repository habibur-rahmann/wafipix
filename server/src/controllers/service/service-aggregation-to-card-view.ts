export const getServiceAggregationToCardView = () => {
  const aggregation = [
    {
      $match: { active: true },
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
