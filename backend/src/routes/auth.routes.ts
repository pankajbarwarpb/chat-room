import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import { loginSchema, signUpSchema } from "../schemas/auth.schema";
import { loginHandler, signUpHandler } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", validateRequest(signUpSchema), signUpHandler);
router.post("/login", validateRequest(loginSchema), loginHandler);

export default router;
