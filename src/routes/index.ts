import { Router } from "express";
import healthRoutes from "./health";
import authRoutes from "./auth";
import organisationRoutes from "./organisation";
import documentRoutes from "./document";
const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/organisation", organisationRoutes);
router.use("/document", documentRoutes);


export default router;