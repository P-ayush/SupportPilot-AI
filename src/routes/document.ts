import { uploadDocument, listDocuments, deleteDocument } from "../controller/document";
import { Router } from "express";
import upload from "../middleware/upload";
import authMiddleware from "../middleware/auth";

const router = Router();

router.post("/upload/:organizationId", authMiddleware, upload.single("file"), uploadDocument);
router.get("/list/:organizationId", authMiddleware, listDocuments);
router.delete("/delete/:organizationId/:documentId", authMiddleware, deleteDocument);

export default router;