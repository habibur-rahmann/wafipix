import { Request } from "express";

export const getPortfolioAggregationToView = (req: Request) => {
  const { slug } = req.params as { slug: string };

  const aggregation: any[] = [
    {
      $match: { active: true, slug },
    },
    {
      $lookup: {
        from: "media",
        localField: "medias.media",
        foreignField: "_id",
        as: "temp_medias",
      },
    },
    {
      $addFields: {
        medias: {
          $map: {
            input: "$medias",
            as: "mediasItem",
            in: {
              view_size: "$$mediasItem.view_size",
              media: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$temp_medias",
                      as: "tempMedia",
                      cond: {
                        $eq: ["$$mediasItem.media", "$$tempMedia._id"],
                      },
                    },
                  },
                  0,
                ],
              },
            },
          },
        },
      },
    },
    {
      $addFields: {
        medias: {
          $map: {
            input: "$medias",
            as: "mediaItem",
            in: {
              view_size: "$$mediaItem.view_size",
              url: "$$mediaItem.media.secure_url",
              content_type: "$$mediaItem.media.content_type",
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        slug: 1,
        medias: 1,
        description: 1,
      },
    },
  ];

  return aggregation;
};
