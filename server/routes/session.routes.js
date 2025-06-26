import { Router } from "express";
const router = Router();

import Session from "../models/Session.js";
import auth from "../middleware/auth.js";

function generateAccessCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}


router.post("/create", auth, async (req, res) => {
  try {
    const { name } = req.body;
    const educatorId = req.userId;

    const session = await Session.create({
      name,
      accessCode: generateAccessCode(),
      educator: educatorId,
    });

    res.status(201).json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create session" });
  }
});

export default router;
