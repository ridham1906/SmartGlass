import { Router } from "express";
import jwtAuth from "../middleware/jwtAuth.js";
import wrapAsync from "../utils/wrapAsync.js";
import { chatWithAI, deleteChat, getAllChat, getChatById, initiateNewChat, renameChat } from "../controllers/chatController.js";
const router = Router();

router.get('/all', jwtAuth, wrapAsync(getAllChat))
router.get('/:id', jwtAuth, wrapAsync(getChatById))
router.post('/new', jwtAuth, wrapAsync(initiateNewChat))
router.post("/", jwtAuth, wrapAsync(chatWithAI));
router.put("/", jwtAuth, wrapAsync(renameChat));
router.delete('/:id', jwtAuth, wrapAsync(deleteChat))

export default router;