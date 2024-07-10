import { Router } from "express";
import { reviewController } from "../controllers/review/review.controller";

import { takeUser } from "../middlewares/take-user";
import { isLogged } from "../middlewares/isLogged";
import { adminRoute } from "../middlewares/admin-route";

const router = Router();

router
  .get("/reviews/view", reviewController.getReviewsForView)
  .get(
    "/reviews/all/view",
    isLogged,
    adminRoute,
    reviewController.getAllReviews
  )
  .get(
    "/reviews/view/user",
    isLogged,
    takeUser,
    reviewController.getUserReviewsForView
  )

  .get("/reviews/featured", reviewController.getFeaturedReviews)
  .get("/reviews/:id", reviewController.getReview)
  .get("/reviews/:id/status", isLogged, adminRoute, reviewController.getStatus)
  .post("/review", isLogged, adminRoute, reviewController.createReview)
  .put("/reviews/:id", isLogged, adminRoute, reviewController.updateReview)
  .put(
    "/reviews/:id/status",
    isLogged,
    adminRoute,
    reviewController.updateReviewStatus
  )
  .delete("/reviews/:id", isLogged, adminRoute, reviewController.removeReview);

export default router;
