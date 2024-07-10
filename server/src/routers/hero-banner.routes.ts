import { Router } from "express";
import { heroBannerController } from "../controllers/hero-banner/hero-banner.controller";
import { isLogged } from "../middlewares/isLogged";
import { takeUser } from "../middlewares/take-user";
import { adminRoute } from "../middlewares/admin-route";

const router = Router();

router
  .get("/hero-banners", heroBannerController.getHeroBanners)
  .get("/hero-banners/view", heroBannerController.getHeroBannersToView)
  .get("/hero-banners/view/card", heroBannerController.getHeroBannersToViewCard)
  .get("/hero-banners/:id", heroBannerController.getHeroBanner)
  .get("/hero-banners/:id/config", heroBannerController.getHeroBannerConfig)
  .post(
    "/hero-banners",
    isLogged,
    adminRoute,
    heroBannerController.createHeroBanner
  )
  .put(
    "/hero-banners/:id",
    isLogged,
    adminRoute,
    heroBannerController.updateHeroBanner
  )
  .delete(
    "/hero-banners/:id",
    isLogged,
    adminRoute,
    heroBannerController.removeHeroBanner
  );

export default router;
