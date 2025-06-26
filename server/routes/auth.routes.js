import { Router } from "express";
const router = Router();
import { auth } from "../services/firebase.js";

import User from "../models/User.js"; 

router.post("/register-or-login", async (req, res) => {
  const { firebaseToken } = req.body;

  try {
    const decoded = await auth().verifyIdToken(firebaseToken);

    let user = await User.findOne({ firebaseUID: decoded.uid });

    if (!user) {
      user = await User.create({
        firebaseUID: decoded.uid,
        email: decoded.email,
        role: "student"
      });
    }

    const token = sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid Firebase token" });
  }
});

export default router;
