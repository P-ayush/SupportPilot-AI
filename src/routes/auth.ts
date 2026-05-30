import { login, signUp } from "../controller/auth";
import { Router } from "express";
import { loginSchema, signUpSchema } from "../validation/auth";
import { validate } from "../middleware/validation";

const router = Router();

router.post("/login", validate(loginSchema), login);
router.post("/signup", validate(signUpSchema), signUp);

export default router;