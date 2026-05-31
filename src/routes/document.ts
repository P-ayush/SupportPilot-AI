const { uploadDocument, listDocuments, deleteDocument } = require("../controller/document");
const upload = require("../middleware/upload");
const { Router } = require("express");

const router = Router();

router.post("/upload/:organizationId", upload.single("file"), uploadDocument);
router.get("/list/:organizationId", listDocuments);
router.delete("/delete/:organizationId/:documentId", deleteDocument);