import { nodeCache } from "../app/app";
import { HeroBannerModel } from "../models/hero-banner.model";
import { PortfolioModel } from "../models/portfolio.model";
import { ReviewModel } from "../models/review.model";
import { ServiceModel } from "../models/service.model";

export const cache = {
  get: (key: string): any | null => {
    const cacheData = nodeCache.get(key) as string | undefined | null;

    if (!cacheData) return null;

    try {
      return JSON.parse(cacheData);
    } catch (error) {
      console.error(`Failed to parse cached data for key ${key}:`, error);
      return null; // Or handle the error as appropriate for your application
    }
  },

  set: ({ key, data }: { key: string; data: any }) =>
    nodeCache.set(key, JSON.stringify(data)),

  delete: (key: string) => nodeCache.del(key),

  portfolios: {
    resetAllPortfolios: () => {
      const allPortfoliosKeys = cache.get(cacheKeys.getAllPortfoliosKeysKey());
      const portfolioKeys = cache.get(cacheKeys.getPortfolioKeysKey());

      allPortfoliosKeys?.forEach((key: string) => cache.delete(key));
      portfolioKeys?.forEach((key: string) => cache.delete(key));
    },
  },

  services: {
    resetAllServices: () => {
      const allServicesKeys = cache.get(cacheKeys.getAllServicesKeysKey());
      const serviceKeys = cache.get(cacheKeys.getServiceKeysKey());

      allServicesKeys?.forEach((key: string) => cache.delete(key));
      serviceKeys?.forEach((key: string) => cache.delete(key));
    },
  },

  heroBanner: {
    refreshHeroBanners: async () => {
      try {
        const banners = await HeroBannerModel.find().populate({
          path: "portfolio",
          select: "title slug profile_image",
          populate: { path: "profile_image", select: "secure_url" },
        });

        // set all hero banners to cache
        nodeCache.set("heroBanners", JSON.stringify(banners));
      } catch (error: any) {
        console.log("failed to refresh hero banners in cache.", error.message);
      }
    },

    refreshHeroBanner: async (id: string) => {
      try {
        const banner = await HeroBannerModel.findById(id).populate({
          path: "portfolio",
          populate: {
            path: "profile_image",
          },
        });

        // set hero banner to cache
        nodeCache.set(`heroBanner:${id}`, JSON.stringify(banner));
        await cache.heroBanner.refreshHeroBanners();
      } catch (error: any) {
        console.log("failed to refresh hero banner in cache.", error.message);
      }
    },

    deleteHeroBanner: async (id: string) => {
      try {
        // delete hero banner from cache
        nodeCache.del(`heroBanner:${id}`);
        // refresh all hero banners
        await cache.heroBanner.refreshHeroBanners();
      } catch (error: any) {
        console.log("failed to delete hero banner from cache.", error.message);
      }
    },
  },

  reviews: {
    refreshReviews: async () => {
      try {
        // get all reviews
        const reviews = await ReviewModel.find().exec();

        // set all reviews to cache
        nodeCache.set("reviews", JSON.stringify(reviews));
      } catch (error: any) {
        console.log("failed to refresh all reviews in cache.", error.message);
      }
    },

    refreshReview: async (id: string) => {
      try {
        const review = await ReviewModel.findById(id).exec();
        nodeCache.set(`review:${id}`, JSON.stringify(review));
        await cache.reviews.refreshReviews();
      } catch (error: any) {
        console.log("failed to refresh review in cache.", error.message);
      }
    },

    deleteReview: async (id: string) => {
      try {
        // delete review from cache
        nodeCache.del(`review:${id}`);
        // refresh all reviews
        await cache.reviews.refreshReviews();
      } catch (error: any) {
        console.log("failed to delete review from cache.", error.message);
      }
    },
  },
};

export const cacheKeys = {
  storeKeys: ({
    nameOfKeys,
    currentKey,
  }: {
    nameOfKeys: string;
    currentKey: string;
  }) => {
    const allKeys: any[] = [];

    allKeys.push(currentKey);

    const oldKeys = cache.get(nameOfKeys);

    if (oldKeys) {
      oldKeys.forEach((key: string) => allKeys.push(key));
    }

    cache.set({ key: nameOfKeys, data: allKeys });
  },

  getAllPortfoliosKeysKey: () => "getPortfoliosKeys",
  getPortfolioKeysKey: () => `getPortfolioKeys`,

  getAllServicesKeysKey: () => "getServicesKeys",
  getServiceKeysKey: () => `getServiceKeys`,

  getAllHeroBannersKey: () => "heroBanners",
  getSingleHeroBannerKey: (id: string) => `heroBanner:${id}`,

  getAllReviewsKey: () => "reviews",
  getSingleReviewKey: (id: string) => `review:${id}`,
};
