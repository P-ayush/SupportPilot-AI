const { createOrganization, listOrganizations } = require("../controller/organisation");
const { createOrganizationSchema } = require("../validation/organisation");
const { validate } = require("../middleware/validation");
const { Router } = require("express");

const router = Router();

router.post("/create", validate(createOrganizationSchema), createOrganization);
router.get("/list", listOrganizations);

export default router;