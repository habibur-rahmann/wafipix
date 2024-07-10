import express from "express";
import { portfolioController } from "../controllers/portfolio/portfolio.controller";
import { upload } from "../middlewares/multer.middleware";
import { isLogged } from "../middlewares/isLogged";
import { adminRoute } from "../middlewares/admin-route";

const router = express.Router();

router
  .get("/portfolios", portfolioController.getPortfolios)
  .get(
    "/portfolios/:slug/related_portfolios",
    portfolioController.getRelatedPortfolios
  )
  .get(
    "/portfolios/:slug/related_services",
    portfolioController.getRelatedServices
  )
  .get("/portfolios/:slug/profile_image", portfolioController.getProfileImage)
  .get("/portfolios/:slug/medias", portfolioController.getMedias)
  .get("/portfolios/card", portfolioController.getPortfoliosForCard)
  .get("/portfolios/card/all", portfolioController.getPortfoliosForCardAll)
  .get("/portfolios/card/:slug", portfolioController.getPortfolio)
  .get("/portfolios/card/:slug/texts", portfolioController.getTexts)
  .get("/portfolios/featured", portfolioController.getFeaturedPortfolios)
  .post("/portfolio", isLogged, adminRoute, portfolioController.createPortfolio)
  .put(
    "/portfolios/:id/update",
    isLogged,
    adminRoute,
    portfolioController.updatePortfolio
  )
  .put(
    "/portfolios/:id/update_profile_image",
    upload.single("profile_image"),
    isLogged,
    adminRoute,
    portfolioController.updateProfileImage
  )
  .put(
    "/portfolios/:id/add_media",
    upload.single("media"),
    isLogged,
    adminRoute,
    portfolioController.updatePortfolioMedia.add
  )
  .delete(
    "/portfolios/:id/remove_media",
    isLogged,
    adminRoute,
    portfolioController.updatePortfolioMedia.remove
  )
  .delete(
    "/portfolios/:id",
    isLogged,
    adminRoute,
    portfolioController.deletePortfolio
  );

export default router;
