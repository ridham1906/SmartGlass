import { Router } from "express";
import jwtAuth from "../middleware/jwtAuth.js";
import accessControll from "../middleware/accessControll.js";
import wrapAsync from "../utils/wrapAsync.js";
import { createSession } from "../controllers/sessionController.js";
const router = Router();

router.post("/create", jwtAuth, accessControll ,wrapAsync(createSession));

export default router;
