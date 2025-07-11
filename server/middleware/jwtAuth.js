import jwt from "jsonwebtoken";

export default function jwtAuth (req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Auth token missing! Please Login to access" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    req.role = decoded.role;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorized! Login to get access" });
  }
};

// Role-based access control middleware
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ message: "Forbidden: insufficient permissions" });
    }
    next();
  };
}
