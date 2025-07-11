import { Router } from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { uploadFile } from "../controllers/uploadController.js";
import upload from "../utils/cloudinaryStorage.js"
import jwtAuth, { requireRole } from "../middleware/jwtAuth.js";
const router = Router();

router.post("/", jwtAuth, requireRole("Educator"), upload.array('documents', 5), wrapAsync(uploadFile))

export default router;
