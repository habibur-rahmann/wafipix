import { Router } from "express";
import { serviceController } from "../controllers/service/service.controller";
import { isLogged } from "../middlewares/isLogged";
import { adminRoute } from "../middlewares/admin-route";

const router = Router();

router
  .get("/services", serviceController.getServices)
  .get("/services/view/card", serviceController.getServiceToCardView)
  .get("/services/:slug/view", serviceController.getServiceToView)
  .get("/services/:slug/texts", serviceController.getServiceTexts)
  .get(
    "/services/:slug/related_portfolios",
    serviceController.getrelatedPortfolios
  )
  .get("/services/:slug/related_services", serviceController.getrelatedServices)
  .get("/service", serviceController.getService)
  .post("/service", isLogged, adminRoute, serviceController.createService)
  .put(
    "/services/:slug/update",
    isLogged,
    adminRoute,
    serviceController.updateService
  )
  .delete(
    "/services/:id",
    isLogged,
    adminRoute,
    serviceController.deleteService
  );

export default router;
