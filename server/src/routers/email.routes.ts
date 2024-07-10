import { Router } from "express";
import { emailController } from "../controllers/email/email-controllers";

const router = Router();

router.post("/email/contact", emailController.sendContactMail);

export default router;
