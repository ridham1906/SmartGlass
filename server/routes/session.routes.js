import { Router } from "express";
import jwtAuth, { requireRole } from "../middleware/jwtAuth.js";
import wrapAsync from "../utils/wrapAsync.js";
import { createSession } from "../controllers/sessionController.js";
const router = Router();

router.post("/create", jwtAuth, requireRole("Educator"), wrapAsync(createSession));

export default router;
