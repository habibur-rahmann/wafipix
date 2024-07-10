import { Router } from "express";
import { authControllers } from "../controllers/auth/auth-controller";

const router = Router();

router.post("/auth/login/google", authControllers.googleUser);

export default router;
