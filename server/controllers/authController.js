import User from "../models/User.js"; 
import { adminAuth } from "../services/firebase.js";
import jwt from "jsonwebtoken";

export const authenticate =  async (req, res) => {
  // console.log("authenticate called with body:", req.body);
  const { name, firebaseToken } = req.body;
  console.log("authenticate called with body:", req.firebaseToken);

  try {
    const decoded = await adminAuth.verifyIdToken(firebaseToken);

    let user = await User.findOne({ firebaseUID: decoded.uid });

    if (!user) {
      user = await User.create({
        firebaseUID: decoded.uid,
        name: decoded.name || name,
        email: decoded.email,
      });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.status(200).json({ token, user, message: "User authenticated!" });
  } catch (err) {
    res.status(401).json({ message: "Invalid Firebase token" });
  }
}

export const addRole = async (req, res) => {
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ message: "Role is required" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user, message: "Role updated successfully" });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ message: "Failed to update role" });
  }
}