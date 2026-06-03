import { createChat, chatHistory } from "../controller/chat";
import { Router } from "express";
import authMiddleware from "../middleware/auth";
import { validate } from "../middleware/validation";
import { chatSchema } from "../validation/chat";
const router = Router();

router.post("/create/:organizationId", authMiddleware, validate(chatSchema), createChat);
router.get("/history/:organizationId", authMiddleware, chatHistory);

export default router;