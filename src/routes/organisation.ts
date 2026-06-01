import authMiddleware from "../middleware/auth";
import { validate } from "../middleware/validation";
import { createOrganizationSchema } from "../validation/organisation";
import { createOrganization, listOrganizations } from "../controller/organisation";

const { Router } = require("express");

const router = Router();

router.post("/create", authMiddleware, validate(createOrganizationSchema), createOrganization);
router.get("/list", authMiddleware, listOrganizations);

export default router;  