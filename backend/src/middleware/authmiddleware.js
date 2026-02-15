import jwt from "jsonwebtoken";
import User from "../models/modeldb.js";

export const protectroute = async (req, res, next) => {
  try {

    const token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1];

    if (!token) {
      console.log("No token found in cookies or headers");
      return res.status(200).json({ message: "Not authorized, please login" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.log("JWT verification failed:", err.message);
      return res.status(401).json({ message: "Token is invalid" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      console.log("User not found for ID:", decoded.userId);
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("JWT protectroute error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
