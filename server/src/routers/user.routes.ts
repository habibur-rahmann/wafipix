import { Router } from "express";
import { userController } from "../controllers/user/user.controller";

const router = Router();

router.get("/users").post("/user", userController.saveUser);

export default router;
